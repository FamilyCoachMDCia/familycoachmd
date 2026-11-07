import * as THREE from 'three';
import { makeLeaf } from './leaves3d.js';
import { motionState } from './ui.js';

// 07 · Coaching: a real plant that grows. A procedural stem rises from a clay pot
// and opens one leaf at a time; growth follows the scroll (a little) and each
// "yes" in the checklist (a lot). The SVG sprout stays underneath as the fallback.

const NODES = 7;
const THRESH = [0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 0.98];
const LEAF_COLORS = ['#8C9A5B', '#6E7157', '#8C9A5B', '#6E7157', '#8C9A5B', '#A9B48A', '#D3D8A4'];

export function initPlant3d(slot, state) {
  const host = document.createElement('div');
  host.className = 'sprout-canvas';
  slot.appendChild(host);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, -0.15, 17.5);
  camera.lookAt(0, -0.15, 0);
  const hemi = new THREE.HemisphereLight('#FFF4E2', '#6E7157', 1.15);
  const sun = new THREE.DirectionalLight('#FFE2B0', 1.8);
  sun.position.set(4, 5, 7);
  const fill = new THREE.DirectionalLight('#F4EFE7', 0.45);
  fill.position.set(-6, -2, 4);
  scene.add(hemi, sun, fill);

  const root = new THREE.Group();
  scene.add(root);

  // Pot (same clay and glaze as the hero pot).
  const SOIL_Y = -2.2;
  const v2 = (x, y) => new THREE.Vector2(x, y);
  const body = new THREE.LatheGeometry([v2(0, -4.1), v2(0.8, -4.1), v2(0.9, -4.0), v2(1.0, -3.5), v2(1.12, -2.9), v2(1.22, -2.5), v2(1.3, -2.48)], 64);
  const rim = new THREE.LatheGeometry([v2(1.3, -2.48), v2(1.36, -2.36), v2(1.37, -2.12), v2(1.32, -2.0), v2(1.2, -2.02), v2(1.18, SOIL_Y - 0.03)], 64);
  const potMat = new THREE.MeshPhysicalMaterial({ color: '#B4704A', roughness: 0.55, clearcoat: 0.55, clearcoatRoughness: 0.35 });
  const glaze = new THREE.MeshPhysicalMaterial({ color: '#EFE6D6', roughness: 0.3, clearcoat: 0.9 });
  const ink = new THREE.MeshBasicMaterial({ color: '#3C4136', side: THREE.BackSide });
  const pot = new THREE.Group();
  [body, rim].forEach((g) => { const h = new THREE.Mesh(g, ink); h.scale.set(1.035, 1.012, 1.035); h.position.y = -0.015; pot.add(h); });
  pot.add(new THREE.Mesh(body, potMat), new THREE.Mesh(rim, glaze));
  const soil = new THREE.Mesh(new THREE.CircleGeometry(1.19, 48), new THREE.MeshStandardMaterial({ color: '#4A3A2C', roughness: 1 }));
  soil.rotation.x = -Math.PI / 2;
  soil.position.y = SOIL_Y;
  pot.add(soil);
  root.add(pot);

  // The plant sways from where it leaves the soil.
  const pivot = new THREE.Group();
  pivot.position.y = SOIL_Y;
  root.add(pivot);

  const H = 5.4;
  const curve = new THREE.CatmullRomCurve3([[0, 0], [0.12, 1.2], [-0.12, 2.5], [0.1, 3.8], [-0.04, H]].map(([x, y]) => new THREE.Vector3(x, y, 0)));
  const SEG = 120;
  const RAD = 10;
  const stemGeo = new THREE.TubeGeometry(curve, SEG, 0.09, RAD, false);
  // Taper toward the tip.
  const pos = stemGeo.attributes.position;
  const c = new THREE.Vector3();
  for (let i = 0; i <= SEG; i++) {
    const t = i / SEG;
    curve.getPointAt(t, c);
    const k = 1 - 0.6 * t;
    for (let j = 0; j <= RAD; j++) {
      const idx = i * (RAD + 1) + j;
      pos.setXYZ(idx, c.x + (pos.getX(idx) - c.x) * k, pos.getY(idx), c.z + (pos.getZ(idx) - c.z) * k);
    }
  }
  stemGeo.computeVertexNormals();
  const stem = new THREE.Mesh(stemGeo, new THREE.MeshStandardMaterial({ color: '#3C4136', roughness: 0.85 }));
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 8), stem.material);
  pivot.add(stem, tip);
  const indexCount = stemGeo.index.count;
  const perSeg = indexCount / SEG;

  // Leaves alternate left and right in one plane facing the viewer (like a
  // pressed specimen), turned only slightly so they keep their 3D curl.
  const leaves = [];
  for (let i = 0; i < NODES; i++) {
    const top = i === NODES - 1;
    const t = top ? 1 : 0.14 + (i / (NODES - 2)) * 0.76;
    const L = top ? 1.05 : 1.6 - i * 0.1;
    const leaf = makeLeaf(L, LEAF_COLORS[i], '#B9BEA0', '#3C4136');
    const side = i % 2 ? 1 : -1; // -1 = left, 1 = right
    const holder = new THREE.Group();
    const p = curve.getPointAt(t);
    holder.position.copy(p);
    holder.rotation.y = top ? 0 : side * 0.32;
    const tilt = new THREE.Group();
    tilt.rotation.z = top ? 0 : -side * (1.05 - i * 0.04);
    tilt.rotation.x = top ? 0.1 : 0.22;
    tilt.add(leaf.group);
    holder.add(tilt);
    leaf.group.scale.setScalar(0.001);
    pivot.add(holder);
    leaves.push({ ...leaf, tilt, t, open: 0 });
  }

  // Growth: a spring toward the target from the scroll and the checklist.
  let g = 0;
  let vel = 0;
  const target = () => Math.min(1, 0.3 * state.scroll + 0.7 * (state.checked / 5));

  const resize = () => {
    const r = host.getBoundingClientRect();
    if (!r.width || !r.height) return;
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  // Clicking the plant only makes it sway.
  let poke = 0;
  host.addEventListener('pointerdown', () => { poke = 1; });
  let wind = 0;
  const onMove = (e) => { wind = (e.clientX / window.innerWidth - 0.5) * 2; };
  window.addEventListener('pointermove', onMove, { passive: true });

  let visible = false;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; renderer.setAnimationLoop(visible ? frame : null); });
  io.observe(host);

  const clock = new THREE.Clock();
  let first = true;
  let slow = 0;
  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const time = clock.elapsedTime;
    // Spring.
    const a = (target() - g) * 10 - vel * 5;
    vel += a * dt;
    g += vel * dt;
    const gg = Math.max(0.04, Math.min(1, g));
    const segs = Math.max(1, Math.round(gg * SEG));
    stemGeo.setDrawRange(0, segs * perSeg);
    curve.getPointAt(segs / SEG, tip.position);

    leaves.forEach((l, i) => {
      const want = gg >= THRESH[i] ? 1 : 0;
      l.open += (want - l.open) * Math.min(1, dt * 4);
      const o = l.open;
      const s = o < 0.001 ? 0.001 : o * (1 + 0.12 * Math.sin(Math.min(o, 1) * Math.PI));
      l.group.scale.setScalar(s);
      l.group.rotation.x = (1 - o) * 1.1;
      l.u.uTime.value = time;
      l.u.uFlutter.value = motionState.paused ? 0 : 0.035;
    });

    // Breath, wind and the poke.
    poke *= 0.96;
    const still = motionState.paused;
    pivot.rotation.z = still ? 0 : Math.sin(time * 0.8) * 0.025 + wind * 0.03 + Math.sin(time * 9) * 0.05 * poke;
    root.rotation.y = still ? 0 : Math.sin(time * 0.25) * 0.05 + wind * 0.05;
    const breath = still ? 1 : 1 + Math.sin(time * (Math.PI * 2 / 8)) * 0.012;
    pivot.scale.setScalar(breath);

    renderer.render(scene, camera);
    if (first) { first = false; document.documentElement.classList.add('has-plant3d'); }
    // Watchdog: a struggling device falls back to the SVG sprout.
    if (dt > 1 / 24) { slow += dt; if (slow > 3) destroy(); } else slow = Math.max(0, slow - dt);
  }

  renderer.domElement.addEventListener('webglcontextlost', () => destroy());

  function destroy() {
    renderer.setAnimationLoop(null);
    io.disconnect();
    ro.disconnect();
    window.removeEventListener('pointermove', onMove);
    scene.traverse((o) => { o.geometry?.dispose(); (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m?.dispose()); });
    renderer.dispose();
    host.remove();
    document.documentElement.classList.remove('has-plant3d');
  }
  return { destroy };
}
