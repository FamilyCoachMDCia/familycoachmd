import * as THREE from 'three';
import { motionState } from './ui.js';

// The logo's two leaves (parent and child) on their stem, in 3D.
// One renderer serves every slot: the leaves "stick" to whichever slot
// element is on screen (hero, then the pinned seasons section) and live
// through the seasons through one number, 0 (early years) to 4 (renewal).

const SEASONS = {
  big:        ['#8C9A5B', '#6E7157', '#9A7A45', '#5E6B66', '#6E7157'],
  small:      ['#D3D8A4', '#BDAF90', '#C9875A', '#9AA3A0', '#C4B694'],
  bigScale:   [0.8, 1, 1, 0.97, 1],
  smallScale: [0.6, 1, 1.32, 1, 1.06],
  smallTurn:  [0, 0, 0.42, 0.12, -0.26],  // radians, + turns the child outward
  bigTurn:    [0, 0, -0.1, -0.06, 0.16],  // + leans the parent toward the child
  wind:       [0.6, 0.8, 1, 2.6, 0.55],
  rain:       [0, 0, 0, 1, 0],
  fall:       [0.3, 0.6, 1, 0, 0.35],     // share of falling leaves shown
  bud:        [0, 0, 0, 0, 1],
  sky:        ['#F2F6E6', '#FFF4E2', '#FBE4CF', '#DCE3E6', '#FFF1DA'],
  sun:        ['#FFF5DC', '#FFE2B0', '#FFCF9C', '#E4ECF2', '#FFDFA6'],
  sunPower:   [1.5, 1.8, 1.6, 0.9, 1.9],
  particle:   [['#A9B48A', '#D3D8A4'], ['#6E7157', '#BDAF90'], ['#B5894C', '#C9875A'], ['#9AA3A0', '#9AA3A0'], ['#8C9A5B', '#BDAF90']],
};

const smooth = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;

function sample(key, s) {
  const arr = SEASONS[key];
  const i = Math.min(Math.floor(s), arr.length - 2);
  const t = smooth(Math.min(Math.max(s - i, 0), 1));
  return [arr[i], arr[i + 1], t];
}
const num = (key, s) => { const [a, b, t] = sample(key, s); return lerp(a, b, t); };
const col = (key, s, out) => { const [a, b, t] = sample(key, s); return out.set(a).lerp(new THREE.Color(b), t); };

// Almond leaf along +Y, base at the origin (same silhouette as the logo).
function leafShape(L, w = 0.5) {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.bezierCurveTo(L * w * 0.9, L * 0.15, L * w * 1.05, L * 0.65, 0, L);
  s.bezierCurveTo(-L * w, L * 0.7, -L * w * 0.85, L * 0.12, 0, 0);
  return s;
}

// Static curl (tip bends toward the viewer) and cup (edges lift).
function bend(x, y, L) {
  const t = Math.max(y / L, 0);
  return 0.32 * L * t * t - 0.5 * (x / L) * (x / L) * L;
}

function curlGeometry(geo, L) {
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) p.setZ(i, p.getZ(i) + bend(p.getX(i), p.getY(i), L));
  geo.computeVertexNormals();
  return geo;
}

// Injects the flutter (and, for outlines, a push along the normal) into a material.
function patch(material, u, { hull = 0 } = {}) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = u.uTime;
    shader.uniforms.uFlutter = u.uFlutter;
    shader.uniforms.uPhase = u.uPhase;
    shader.uniforms.uLen = u.uLen;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>
        uniform float uTime; uniform float uFlutter; uniform float uPhase; uniform float uLen;`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        float k = clamp(position.y / uLen, 0.0, 1.0);
        transformed.z += (sin(uTime * 2.3 + position.y * 2.1 + uPhase) * 0.6
                        + sin(uTime * 3.7 + position.x * 3.0 + uPhase * 1.7) * 0.4) * uFlutter * k * k * uLen;
        ${hull ? `transformed += normal * ${hull.toFixed(3)};` : ''}`);
  };
  return material;
}

export function makeLeaf(L, color, sheen, rimColor) {
  const u = {
    uTime: { value: 0 }, uFlutter: { value: 0.03 },
    uPhase: { value: Math.random() * 10 }, uLen: { value: L },
  };
  const shape = leafShape(L);
  const geo = curlGeometry(new THREE.ExtrudeGeometry(shape, {
    depth: 0.05, bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.035, bevelSegments: 3, curveSegments: 40,
  }), L);
  geo.translate(0, 0, -0.025);

  const mat = patch(new THREE.MeshPhysicalMaterial({
    color, roughness: 0.68, metalness: 0, sheen: 1, sheenRoughness: 0.55, sheenColor: new THREE.Color(sheen),
  }), u);
  const leaf = new THREE.Mesh(geo, mat);

  // Inverted hull: the logo's thick ink outline.
  const rimMat = patch(new THREE.MeshBasicMaterial({ color: rimColor, side: THREE.BackSide }), u, { hull: 0.045 });
  const rim = new THREE.Mesh(geo, rimMat);

  // Center vein along the curled surface.
  const pts = [];
  for (let i = 0; i <= 24; i++) {
    const y = (i / 24) * L * 0.9;
    const x = Math.sin((i / 24) * Math.PI) * L * 0.035;
    pts.push(new THREE.Vector3(x, y, bend(x, y, L) + 0.085));
  }
  const vein = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, 0.022, 6, false),
    patch(new THREE.MeshStandardMaterial({ color: rimColor, roughness: 0.8 }), u),
  );

  const g = new THREE.Group();
  g.add(rim, leaf, vein);
  return { group: g, mat, rimMat, u, L };
}

export function initLeaves(host, { slots, compact = false, getSeason, tipEl }) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: window.devicePixelRatio <= 1.5, powerPreference: 'high-performance' });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 12);

  const hemi = new THREE.HemisphereLight('#FFF4E2', '#6E7157', 1.15);
  const sun = new THREE.DirectionalLight('#FFE2B0', 1.8);
  sun.position.set(4, 5, 7);
  const fill = new THREE.DirectionalLight('#F4EFE7', 0.45);
  fill.position.set(-6, -2, 4);
  scene.add(hemi, sun, fill);

  // ---------- The emblem: the two leaves planted in a ceramic pot ----------
  const emblem = new THREE.Group();     // positioned on the slot
  const root = new THREE.Group();       // pot + plant, centered; turns gently with the cursor
  emblem.add(root);
  scene.add(emblem);

  const SOIL_Y = -1.46;
  // The plant pivots where it leaves the soil, so wind and breath move only the
  // plant: the pot stays put.
  const plantPivot = new THREE.Group();
  plantPivot.position.set(0, SOIL_Y, 0);
  const plant = new THREE.Group();
  plant.position.set(0, -SOIL_Y, 0);
  plantPivot.add(plant);

  // Pot: a lathe-turned ceramic body in glazed clay, a cream glazed rim, dark soil,
  // and the same thick ink outline as the leaves (an inverted hull).
  const v2 = (x, y) => new THREE.Vector2(x, y);
  const bodyProfile = [v2(0, -3.05), v2(0.6, -3.05), v2(0.67, -2.99), v2(0.74, -2.6), v2(0.83, -2.1), v2(0.9, -1.78), v2(0.97, -1.76)];
  const rimProfile = [v2(0.97, -1.76), v2(1.02, -1.66), v2(1.03, -1.48), v2(0.99, -1.38), v2(0.9, -1.4), v2(0.88, SOIL_Y - 0.02)];
  const bodyGeo = new THREE.LatheGeometry(bodyProfile, 72);
  const rimGeo = new THREE.LatheGeometry(rimProfile, 72);
  const potMat = new THREE.MeshPhysicalMaterial({ color: '#B4704A', roughness: 0.55, clearcoat: 0.55, clearcoatRoughness: 0.35, sheen: 0.4, sheenColor: new THREE.Color('#E8B48C') });
  const glazeMat = new THREE.MeshPhysicalMaterial({ color: '#EFE6D6', roughness: 0.3, clearcoat: 0.9, clearcoatRoughness: 0.15 });
  const inkMat = new THREE.MeshBasicMaterial({ color: '#3C4136', side: THREE.BackSide });
  const potBody = new THREE.Mesh(bodyGeo, potMat);
  const potRim = new THREE.Mesh(rimGeo, glazeMat);
  const potInk = new THREE.Group();
  [bodyGeo, rimGeo].forEach((g) => {
    const hull = new THREE.Mesh(g, inkMat);
    hull.scale.set(1.035, 1.012, 1.035);
    hull.position.y = -0.012;
    potInk.add(hull);
  });
  // A hand-painted band around the belly, like a glaze line.
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.815, 0.022, 8, 96), new THREE.MeshStandardMaterial({ color: '#EFE6D6', roughness: 0.4 }));
  band.rotation.x = Math.PI / 2;
  band.position.y = -2.18;
  const soil = new THREE.Mesh(new THREE.CircleGeometry(0.89, 48), new THREE.MeshStandardMaterial({ color: '#4A3A2C', roughness: 1 }));
  soil.rotation.x = -Math.PI / 2;
  soil.position.y = SOIL_Y;
  const pot = new THREE.Group();
  pot.add(potInk, potBody, potRim, band, soil);
  root.add(pot, plantPivot);

  // The stem rises from the soil in a gentle S, the logo's line made upright.
  const stemPts = [[0, SOIL_Y - 0.05], [0.06, -0.85], [-0.06, -0.25], [0.1, 0.3], [0.32, 0.78]]
    .map(([x, y]) => new THREE.Vector3(x, y, 0));
  const stemCurve = new THREE.CatmullRomCurve3(stemPts);
  const stemMat = new THREE.MeshStandardMaterial({ color: '#3C4136', roughness: 0.85 });
  const stem = new THREE.Mesh(new THREE.TubeGeometry(stemCurve, 90, 0.075, 10, false), stemMat);
  plant.add(stem);

  const big = makeLeaf(2.7, '#6E7157', '#B9BEA0', '#3C4136');
  const small = makeLeaf(1.75, '#BDAF90', '#F1E7D2', '#7F806E');
  const bigPivot = new THREE.Group();
  const smallPivot = new THREE.Group();
  bigPivot.position.copy(stemPts[stemPts.length - 1]);
  smallPivot.position.set(0.18, 0.2, 0.06);
  bigPivot.rotation.z = -0.42;
  smallPivot.rotation.z = 0.78;
  bigPivot.add(big.group);
  smallPivot.add(small.group);
  plant.add(smallPivot, bigPivot);

  // A new bud for the renewal season.
  const bud = makeLeaf(0.7, '#8C9A5B', '#D3D8A4', '#3C4136');
  const budPivot = new THREE.Group();
  budPivot.position.copy(stemCurve.getPoint(0.42));
  budPivot.rotation.z = 0.5;
  budPivot.add(bud.group);
  budPivot.scale.setScalar(0.001);
  plant.add(budPivot);

  // Soft shadow under the stem.
  const shadowTex = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, 'rgba(30,42,31,0.55)');
    grd.addColorStop(1, 'rgba(30,42,31,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  })();
  // Soft contact shadow under the pot.
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 0.9), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.32, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2.4;
  shadow.position.set(0.15, -3.08, 0);
  root.add(shadow);

  // Center the whole piece and measure it, so it fits its slot.
  const box = new THREE.Box3().setFromObject(root);
  const center = box.getCenter(new THREE.Vector3());
  const extent = box.getSize(new THREE.Vector3());
  root.children.forEach((c) => c.position.sub(center));
  const SIZE = Math.max(extent.x, extent.y); // world units

  // ---------- Falling leaves ----------
  const FALL = compact ? 10 : 14;
  const tiny = new THREE.ShapeGeometry(leafShape(0.32), 8);
  // Flat colors: lit from behind, a thin leaf would read as a dark speck.
  const fallMesh = new THREE.InstancedMesh(tiny, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }), FALL);
  const fallers = Array.from({ length: FALL }, (_, i) => ({
    x: (Math.random() - 0.5) * 6, y: (Math.random() - 0.5) * 7, z: (Math.random() - 0.5) * 3 - 0.5,
    speed: 0.25 + Math.random() * 0.35, phase: Math.random() * 10, spin: (Math.random() - 0.5) * 2,
    tone: i % 2, order: Math.random(),
  }));
  fallMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  emblem.add(fallMesh);

  // ---------- Rain (the hard seasons) ----------
  const RAIN = compact ? 0 : 80;
  const rainMat = new THREE.MeshBasicMaterial({ color: '#4F6473', transparent: true, opacity: 0 });
  const rainMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.014, 0.42, 0.014), rainMat, Math.max(RAIN, 1));
  const drops = Array.from({ length: RAIN }, () => ({ x: (Math.random() - 0.5) * 9, y: Math.random() * 8 - 4, z: (Math.random() - 0.5) * 3, v: 6 + Math.random() * 3 }));
  rainMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  rainMesh.visible = RAIN > 0;
  emblem.add(rainMesh);

  // ---------- Springs (wind and the cursor) ----------
  const springs = {
    big: { a: 0, v: 0, k: 14, d: 3.2 },
    small: { a: 0, v: 0, k: 9, d: 2.4 },   // the child reacts later, and more
    plant: { a: 0, v: 0, k: 6, d: 2.6 },
  };
  const step = (s, target, dt) => {
    s.v += ((target - s.a) * s.k - s.v * s.d) * dt;
    s.a += s.v * dt;
  };

  let W = 1, H = 1, k = 1;
  let slotDirty = true;
  const invalidateSlot = () => { slotDirty = true; };
  function resize() {
    const r = host.getBoundingClientRect();
    const w = Math.max(r.width, 1);
    const h = Math.max(r.height, 1);
    // The desktop canvas covers the whole viewport, even though the model
    // only occupies one slot. Bound the number of pixels on large displays.
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5, Math.sqrt(1_400_000 / (w * h)));
    invalidateSlot();
    if (w === W && h === H && pixelRatio === renderer.getPixelRatio()) return;
    W = w;
    H = h;
    if (pixelRatio !== renderer.getPixelRatio()) renderer.setPixelRatio(pixelRatio);
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    k = (2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z) / H; // world units per px
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('scroll', invalidateSlot, { passive: true });
  const sizes = new ResizeObserver(resize);
  sizes.observe(host);
  slots.forEach(({ el }) => sizes.observe(el));

  // Cursor as wind.
  const pointer = { x: -9999, y: -9999, vx: 0, px: 0.5, py: 0.5 };
  let last = null;
  const onPointer = (e) => {
    if (last) pointer.vx = e.clientX - last.x;
    last = { x: e.clientX, y: e.clientY };
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.px = e.clientX / window.innerWidth;
    pointer.py = e.clientY / window.innerHeight;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  // Tap a leaf: it bobs and names itself.
  const raycaster = new THREE.Raycaster();
  let tipTimer = 0;
  const onSlotClick = (e) => {
    const hr = host.getBoundingClientRect();
    const ndc = new THREE.Vector2(((e.clientX - hr.left) / W) * 2 - 1, -((e.clientY - hr.top) / H) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObjects([big.group, small.group], true)[0];
    const isSmall = hit && small.group.getObjectById(hit.object.id);
    const which = hit ? (isSmall ? 'small' : 'big') : null;
    springs[which || 'plant'].v += which === 'small' ? 4 : 2.5;
    if (!tipEl || !which) return;
    tipEl.textContent = which === 'small' ? 'The child: growing, at their own pace.' : 'The parent: steady and rooted.';
    tipEl.classList.add('is-on');
    clearTimeout(tipTimer);
    tipTimer = setTimeout(() => tipEl.classList.remove('is-on'), 2600);
  };
  slots.forEach((slot) => slot.el.addEventListener('click', onSlotClick));

  // ---------- Loop ----------
  const clock = new THREE.Clock();
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e3 = new THREE.Euler();
  const v3 = new THREE.Vector3();
  const s3 = new THREE.Vector3();
  const tmp = new THREE.Color();
  const tmp2 = new THREE.Color();
  let season = 1;
  let slot = null;
  let opacity;
  const setOpacity = (next) => {
    if (next === opacity) return;
    opacity = next;
    host.style.opacity = next;
  };
  // Scene time only advances while motion is allowed, so "Pause moving content"
  // freezes the leaves and resuming continues smoothly, without a jump.
  let t = 0;

  function activeSlot() {
    let best = null;
    let bestArea = 0;
    const hr = host.getBoundingClientRect();
    for (const s of slots) {
      const r = s.el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const vis = Math.max(0, Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0))
                * Math.max(0, Math.min(r.right, window.innerWidth) - Math.max(r.left, 0));
      if (vis > bestArea) { bestArea = vis; best = { ...s, r, hr, ratio: vis / (r.width * r.height) }; }
    }
    return best;
  }

  function frame() {
    if (slotDirty) {
      slot = activeSlot();
      slotDirty = false;
      setOpacity(slot ? Math.min(1, slot.ratio * 1.6).toFixed(3) : '0');
    }
    if (!slot) return;

    const realDt = Math.min(clock.getDelta(), 0.05);
    const dt = motionState.paused ? 0 : realDt;
    t += dt;

    // Stick to the slot.
    const cx = slot.r.left + slot.r.width / 2 - slot.hr.left;
    const cy = slot.r.top + slot.r.height / 2 - slot.hr.top;
    emblem.position.set((cx - W / 2) * k, -(cy - H / 2) * k, 0);
    const scale = (Math.min(slot.r.width, slot.r.height) * k * 0.9) / SIZE;
    emblem.scale.setScalar(scale);

    // Season (hero stays in the logo's own colors).
    const target = slot.name === 'hero' ? 1 : getSeason();
    // Season follows the visitor's own scrolling, so it updates even while paused.
    season += (target - season) * Math.min(1, realDt * 4);
    const s = Math.min(Math.max(season, 0), 4);

    col('big', s, big.mat.color);
    col('small', s, small.mat.color);
    bigPivot.scale.setScalar(num('bigScale', s));
    smallPivot.scale.setScalar(num('smallScale', s));
    hemi.color.copy(col('sky', s, tmp));
    sun.color.copy(col('sun', s, tmp));
    sun.intensity = num('sunPower', s);
    const wind = num('wind', s);
    const rain = num('rain', s);
    const fallShare = num('fall', s);
    budPivot.scale.setScalar(Math.max(num('bud', s), 0.001));

    // Breathing: 4 s in, 4 s out.
    const breath = Math.sin((t / 8) * Math.PI * 2);
    plantPivot.scale.setScalar(1 + breath * 0.025); // the plant breathes; the pot doesn't

    // Wind: a slow gust pattern, the cursor, and storms.
    const near = pointer.x > slot.r.left - 160 && pointer.x < slot.r.right + 160 && pointer.y > slot.r.top - 120 && pointer.y < slot.r.bottom + 120;
    const push = near ? pointer.vx * 0.012 : 0;
    pointer.vx *= 0.85;
    const gust = (Math.sin(t * 0.7) * 0.6 + Math.sin(t * 1.9 + 1.3) * 0.4) * 0.05 * wind;
    springs.big.v += push * 0.8;
    springs.small.v += push * 1.25;
    step(springs.big, gust, dt);
    step(springs.small, gust * 1.4, dt);
    step(springs.plant, gust * 0.3, dt);

    bigPivot.rotation.z = -0.42 + num('bigTurn', s) + springs.big.a;
    smallPivot.rotation.z = 0.78 + num('smallTurn', s) - springs.small.a;
    plantPivot.rotation.z = springs.plant.a;
    root.rotation.y = lerp(root.rotation.y, (pointer.px - 0.5) * 0.5, 0.04);
    root.rotation.x = lerp(root.rotation.x, 0.08 + (pointer.py - 0.5) * 0.12, 0.04);

    for (const leaf of [big, small, bud]) {
      leaf.u.uTime.value = t;
      leaf.u.uFlutter.value = 0.018 + 0.02 * wind + Math.abs(springs.small.v) * 0.01;
    }

    // Falling leaves.
    const [pa, pb] = SEASONS.particle[Math.min(Math.round(s), 4)];
    for (let i = 0; i < FALL; i++) {
      const f = fallers[i];
      f.y -= f.speed * dt * (0.6 + wind * 0.4);
      f.x += Math.sin(t * 0.9 + f.phase) * dt * 0.35 + wind * dt * 0.06;
      if (f.y < -3.8) { f.y = 3.8; f.x = (Math.random() - 0.5) * 6; }
      if (f.x > 3.4) f.x = -3.4;
      const show = f.order < fallShare ? 1 : 0;
      e3.set(Math.sin(t * f.spin + f.phase) * 1.2, t * f.spin * 0.6, Math.sin(t * 0.8 + f.phase) * 0.9);
      q.setFromEuler(e3);
      m4.compose(v3.set(f.x, f.y, f.z), q, s3.setScalar(show * (0.7 + (i % 3) * 0.2)));
      fallMesh.setMatrixAt(i, m4);
      fallMesh.setColorAt(i, f.tone ? tmp2.set(pb) : tmp2.set(pa));
    }
    fallMesh.instanceMatrix.needsUpdate = true;
    if (fallMesh.instanceColor) fallMesh.instanceColor.needsUpdate = true;

    // Rain.
    rainMat.opacity = rain * 0.45;
    if (RAIN && rain > 0.01) {
      for (let i = 0; i < RAIN; i++) {
        const d = drops[i];
        d.y -= d.v * dt;
        d.x -= d.v * dt * 0.18;
        if (d.y < -4.2) { d.y = 4.2; d.x = (Math.random() - 0.5) * 9 + 0.8; }
        e3.set(0, 0, 0.18);
        q.setFromEuler(e3);
        m4.compose(v3.set(d.x, d.y, d.z), q, s3.setScalar(1));
        rainMesh.setMatrixAt(i, m4);
      }
      rainMesh.instanceMatrix.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }

  const visibleSlots = new Set();
  let running = false;
  function syncLoop() {
    const next = !document.hidden && visibleSlots.size > 0;
    if (next === running) return;
    running = next;
    if (running) {
      clock.start();
      invalidateSlot();
    } else {
      setOpacity('0');
    }
    renderer.setAnimationLoop(running ? frame : null);
  }
  const visibility = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) visibleSlots.add(entry.target);
      else visibleSlots.delete(entry.target);
    }
    invalidateSlot();
    syncLoop();
  });
  slots.forEach(({ el }) => visibility.observe(el));
  document.addEventListener('visibilitychange', syncLoop);

  if (import.meta.env.DEV) window.__leaves = { emblem, plant, activeSlot, host };

  // Full teardown, used when the layout crosses the desktop breakpoint.
  function destroy() {
    renderer.setAnimationLoop(null);
    visibility.disconnect();
    sizes.disconnect();
    window.removeEventListener('resize', resize);
    window.removeEventListener('scroll', invalidateSlot);
    window.removeEventListener('pointermove', onPointer);
    document.removeEventListener('visibilitychange', syncLoop);
    slots.forEach((slot) => slot.el.removeEventListener('click', onSlotClick));
    clearTimeout(tipTimer);
    scene.traverse((o) => {
      o.geometry?.dispose();
      [].concat(o.material || []).forEach((m) => { m.map?.dispose(); m.dispose(); });
    });
    renderer.dispose();
    renderer.domElement.remove();
    host.style.opacity = '';
  }
  return { resize, destroy };
}
