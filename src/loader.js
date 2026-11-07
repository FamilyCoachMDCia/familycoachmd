// 00 · Loader: "Take a breath". An amber sun breathes in and out while the
// logo's two leaves drift down onto the stem; then the page opens from the sun.
const HARD_CAP = 3600;   // ms from start: exit no matter what
const SEEN_KEY = 'fcmd-loader-seen';

export function runLoader({ gsap, reduce }) {
  const loader = document.getElementById('loader');
  if (!loader) return Promise.resolve();
  if (import.meta.env.DEV && new URLSearchParams(location.search).has('shot')) {
    loader.remove(); // headless section screenshots skip the intro
    return Promise.resolve();
  }
  const wrap = loader.querySelector('.loader-logo');
  const svg = loader.querySelector('.fcmd-logo');
  const sunEl = loader.querySelector('.loader-sun');
  const words = [...loader.querySelectorAll('.loader-word')];
  const navLogo = document.querySelector('.nav-logo img');
  const started = performance.now();

  let seen = false;
  try { seen = sessionStorage.getItem(SEEN_KEY) === '1'; sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* private mode */ }

  const ready = Promise.race([assetsReady(), wait(HARD_CAP - 700)]);
  const say = (i) => words.forEach((w, k) => w.classList.toggle('is-on', k === i));

  if (reduce) {
    say(-1);
    return gsap.timeline()
      .from(wrap, { opacity: 0, duration: 0.3 })
      .to({}, { duration: 0.4 })
      .then(() => ready)
      .then(() => gsap.to(loader, { opacity: 0, duration: 0.3 }))
      .then(() => loader.remove());
  }

  const center = svg.querySelector('.fcmd-stem-center');
  const leafSmall = svg.querySelector('.fcmd-leaf-small');
  const leafBig = svg.querySelector('.fcmd-leaf-big');
  const glyphs = svg.querySelectorAll('.glyph');

  gsap.set(center, { drawSVG: '0%' });
  gsap.set(glyphs, { y: 120, rotation: 5, opacity: 0, transformOrigin: '50% 100%' });
  gsap.set(leafBig, { svgOrigin: leafBig.dataset.origin, x: 900, y: -1500, rotation: 50, opacity: 0 });
  gsap.set(leafSmall, { svgOrigin: leafSmall.dataset.origin, x: -1700, y: -1300, rotation: -60, opacity: 0 });
  gsap.set(sunEl, { opacity: 0, scale: 1 });

  // Skip on any click, tap or key.
  let skip = null;
  const onSkip = () => skip?.();
  window.addEventListener('pointerdown', onSkip, { once: true });
  window.addEventListener('keydown', onSkip, { once: true });

  const tl = gsap.timeline();
  tl.to(sunEl, { opacity: 1, duration: 0.3, ease: 'sine.out' }, 0)
    .call(() => say(1), null, 0.35)
    .to(sunEl, { scale: 11, duration: 1.3, ease: 'sine.inOut' }, 0.3)          // inhale
    .call(() => say(2), null, 1.6)
    .to(sunEl, { scale: 6, duration: 1.0, ease: 'sine.inOut' }, 1.6)           // exhale
    .to(center, { drawSVG: '100%', duration: 1.0, ease: 'power2.inOut' }, 1.45)
    // The leaves fall like real leaves: drifting, rocking side to side.
    .to(leafBig, { opacity: 1, duration: 0.25 }, 1.55)
    .to(leafBig, { x: 0, y: 0, duration: 1.05, ease: 'power2.out' }, 1.55)
    .to(leafBig, { keyframes: { rotation: [50, -22, 14, -6, 0] }, duration: 1.05, ease: 'sine.inOut' }, 1.55)
    .to(leafSmall, { opacity: 1, duration: 0.25 }, 1.7)
    .to(leafSmall, { x: 0, y: 0, duration: 1.0, ease: 'power2.out' }, 1.7)
    .to(leafSmall, { keyframes: { rotation: [-60, 26, -12, 5, 0] }, duration: 1.0, ease: 'sine.inOut' }, 1.7)
    .to(glyphs, { y: 0, rotation: 0, opacity: 1, duration: 0.55, stagger: 0.045, ease: 'power3.out' }, 1.9)
    // The leaves touch: one soft pulse.
    .to(wrap, { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 2.7)
    .call(() => say(-1), null, 2.7);

  if (seen) tl.timeScale(3);
  skip = () => tl.progress(1);

  return tl.then(() => ready).then(() => {
    window.removeEventListener('pointerdown', onSkip);
    window.removeEventListener('keydown', onSkip);
    const elapsed = performance.now() - started;
    const exit = exitTimeline(gsap, { loader, wrap, navLogo, sunEl });
    if (elapsed > HARD_CAP) exit.timeScale(1.4);
    return wait(300);
  });
}

function exitTimeline(gsap, { loader, wrap, navLogo, sunEl }) {
  const tl = gsap.timeline({ onComplete: () => loader.remove() });
  if (navLogo) {
    // Fly the logo onto the nav logo (same viewBox).
    const from = wrap.getBoundingClientRect();
    const to = navLogo.getBoundingClientRect();
    gsap.set(navLogo, { opacity: 0 });
    tl.to(wrap, {
      x: to.left + to.width / 2 - (from.left + from.width / 2),
      y: to.top + to.height / 2 - (from.top + from.height / 2),
      scale: to.width / from.width, duration: 0.9, ease: 'expo.inOut',
    }, 0.05)
      .set(navLogo, { opacity: 1 }, 0.95)
      .set(wrap, { opacity: 0 }, 0.95);
  }
  // The page opens from the sun outward: a growing hole in the loader.
  const hole = { r: 0 };
  const paint = () => {
    const m = `radial-gradient(circle at 50% 46%, transparent ${hole.r}vmax, #000 ${hole.r + 0.5}vmax)`;
    loader.style.webkitMaskImage = m;
    loader.style.maskImage = m;
  };
  tl.to(sunEl, { scale: 18, opacity: 0, duration: 0.9, ease: 'expo.in' }, 0)
    .to(hole, { r: 120, duration: 1.0, ease: 'expo.inOut', onUpdate: paint }, 0.15);
  return tl;
}

function assetsReady() {
  return Promise.all([document.fonts.ready]);
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
