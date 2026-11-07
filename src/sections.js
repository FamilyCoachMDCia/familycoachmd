import { motionState } from './ui.js';

// Shared with the 3D leaves: 0 = the early years … 4 = the thriving season.
export const seasonState = { value: 0 };
// Shared with the 3D plant in the coaching section.
export const plantState = { checked: 0, scroll: 0 };

const LINEN = '#F4EFE7';
const TINTS = ['#E4E9D8', '#F6E6C4', '#EBD7CB', '#D6DCDE', LINEN];
const desktopPin = () => window.matchMedia('(min-width: 1024px)').matches;

export function initSections(ctx) {
  headlines(ctx);
  reveals(ctx);
  heroRotator(ctx);
  manifesto(ctx);
  tiles(ctx);
  seasons(ctx);
  careSteps(ctx);
  checklist(ctx);
  balance(ctx);
  careMethod(ctx);
  epWindow();
  journey(ctx);
  marquee();
  stories(ctx);
}

// Headlines rise line by line from a mask; the hero's waits for the loader.
function headlines({ gsap, SplitText, reduce }) {
  if (reduce) return;
  document.querySelectorAll('.split').forEach((el) => {
    // If the loader already finished, the hero headline plays right away.
    const isHero = !!el.closest('.hero') && !document.documentElement.classList.contains('is-loaded');
    SplitText.create(el, {
      type: 'lines', mask: 'lines', linesClass: 'line-mask-inner', autoSplit: true,
      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 110, duration: 1.1, stagger: 0.1, ease: 'power3.out',
          paused: isHero,
          scrollTrigger: isHero ? undefined : { trigger: el, start: 'top 86%', once: true },
          onStart: () => el.classList.add('is-split'),
          id: isHero ? 'hero-h1' : undefined,
        });
      },
    });
  });
}

function reveals({ gsap, ScrollTrigger, reduce }) {
  if (reduce) return;
  ScrollTrigger.batch('.reveal', {
    start: 'top 88%', once: true,
    onEnter: (els) => gsap.fromTo(els, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out', overwrite: true }),
  });
  // Allbirds' veil: photos arrive under a pale linen veil that clears.
  gsap.utils.toArray('.reveal-photo').forEach((el) => {
    gsap.fromTo(el, { opacity: 0, scale: 1.04 }, {
      opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

function heroRotator({ gsap, reduce }) {
  const items = gsap.utils.toArray('.hero-rotator .rot');
  if (items.length < 2 || reduce) return;
  let i = 0;
  setInterval(() => {
    if (motionState.paused || document.hidden) return;
    const cur = items[i];
    i = (i + 1) % items.length;
    const nxt = items[i];
    gsap.to(cur, { y: -14, opacity: 0, duration: 0.45, ease: 'power2.in', onComplete: () => cur.classList.remove('is-on') });
    gsap.fromTo(nxt, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, delay: 0.35, ease: 'power3.out', onStart: () => nxt.classList.add('is-on') });
  }, 2600);
}

function manifesto({ gsap, reduce }) {
  const body = document.querySelector('.manifesto-body');
  if (!body) return;
  // Wrap words for the scrubbed reading reveal.
  body.innerHTML = body.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(' ');
  if (reduce) { document.documentElement.classList.add('reduce'); return; }
  const lines = gsap.utils.toArray('.manifesto-title .line');
  gsap.from(lines, {
    yPercent: 60, opacity: 0, duration: 1.1, stagger: 0.14, ease: 'power3.out',
    scrollTrigger: { trigger: '.manifesto', start: 'top 70%', once: true },
  });
  gsap.fromTo('.manifesto-title .pen path', { drawSVG: '0%' }, {
    drawSVG: '100%', ease: 'none',
    scrollTrigger: { trigger: '.manifesto-title', start: 'top 60%', end: 'bottom 30%', scrub: 1 },
  });
  gsap.to(body.querySelectorAll('.w'), {
    color: '#F4EFE7', stagger: 0.05, ease: 'none',
    scrollTrigger: { trigger: body, start: 'top 82%', end: 'bottom 45%', scrub: 1 },
  });
}

// On touch screens the tiles show their call to action permanently (CSS),
// so a single tap always navigates.
function tiles({ gsap, reduce }) {
  if (reduce) return;
  gsap.from('.tile', {
    y: 50, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.tiles', start: 'top 85%', once: true },
  });
  document.querySelectorAll('.tile .art').forEach((art, i) => {
    gsap.fromTo(art.querySelectorAll('path, circle'), { drawSVG: '0%' }, {
      drawSVG: '100%', duration: 1.4, delay: 0.25 + i * 0.1, stagger: 0.04, ease: 'power2.inOut',
      scrollTrigger: { trigger: '.tiles', start: 'top 80%', once: true },
    });
  });
}

// 05 · The page lives through the seasons. Desktop: pinned horizontal track and
// the 3D leaves on the right. Phones: stacked cards, the color still changes.
function seasons({ gsap, ScrollTrigger, reduce, lenis }) {
  const section = document.querySelector('.seasons');
  const track = section?.querySelector('.season-track');
  if (!track) return;
  const root = document.documentElement;
  const cards = gsap.utils.toArray('.season', track);
  const dots = gsap.utils.toArray('.season-progress li');
  const mix = (a, b, t) => gsap.utils.interpolate(a, b, t);
  const tintAt = (s) => {
    const i = Math.min(Math.floor(s), 3);
    return mix(TINTS[i], TINTS[i + 1], Math.min(Math.max(s - i, 0), 1));
  };
  const paint = (c) => root.style.setProperty('--season-bg', c);

  if (reduce) {
    cards.forEach((card, i) => ScrollTrigger.create({
      trigger: card, start: 'top 60%', end: 'bottom 40%',
      onToggle: (self) => self.isActive && paint(TINTS[i]),
    }));
    ScrollTrigger.create({ trigger: section, start: 'top bottom', end: 'bottom top', onToggle: (self) => !self.isActive && paint(LINEN) });
    return;
  }

  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    section.classList.add('is-pinned-mode');
    const step = () => cards[1].offsetLeft - cards[0].offsetLeft;
    let intro = 0;
    let pinP = 0;
    const update = () => {
      seasonState.value = pinP * 4;
      if (pinP > 0) paint(tintAt(pinP * 4));
      else paint(mix(LINEN, TINTS[0], intro));
      const idx = Math.round(pinP * 4);
      dots.forEach((d, i) => d.classList.toggle('is-on', i === idx));
      cards.forEach((c, i) => c.classList.toggle('is-current', i === idx));
    };
    const introST = ScrollTrigger.create({
      trigger: '.seasons-pin', start: 'top 95%', end: 'top top',
      onUpdate: (self) => { intro = self.progress; update(); },
    });
    const tween = gsap.to(track, {
      x: () => -step() * (cards.length - 1), ease: 'none',
      scrollTrigger: {
        trigger: '.seasons-pin', start: 'top top', end: () => `+=${step() * (cards.length - 1)}`,
        pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
        // inertia off: the nearest season wins, so a quick jump never slides one past.
        snap: { snapTo: 1 / (cards.length - 1), inertia: false, duration: { min: 0.3, max: 0.7 }, delay: 0.08, ease: 'power2.inOut' },
        onUpdate: (self) => { pinP = self.progress; update(); },
      },
    });
    gsap.set(cards, { opacity: (i) => (i === 0 ? 1 : 0.55) });
    // The progress dots are real controls: each jumps to its season.
    const jump = (i) => {
      const st = tween.scrollTrigger;
      const y = st.start + (st.end - st.start) * (i / (cards.length - 1));
      // Jump instantly: the scrubbed track still glides there on its own, and an
      // animated scroll would arrive with momentum that snaps one season too far.
      if (lenis) lenis.scrollTo(y, { immediate: true, force: true }); else window.scrollTo(0, y);
    };
    const onDot = (e) => { const b = e.target.closest('button[data-season]'); if (b) jump(Number(b.dataset.season)); };
    section.addEventListener('click', onDot);
    // Keyboard users tabbing into a card are taken to that season.
    const onFocus = (e) => { const c = e.target.closest('.season'); if (c && e.target.matches('a')) jump(cards.indexOf(c)); };
    track.addEventListener('focusin', onFocus);
    const fade = gsap.ticker.add(() => {
      const p = pinP * (cards.length - 1);
      cards.forEach((c, i) => { c.style.opacity = String(1 - Math.min(Math.abs(p - i), 1) * 0.45); });
    });
    return () => {
      section.classList.remove('is-pinned-mode');
      introST.kill();
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.ticker.remove(fade);
      section.removeEventListener('click', onDot);
      track.removeEventListener('focusin', onFocus);
      gsap.set([track, ...cards], { clearProps: 'all' });
      paint(LINEN);
    };
  });
  mm.add('(max-width: 1023px)', () => {
    const triggers = cards.map((card, i) => ScrollTrigger.create({
      trigger: card, start: 'top 65%', end: 'bottom 35%',
      onToggle: (self) => self.isActive && gsap.to(root, { '--season-bg': TINTS[i], duration: 0.8, ease: 'sine.inOut' }),
    }));
    const out = ScrollTrigger.create({
      trigger: section, start: 'top bottom', end: 'bottom top',
      onLeave: () => gsap.to(root, { '--season-bg': LINEN, duration: 0.6 }),
      onLeaveBack: () => gsap.to(root, { '--season-bg': LINEN, duration: 0.6 }),
    });
    const ins = gsap.from(cards, { y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: track, start: 'top 85%', once: true } });
    return () => { triggers.forEach((t) => t.kill()); out.kill(); ins.scrollTrigger?.kill(); paint(LINEN); };
  });
}

function careSteps({ gsap, reduce }) {
  const line = document.querySelector('.steps-line path');
  if (!line || reduce) return;
  gsap.fromTo(line, { drawSVG: '0%' }, {
    drawSVG: '100%', ease: 'none',
    scrollTrigger: { trigger: '.steps', start: 'top 75%', end: 'bottom 55%', scrub: 1 },
  });
}

// 07 · Each "yes" grows the sprout one stage.
function checklist({ gsap, ScrollTrigger, reduce }) {
  const boxes = [...document.querySelectorAll('.checklist input')];
  const stem = document.querySelector('.sprout-stem');
  const leaves = gsap.utils.toArray('.sprout-leaf');
  const result = document.querySelector('.check-result');
  if (!boxes.length || !stem) return;
  leaves.forEach((l) => gsap.set(l, { svgOrigin: l.dataset.o, scale: 0 }));
  gsap.set(stem, { drawSVG: '0% 12%' });
  ScrollTrigger.create({ trigger: '.checklist-grid', start: 'top 85%', end: 'center 55%', onUpdate: (self) => { plantState.scroll = self.progress; } });
  const grow = () => {
    const n = boxes.filter((b) => b.checked).length;
    plantState.checked = n;
    const d = reduce ? 0 : 0.7;
    gsap.to(stem, { drawSVG: `0% ${12 + n * 17.6}%`, duration: d, ease: 'power2.out' });
    leaves.forEach((l, i) => gsap.to(l, { scale: i < n ? 1 : 0, duration: d, ease: i < n ? 'back.out(1.8)' : 'power2.in' }));
    result.textContent = n >= 2 ? 'Then private family coaching was made for you.' : '';
    if (n >= 2 && !reduce) gsap.fromTo(result, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
  };
  boxes.forEach((b) => b.addEventListener('change', grow));
}

// 08 · Kind and firm: the twig tips until the leaf finds the middle.
function balance({ gsap, reduce }) {
  const root = document.querySelector('.balance');
  if (!root) return;
  const range = root.querySelector('.balance-range');
  const beam = root.querySelector('.beam');
  const sprouts = root.querySelectorAll('.beam-sprouts path');
  const caption = root.querySelector('.balance-caption');
  const hint = root.querySelector('.balance-hint');
  gsap.set(beam, { svgOrigin: '240 168' });
  gsap.set(sprouts, { scale: 0, svgOrigin: '240 166' });
  const rot = gsap.quickTo(beam, 'rotation', { duration: reduce ? 0 : 0.9, ease: 'elastic.out(1, 0.45)' });
  // The books slide a little on the tilted twig, top ones more than the middle ones; the base stays put.
  const books = [...root.querySelectorAll('.book-top, .book-mid')].map((b) => {
    gsap.set(b, { svgOrigin: b.dataset.o });
    const k = b.classList.contains('book-top') ? [0.55, 0.2] : [0.25, 0.08];
    const o = { duration: reduce ? 0 : 0.8, ease: 'elastic.out(1, 0.5)' };
    return { el: b, k, x: gsap.quickTo(b, 'x', o), r: gsap.quickTo(b, 'rotation', o) };
  });
  const marks = root.querySelectorAll('.book-mark');
  gsap.set(marks, { scale: 0, transformOrigin: '50% 100%' });
  const slide = (t) => books.forEach((b) => {
    if (reduce) return;
    let dx = t * b.k[0];
    let dr = t * b.k[1];
    if (Math.abs(t) > 10 && b.k[0] > 0.5) { dx += Math.sign(t) * 2; dr += Math.sign(t) * 6; }
    b.x(Math.max(-8, Math.min(8, dx)));
    b.r(dr);
  });
  let state = '';
  const text = {
    kind: ['Kind without firm: kids feel loved, but a little lost.', 'Mostly kind'],
    firm: ['Firm without kind: kids comply, but stop sharing.', 'Mostly firm'],
    balanced: ['Kind and firm. That’s Positive Discipline.', 'Balanced: kind and firm'],
  };
  const update = (first) => {
    const v = Number(range.value);
    const next = Math.abs(v - 50) <= 8 ? 'balanced' : v < 50 ? 'kind' : 'firm';
    const tilt = next === 'balanced' ? 0 : ((v - 50) / 50) * 13;
    rot(tilt);
    slide(tilt);
    if (next === state) return;
    state = next;
    root.dataset.state = next;
    caption.textContent = text[next][0];
    range.setAttribute('aria-valuetext', text[next][1]);
    gsap.to(sprouts, { scale: next === 'balanced' ? 1 : 0, duration: reduce ? 0 : 0.6, stagger: 0.08, ease: next === 'balanced' ? 'back.out(2)' : 'power2.in' });
    gsap.to(marks, { scale: next === 'balanced' ? 1 : 0, duration: reduce ? 0 : 0.5, stagger: 0.08, ease: next === 'balanced' ? 'back.out(2)' : 'power2.in' });
    if (next === 'balanced' && !reduce && !first) gsap.fromTo(root.querySelectorAll('.book-top > g'), { y: -4 }, { y: 0, duration: 0.5, ease: 'bounce.out' });
    if (!first && hint) hint.style.visibility = 'hidden';
  };
  range.addEventListener('input', () => update(false));
  update(true);
}

// 09 · C.A.R.E.: on desktop the letters light up one by one while pinned.
function careMethod({ gsap, ScrollTrigger, reduce, lenis }) {
  const section = document.querySelector('.care-method');
  if (!section) return;
  const letters = gsap.utils.toArray('.cm-letters span');
  const steps = gsap.utils.toArray('.cm-step');
  if (reduce) { letters.forEach((l) => l.classList.add('is-on')); return; }
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    section.classList.add('is-pinned-mode');
    let cur = -1;
    // Only one step may ever end up visible: pending tweens are killed and every
    // other step is hidden at once, so fast scrolling or anchor jumps can't stack them.
    const show = (i) => {
      if (i === cur) return;
      cur = i;
      letters.forEach((l, k) => l.classList.toggle('is-on', k === i));
      gsap.killTweensOf(steps);
      steps.forEach((s, k) => { if (k !== i) gsap.set(s, { autoAlpha: 0, y: 0 }); });
      gsap.fromTo(steps[i], { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      gsap.fromTo(steps[i].querySelector('img'), { scale: 1.12 }, { scale: 1, duration: 1.2, ease: 'power3.out' });
    };
    gsap.set(steps, { autoAlpha: 0 });
    const st = ScrollTrigger.create({
      trigger: '.cm-pin', start: 'top top', end: '+=1200', pin: true, anticipatePin: 1,
      onUpdate: (self) => show(Math.min(3, Math.floor(self.progress * 4))),
      onEnter: () => show(0),
    });
    show(0);
    const jump = (e) => {
      const i = letters.indexOf(e.currentTarget);
      const y = st.start + ((i + 0.5) / 4) * (st.end - st.start);
      if (lenis) lenis.scrollTo(y, { duration: reduce ? 0 : 0.9 }); else window.scrollTo({ top: y, behavior: 'smooth' });
    };
    letters.forEach((l) => l.addEventListener('click', jump));
    return () => { letters.forEach((l) => l.removeEventListener('click', jump)); section.classList.remove('is-pinned-mode'); st.kill(); gsap.set(steps, { clearProps: 'all' }); letters.forEach((l) => l.classList.remove('is-on')); cur = -1; };
  });
  mm.add('(max-width: 1023px)', () => {
    const a = gsap.from(steps, { y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.cm-steps', start: 'top 85%', once: true } });
    return () => a.scrollTrigger?.kill();
  });
}

function epWindow() { /* hover handled in CSS; touch "peek" handled in tiles() */ }

// 13 · Her story: a draggable strip.
function journey({ gsap, reduce }) {
  const track = document.querySelector('.journey-track');
  if (!track) return;
  let down = null;
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = { x: e.clientX, left: track.scrollLeft, moved: false };
    track.setPointerCapture(e.pointerId);
  });
  track.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - down.x;
    if (Math.abs(dx) > 4) { down.moved = true; track.classList.add('is-dragging'); }
    track.scrollLeft = down.left - dx;
  });
  const up = () => { down = null; track.classList.remove('is-dragging'); };
  track.addEventListener('pointerup', up);
  track.addEventListener('pointercancel', up);
  if (reduce) return;
  gsap.from(track.children, {
    opacity: 0.2, y: 40, duration: 0.9, stagger: 0.06, ease: 'power3.out',
    scrollTrigger: { trigger: track, start: 'top 85%', once: true },
  });
}

function marquee() {
  document.querySelectorAll('.marquee-row').forEach((row) => { row.innerHTML += row.innerHTML; });
}

function stories({ gsap, reduce }) {
  // Previous / next buttons for every horizontal strip (stories and her story).
  document.querySelectorAll('[data-scroll]').forEach((b) => b.addEventListener('click', () => {
    const list = document.getElementById(b.dataset.target);
    const card = list?.firstElementChild;
    const stepX = card ? card.getBoundingClientRect().width + 16 : 320;
    list?.scrollBy({ left: Number(b.dataset.scroll) * stepX, behavior: reduce ? 'auto' : 'smooth' });
  }));
  // Patagonia's blur-up: blurred until decoded.
  document.querySelectorAll('.blurup img').forEach((img) => {
    const done = () => img.parentElement.classList.add('is-loaded');
    if (img.complete && img.naturalWidth) done();
    else img.addEventListener('load', done, { once: true });
  });
  const dialog = document.getElementById('letter');
  document.querySelector('[data-open="letter"]')?.addEventListener('click', () => {
    if (!dialog?.showModal) return;
    dialog.showModal();
    if (!reduce) gsap.fromTo(dialog, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
  });
}
