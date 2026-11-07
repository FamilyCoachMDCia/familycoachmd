import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Lenis from 'lenis';

import { runLoader } from './loader.js';
import { initUI } from './ui.js';
import { initSections, seasonState } from './sections.js';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MotionPathPlugin);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) document.documentElement.classList.add('reduce');
// Only now, with the script actually running, may reveal elements start hidden.
document.documentElement.classList.add('anim');
const ctx = { gsap, ScrollTrigger, SplitText, reduce, lenis: null };

// Smooth scroll on pointer devices only; touch keeps native scrolling.
if (!reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  ctx.lenis = lenis;
  if (import.meta.env.DEV) window.__lenis = lenis; // for local testing only
}

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
ctx.lenis?.stop();

initUI(ctx);

document.fonts.ready.then(() => {
  initSections(ctx);
  ScrollTrigger.refresh();
});

runLoader(ctx).then(() => {
  ctx.lenis?.start();
  document.documentElement.classList.add('is-loaded');
  heroIntro();
  loadLeaves();
  if (import.meta.env.DEV) devShot();
});

function heroIntro() {
  if (reduce) return;
  gsap.getById('hero-h1')?.play();
  const items = gsap.utils.toArray('.hero-rotator, .hero-sub, .hero-lede, .hero-ctas, .hero .chips');
  gsap.from(items, { y: 30, opacity: 0, duration: 0.9, stagger: 0.08, delay: 0.15, ease: 'power3.out' });
  const note = document.querySelector('.hand-note-md');
  if (note && window.innerWidth >= 1024) {
    gsap.timeline({ delay: 1.2 })
      .to(note, { opacity: 1, duration: 0.3 })
      .fromTo(note.querySelector('path'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.9, ease: 'power2.inOut' }, 0);
  }
}

// Three.js is the heaviest dependency: load it after first paint and only
// when WebGL works. Phones keep the static SVG logo (lighter, and the text
// stays the first thing they read). The scene is rebuilt when the layout
// crosses a breakpoint, so it always lives in the right place.
function loadLeaves() {
  const heroSlot = document.querySelector('.hero-leaves-slot');
  if (reduce || !heroSlot || !hasWebGL()) return;
  if (import.meta.env.DEV && new URLSearchParams(location.search).has('no3d')) return;
  const desktop = matchMedia('(min-width: 1024px)');
  const tablet = matchMedia('(min-width: 768px)');
  let scene = null;
  let mode = '';
  const build = (initLeaves) => {
    const next = desktop.matches ? 'desktop' : tablet.matches ? 'tablet' : 'phone';
    if (next === mode) return;
    mode = next;
    scene?.destroy();
    scene = null;
    document.documentElement.classList.remove('has-webgl');
    if (mode === 'phone') return;
    const compact = mode === 'tablet';
    const host = compact ? heroSlot : document.getElementById('leaves-stage');
    const slots = compact
      ? [{ name: 'hero', el: heroSlot }]
      : [{ name: 'hero', el: heroSlot }, { name: 'seasons', el: document.querySelector('.seasons-leaves-slot') }];
    scene = initLeaves(host, { slots, compact, getSeason: () => seasonState.value, tipEl: heroSlot.querySelector('.leaf-tip') });
    document.documentElement.classList.add('has-webgl');
  };
  if (!tablet.matches) { // phones: only fetch three.js if the window later grows
    const later = () => { if (tablet.matches) { tablet.removeEventListener('change', later); loadLeaves(); } };
    tablet.addEventListener('change', later);
    return;
  }
  import('./leaves3d.js').then(({ initLeaves }) => {
    build(initLeaves);
    desktop.addEventListener('change', () => build(initLeaves));
    tablet.addEventListener('change', () => build(initLeaves));
  }).catch((err) => { if (import.meta.env.DEV) console.error(err); });
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

// Local testing only: ?shot=<section id>&dy=<px> jumps there after the loader.
function devShot() {
  const q = new URLSearchParams(location.search);
  const id = q.get('shot');
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  // Wait until fonts are in and the pins exist, so the target is measured
  // in the final layout.
  document.fonts.ready.then(() => setTimeout(() => {
    ScrollTrigger.refresh();
    const y = el.getBoundingClientRect().top + window.scrollY + (Number(q.get('dy')) || 0);
    if (ctx.lenis) ctx.lenis.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo(0, y);
    ScrollTrigger.update();
  }, 800));
}
