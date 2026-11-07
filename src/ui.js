// Chrome around the content: announcement bar, nav, menu, cursor, magnetic
// buttons, anchor scrolling, copy-to-clipboard and the two forms.
export const motionState = { paused: false };

export function initUI(ctx) {
  bar(ctx);
  nav(ctx);
  menu(ctx);
  anchors(ctx);
  if (!ctx.reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    cursor(ctx);
    magnetic(ctx);
  }
  copy();
  handoffCopy();
  bookForm();
  newsForm();
}

function bar({ gsap, reduce }) {
  const items = gsap.utils.toArray('.bar-list li');
  if (!items.length) return;
  const pause = document.querySelector('.bar-pause');
  let i = 0;
  gsap.set(items, { yPercent: (k) => (k === 0 ? 0 : 100), autoAlpha: (k) => (k === 0 ? 1 : 0) });
  const go = (dir) => {
    const cur = items[i];
    i = (i + dir + items.length) % items.length;
    const nxt = items[i];
    if (reduce) {
      gsap.set(cur, { autoAlpha: 0 });
      gsap.set(nxt, { yPercent: 0, autoAlpha: 1 });
      return;
    }
    gsap.to(cur, { yPercent: -100 * dir, autoAlpha: 0, duration: 0.55, ease: 'power3.inOut' });
    gsap.fromTo(nxt, { yPercent: 100 * dir, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.55, ease: 'power3.inOut' });
  };
  // Reduced motion: the first announcement stays put; the arrows still work.
  if (!reduce) setInterval(() => { if (!motionState.paused && !document.hidden) go(1); }, 4500);
  document.querySelector('.bar-next')?.addEventListener('click', () => go(1));
  document.querySelector('.bar-prev')?.addEventListener('click', () => go(-1));
  // One pause control for everything that moves on its own (WCAG 2.2.2):
  // CSS animations (html.is-paused), the rotating texts and the 3D loop all read it.
  const status = document.getElementById('motion-status');
  pause?.addEventListener('click', () => {
    motionState.paused = !motionState.paused;
    pause.setAttribute('aria-pressed', String(motionState.paused));
    pause.setAttribute('aria-label', motionState.paused ? 'Play moving content' : 'Pause moving content');
    document.documentElement.classList.toggle('is-paused', motionState.paused);
    if (status) status.textContent = motionState.paused ? 'Moving content paused.' : 'Moving content playing.';
  });
}

function nav({ ScrollTrigger, lenis }) {
  const head = document.getElementById('site-head');
  let lastY = 0;
  // Phones: a floating "Jump to" opens the menu and "Top" returns up, so nobody has to scroll far.
  const fab = document.querySelector('.jump-fab');
  fab?.querySelector('.jump-menu')?.addEventListener('click', () => document.querySelector('.burger')?.click());
  fab?.querySelector('.jump-top')?.addEventListener('click', () => { if (lenis) lenis.scrollTo(0); else window.scrollTo({ top: 0, behavior: 'smooth' }); });
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: (self) => {
      const y = self.scroll();
      head.classList.toggle('is-scrolled', y > 10);
      fab?.classList.toggle('is-down', y > 600);
      if (document.body.classList.contains('menu-open') || head.contains(document.activeElement)) return;
      head.classList.toggle('is-hidden', y > lastY && y > 260);
      lastY = y;
    },
  });
  // Keyboard users always see the header while focus is inside it.
  head.addEventListener('focusin', () => head.classList.remove('is-hidden'));
}

// The phone menu behaves as a modal: focus moves in, Tab stays inside, the page
// behind is inert and can't scroll, Escape closes and returns focus to the button.
function menu({ gsap, lenis, reduce }) {
  const burger = document.querySelector('.burger');
  const sheet = document.getElementById('menu');
  if (!burger || !sheet) return;
  const links = sheet.querySelectorAll('.menu-links li');
  const behind = () => [document.getElementById('main'), document.querySelector('.foot'), document.querySelector('.bar'), document.querySelector('.nav-logo')];
  const focusables = () => [burger, ...sheet.querySelectorAll('a, button')];
  let open = false;
  const set = (next, { restoreFocus = true } = {}) => {
    open = next;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', open);
    behind().forEach((el) => { if (el) el.inert = open; });
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) {
      sheet.hidden = false;
      lenis?.stop();
      sheet.querySelector('a')?.focus();
      if (!reduce) {
        gsap.fromTo(sheet, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'expo.inOut' });
        gsap.fromTo(links, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, delay: 0.2, ease: 'power3.out' });
      }
    } else {
      lenis?.start();
      if (restoreFocus) burger.focus();
      if (reduce) { sheet.hidden = true; return; }
      gsap.to(sheet, { clipPath: 'inset(0 0 100% 0)', duration: 0.5, ease: 'expo.inOut', onComplete: () => { sheet.hidden = true; } });
    }
  };
  burger.addEventListener('click', () => set(!open));
  // A menu link closes the menu; the anchor handler then moves focus to the section.
  sheet.addEventListener('click', (e) => { if (e.target.closest('a')) set(false, { restoreFocus: false }); });
  document.addEventListener('keydown', (e) => {
    if (!open) return;
    if (e.key === 'Escape') { set(false); return; }
    if (e.key !== 'Tab') return;
    const f = focusables();
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  // The menu only exists on small screens; close it if the window grows.
  matchMedia('(min-width: 1181px)').addEventListener('change', (m) => { if (m.matches && open) set(false, { restoreFocus: false }); });
}

// In-page links: smooth scroll, then focus lands on the section heading so
// keyboard and screen-reader users know where they arrived. Each jump is a
// history entry, so Back returns to the previous section.
function anchors({ lenis, reduce }) {
  const go = (id, { push = true } = {}) => {
    const target = id === '#top' ? document.body : document.querySelector(id);
    if (!target) return false;
    if (target.tagName === 'DETAILS') target.open = true;
    if (lenis) lenis.scrollTo(id === '#top' ? 0 : target, { offset: -80, duration: reduce ? 0 : 1.4, immediate: reduce });
    else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    const heading = id === '#top' ? document.getElementById('hero-title') : target.querySelector('h1, h2, summary') || target;
    if (heading) {
      if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
      setTimeout(() => heading.focus({ preventScroll: true }), reduce ? 0 : 900);
    }
    if (push && target.id && location.hash !== id) history.pushState(null, '', id);
    return true;
  };
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id === '#' || !go(id)) return;
    e.preventDefault();
    if (a.dataset.reason) pickReason(a.dataset.reason);
  });
  window.addEventListener('popstate', () => { if (location.hash) go(location.hash, { push: false }); });
}

export function pickReason(value) {
  const input = [...document.querySelectorAll('.reasons input')].find((r) => r.value === value);
  if (input) input.checked = true;
}

function cursor({ gsap }) {
  const root = document.querySelector('.cursor');
  if (!root) return;
  document.documentElement.classList.add('has-cursor');
  const dot = root.querySelector('.cursor-dot');
  const ring = root.querySelector('.cursor-ring');
  const label = root.querySelector('.cursor-label');
  const dx = gsap.quickTo(dot, 'x', { duration: 0.1 });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.1 });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    const zone = e.target.closest?.('[data-cursor]');
    const text = zone ? zone.dataset.cursor : '';
    root.classList.toggle('has-label', !!text);
    if (text) label.textContent = text;
  }, { passive: true });
  document.addEventListener('mouseleave', () => gsap.to(root, { opacity: 0, duration: 0.2 }));
  document.addEventListener('mouseenter', () => gsap.to(root, { opacity: 1, duration: 0.2 }));
}

function magnetic({ gsap }) {
  document.querySelectorAll('.magnetic').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      x(((e.clientX - r.left) / r.width - 0.5) * 16);
      y(((e.clientY - r.top) / r.height - 0.5) * 16);
    });
    el.addEventListener('pointerleave', () => { x(0); y(0); });
  });
}

function copy() {
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    const state = btn.querySelector('.copy-state');
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        if (state) state.textContent = 'copied';
      } catch {
        location.href = `mailto:${btn.dataset.copy}`;
      }
      setTimeout(() => { if (state) state.textContent = 'copy'; }, 2000);
    });
  });
}

const TO = 'Grow@familycoachmd.com';
const validEmail = (v) => /^\S+@\S+\.\S+$/.test(v);

// Sends a request. With data-endpoint on the form (e.g. a Formspree URL) it is
// posted for real and the visitor sees the actual result. Without one, the
// request is handed to the visitor's email app, and the full message is also
// shown with a copy button, so people without an email app can still send it.
// Nothing here ever claims a booking or a subscription that didn't happen.
async function deliver(form, { subject, body, fields }) {
  const status = form.querySelector('[role="status"]');
  const fallback = form.querySelector('.handoff');
  const button = form.querySelector('[type="submit"]');
  const endpoint = form.dataset.endpoint;
  if (endpoint) {
    button.disabled = true;
    status.textContent = 'Sending…';
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...fields, _subject: subject }) });
      if (!res.ok) throw new Error(String(res.status));
      status.textContent = form.dataset.success;
      form.reset();
    } catch {
      status.textContent = `Something went wrong and your request was not sent. Please try again, or email ${TO}.`;
    } finally {
      button.disabled = false;
    }
    return;
  }
  location.href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = `Your email app should open with this message ready. It is not sent until you press send there.`;
  if (fallback) {
    fallback.hidden = false;
    fallback.querySelector('textarea').value = `To: ${TO}\nSubject: ${subject}\n\n${body}`;
  }
}

function handoffCopy() {
  document.querySelectorAll('.handoff-copy').forEach((btn) => btn.addEventListener('click', async () => {
    const area = btn.closest('.handoff').querySelector('textarea');
    try { await navigator.clipboard.writeText(area.value); btn.textContent = 'Copied'; }
    catch { area.select(); btn.textContent = 'Selected: press Ctrl+C'; }
    setTimeout(() => { btn.textContent = 'Copy message'; }, 2500);
  }));
}

function bookForm() {
  const form = document.querySelector('.book');
  if (!form) return;
  const status = form.querySelector('.book-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const reason = String(data.get('reason') || 'A free 15-minute call');
    if (!name || !validEmail(email)) {
      status.textContent = 'Please add your name and a valid email.';
      (name ? form.elements.email : form.elements.name).focus();
      return;
    }
    const phone = String(data.get('phone') || '').trim();
    const times = String(data.get('times') || '').trim();
    const note = String(data.get('note') || '').trim();
    const body = [
      'Hi Dr. Che,', '', reason === 'General question' ? 'I have a question.' : 'I would like to request a free 15-minute call.', '',
      `What brings me here: ${reason}`, `Name: ${name}`, `Email: ${email}`,
      phone ? `Phone: ${phone}` : null, times ? `Best days and times: ${times}` : null, note ? `Message: ${note}` : null,
    ].filter((l) => l !== null).join('\n');
    deliver(form, { subject: `${reason === 'General question' ? 'Question' : 'Free 15-minute call request'}: ${reason}`, body, fields: { reason, name, email, phone, times, note } });
  });
}

function newsForm() {
  const form = document.querySelector('.news');
  if (!form) return;
  const status = form.querySelector('.news-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.elements.email.value.trim();
    if (!validEmail(email)) { status.textContent = 'Please enter a valid email.'; return; }
    deliver(form, { subject: 'Please add me to the FamilyCoachMD email list', body: `Hi, please add ${email} to the FamilyCoachMD email list (events, courses, parenting and leadership tips, and new books).`, fields: { email } });
  });
}
