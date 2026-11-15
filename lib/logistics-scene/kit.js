// Shared materials, geometry helpers, instancing batcher, textures, paths.
import * as THREE from 'three';

export const PI = Math.PI;
const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.75, metalness: 0, ...o });

/* ---------- procedural textures ---------- */
export function canvasTex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 16;
  return t;
}
function dataNormal(w, h, fn) {
  const d = new Uint8Array(w * h * 4);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const [nx, ny] = fn(x / w, y / h);
    const nz = Math.sqrt(Math.max(0.05, 1 - nx * nx - ny * ny)), i = (y * w + x) * 4;
    d[i] = (nx * .5 + .5) * 255; d[i + 1] = (ny * .5 + .5) * 255; d[i + 2] = (nz * .5 + .5) * 255; d[i + 3] = 255;
  }
  const t = new THREE.DataTexture(d, w, h); t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.magFilter = THREE.LinearFilter; t.minFilter = THREE.LinearMipmapLinearFilter; t.generateMipmaps = true;
  t.anisotropy = 16; t.needsUpdate = true; return t;
}
export function corrugation(repeat) {
  const t = dataNormal(64, 4, (u) => {
    let s = 0; if (u > .18 && u < .34) s = 1; else if (u > .66 && u < .82) s = -1;
    return [-s * 0.55, 0];
  });
  t.repeat.set(repeat, 1); return t;
}
export function oceanNormal() {
  const Rr = rng(5), W = []; for (let i = 0; i < 26; i++) { const k = Math.round((Rr() * 2 - 1) * (3 + i * .9)), l = Math.round((Rr() * 2 - 1) * (3 + i * .9)); if (!k && !l) continue; W.push([k, l, 1.6 / (2 + Math.hypot(k, l)), Rr() * 6.28]); }
  const t = dataNormal(512, 512, (u, v) => {
    let gx = 0, gy = 0;
    for (const [k, l, a, p] of W) { const c = Math.cos(2 * PI * (k * u + l * v) + p) * a; gx += c * k; gy += c * l; }
    return [-gx * 0.035, -gy * 0.035];
  });
  return t;
}

function emblem(g, cx, cy, s, color) { // three swept "wing" strokes inspired by the KHENMARG mark
  g.save(); g.translate(cx, cy); g.fillStyle = color;
  for (let i = 0; i < 3; i++) {
    const k = 1 - i * 0.22, ox = i * s * 0.2, oy = i * s * 0.06;
    g.beginPath();
    g.moveTo(ox - s * .30 * k, oy + s * .48 * k);
    g.bezierCurveTo(ox + s * .30 * k, oy + s * .25 * k, ox + s * .28 * k, oy - s * .25 * k, ox - s * .05 * k, oy - s * .5 * k);
    g.bezierCurveTo(ox + s * .08 * k, oy - s * .2 * k, ox + s * .05 * k, oy + s * .15 * k, ox - s * .30 * k, oy + s * .48 * k);
    g.fill();
  }
  g.restore();
}
const FONT = '"Arial Black", "Segoe UI Black", Arial, sans-serif';
export function logoTex(color = '#ffffff', sub = '') {
  return canvasTex(1024, 256, (g, w, h) => {
    emblem(g, 96, 122, 170, color);
    g.fillStyle = color; g.textBaseline = 'middle';
    g.font = `italic 900 ${sub ? 128 : 150}px ${FONT}`;
    g.fillText('KHENMARG', 190, sub ? 104 : 132, 810);
    if (sub) { g.font = `700 46px Arial, sans-serif`; g.fillText(sub, 196, 204, 800); }
  });
}
export function containerSideTex() {
  return canvasTex(2048, 436, (g, w, h) => {
    g.fillStyle = '#E05A2B'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#C9431F'; g.fillRect(0, h - 44, w, 44); g.fillRect(0, 0, w, 16);
    emblem(g, 330, 196, 270, '#ffffff');
    g.fillStyle = '#fff'; g.textBaseline = 'middle';
    g.font = `italic 900 208px ${FONT}`; g.fillText('KHENMARG', 480, 176, 1080);
    g.font = '700 54px Arial, sans-serif'; g.fillText('LOGISTICS SOURCING PVT. LTD.', 492, 318, 1060);
    g.font = '700 40px Arial, sans-serif'; g.textAlign = 'right';
    g.fillText('KMGU 150826 4', w - 60, 70); g.fillText("45G1  40' HC", w - 60, 122);
    g.textAlign = 'left'; g.font = '700 34px Arial, sans-serif';
    g.fillText('WE PAVE THE WAY FOR YOUR CARGO', 60, 70);
  });
}
export function roofSignTex() {
  return canvasTex(1024, 512, (g, w, h) => {
    g.fillStyle = '#D14B28'; g.fillRect(0, 0, w, h);
    emblem(g, 150, 220, 250, '#fff');
    g.fillStyle = '#fff'; g.textBaseline = 'middle';
    g.font = `italic 900 150px ${FONT}`; g.fillText('KHENMARG', 280, 200, 700);
    g.font = '700 58px Arial, sans-serif'; g.fillText('LOGISTICS', 288, 330, 690);
  });
}
export function checkTex() {
  return canvasTex(256, 256, (g) => {
    const gr = g.createRadialGradient(128, 128, 60, 128, 128, 128);
    gr.addColorStop(0, 'rgba(52,211,153,.9)'); gr.addColorStop(.62, 'rgba(52,211,153,.55)'); gr.addColorStop(1, 'rgba(52,211,153,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
    g.fillStyle = '#16a34a'; g.beginPath(); g.arc(128, 128, 78, 0, 7); g.fill();
    g.strokeStyle = '#fff'; g.lineWidth = 9; g.beginPath(); g.arc(128, 128, 78, 0, 7); g.stroke();
    g.lineWidth = 22; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(88, 132); g.lineTo(117, 160); g.lineTo(170, 100); g.stroke();
  });
}
export function wakeTex() {
  return canvasTex(256, 128, (g, w, h) => {
    const img = g.createImageData(w, h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const u = x / w, v = Math.abs(y / h - .5) * 2;        // u=1 at stern
      const a = Math.pow(u, 1.8) * Math.exp(-Math.pow(v / .62, 4)) * (.75 + .25 * Math.sin(u * 40 + v * 9));
      const i = (y * w + x) * 4; img.data[i] = img.data[i + 1] = img.data[i + 2] = 255; img.data[i + 3] = a * 255;
    }
    g.putImageData(img, 0, 0);
  });
}

/* ---------- materials ---------- */
export const M = {
  slate: std(0x2B2E34), grey: std(0x4A4E54), mid: std(0x7b8088), light: std(0xD1D5DB), white: std(0xF8FAFC, { roughness: .6 }),
  land: std(0x3b3f45, { roughness: .95 }), landEdge: std(0xaab0b7, { roughness: .85 }), asphalt: std(0x2c2f34, { roughness: .95 }),
  concrete: std(0x6c7178, { roughness: .92 }), apron: std(0x555a61, { roughness: .92 }), pave: std(0xb4bac1, { roughness: .9 }),
  line: std(0xe8ebef, { roughness: .8 }), lineY: std(0xF59E0B, { roughness: .8 }),
  terra: std(0xD14B28, { roughness: .55 }), orange: std(0xE05A2B, { roughness: .5 }),
  yellow: std(0xF59E0B, { roughness: .5, metalness: .05 }), yellowD: std(0xb87508, { roughness: .6 }),
  rubber: std(0x111214, { roughness: .92 }), steel: std(0xa3a9b1, { roughness: .35, metalness: .75 }), dark: std(0x1a1c20, { roughness: .6 }),
  glass: std(0x16202c, { roughness: .08, metalness: .85 }), card: std(0xb98f5e, { roughness: .9 }), wood: std(0x8a6845, { roughness: .9 }),
  skin: std(0xc98d63, { roughness: .8 }), navy: std(0x222a39), vestO: std(0xff6a1f, { roughness: .7 }), vestY: std(0xf5c518, { roughness: .7 }),
  shirt: std(0x5b6470), shirtW: std(0xe9edf2), hair: std(0x15120f), khaki: std(0x6b7280),
  tree: std(0x566858, { roughness: 1 }), tree2: std(0x687a66, { roughness: 1 }), trunk: std(0x4a4038, { roughness: 1 }), grass: std(0x4b574c, { roughness: 1 }),
  ballast: std(0x5b5e63, { roughness: 1 }), sleeper: std(0x3a3632, { roughness: 1 }),
  interior: std(0x8f949b, { roughness: .9 }), void: std(0x0c0d10, { roughness: 1 }),
  cont: std(0xffffff, { roughness: .6 }),
  ocean: std(0x1E293B, { roughness: .5, metalness: .15 }),
};
M.cont.normalMap = corrugation(26); M.cont.normalScale = new THREE.Vector2(.6, .6);
for (const k of ['line', 'lineY', 'asphalt', 'concrete', 'apron', 'pave', 'grass', 'ballast']) M[k].userData.noCast = true;

/* ---------- geometry ---------- */
export const GEO = {
  box: new THREE.BoxGeometry(1, 1, 1),
  cyl: new THREE.CylinderGeometry(1, 1, 1, 28),
  sph: new THREE.IcosahedronGeometry(1, 3),
  cone: new THREE.ConeGeometry(1, 1, 20),
};
const sh = (m) => { m.castShadow = true; m.receiveShadow = true; return m; };
export function bx(mat, sx, sy, sz, x = 0, y = 0, z = 0) {           // y = bottom
  const m = sh(new THREE.Mesh(GEO.box, mat)); m.scale.set(sx, sy, sz); m.position.set(x, y + sy / 2, z); return m;
}
export function cy(mat, r, h, x = 0, y = 0, z = 0, axis = 'y') {     // centred
  const m = sh(new THREE.Mesh(GEO.cyl, mat)); m.scale.set(r, h, r); m.position.set(x, y, z);
  if (axis === 'z') m.rotation.x = PI / 2; if (axis === 'x') m.rotation.z = PI / 2; return m;
}
export function sp(mat, rx, ry, rz, x, y, z) { const m = sh(new THREE.Mesh(GEO.sph, mat)); m.scale.set(rx, ry, rz); m.position.set(x, y, z); return m; }
export function mesh(geo, mat) { return sh(new THREE.Mesh(geo, mat)); }
export function grp(x = 0, y = 0, z = 0, ...kids) { const g = new THREE.Group(); g.position.set(x, y, z); kids.forEach(k => g.add(k)); return g; }
export function wheel(r, w, x, z) { const g = grp(x, r, z, cy(M.rubber, r, w, 0, 0, 0, 'z'), cy(M.light, r * .52, w + .03, 0, 0, 0, 'z')); return g; }
const _y = new THREE.Vector3(0, 1, 0), _d = new THREE.Vector3();
export function stretch(m, ax, ay, az, bx_, by, bz) {                 // unit-Y mesh between two points
  _d.set(bx_ - ax, by - ay, bz - az); const L = _d.length();
  m.position.set((ax + bx_) / 2, (ay + by) / 2, (az + bz) / 2); m.scale.y = L; m.quaternion.setFromUnitVectors(_y, _d.normalize()); return m;
}
export function rod(mat, t, ax, ay, az, bx_, by, bz, round = false) {
  const m = sh(new THREE.Mesh(round ? GEO.cyl : GEO.box, mat)); m.scale.set(t, 1, t); return stretch(m, ax, ay, az, bx_, by, bz);
}
export function decal(tex, w, h, o = {}) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: .6, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4, ...o }));
  m.receiveShadow = true; return m;
}
export function extrude(pts, depth, bevel = 0) {                      // pts in XY, extruded along Z, centred in Z
  const s = new THREE.Shape(pts.map(p => new THREE.Vector2(p[0], p[1])));
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: bevel > 0, bevelSize: bevel, bevelThickness: bevel, bevelSegments: 2, curveSegments: 12 });
  g.translate(0, 0, -depth / 2); return g;
}

/* ---------- static instancing batcher ---------- */
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _p = new THREE.Vector3(), _s = new THREE.Vector3(), _e = new THREE.Euler(), _c = new THREE.Color();
export class Batch {
  constructor() { this.map = new Map(); }
  _add(gk, mat, color) {
    const k = gk + '|' + mat.uuid; let e = this.map.get(k);
    if (!e) { e = { gk, mat, ms: [], cols: [] }; this.map.set(k, e); }
    e.ms.push(_m.clone()); if (color !== undefined) e.cols.push(color);
  }
  box(mat, sx, sy, sz, x, y, z, ry = 0) { _m.compose(_p.set(x, y + sy / 2, z), _q.setFromEuler(_e.set(0, ry, 0)), _s.set(sx, sy, sz)); this._add('box', mat); }
  cyl(mat, r, h, x, y, z, rx = 0, rz = 0) { _m.compose(_p.set(x, (rx || rz) ? y : y + h / 2, z), _q.setFromEuler(_e.set(rx, 0, rz)), _s.set(r, h, r)); this._add('cyl', mat); }
  sph(mat, sx, sy, sz, x, y, z) { _m.compose(_p.set(x, y, z), _q.identity(), _s.set(sx, sy, sz)); this._add('sph', mat); }
  cone(mat, r, h, x, y, z) { _m.compose(_p.set(x, y + h / 2, z), _q.identity(), _s.set(r, h, r)); this._add('cone', mat); }
  cont(color, x, y, z, ry = 0, len = 12.19) { _m.compose(_p.set(x, y + 1.295, z), _q.setFromEuler(_e.set(0, ry, 0)), _s.set(len, 2.59, 2.44)); this._add('box', M.cont, color); }
  build(parent) {
    for (const e of this.map.values()) {
      const im = new THREE.InstancedMesh(GEO[e.gk], e.mat, e.ms.length);
      e.ms.forEach((m, i) => im.setMatrixAt(i, m));
      if (e.cols.length) e.cols.forEach((c, i) => im.setColorAt(i, _c.set(c)));
      im.castShadow = !e.mat.userData.noCast; im.receiveShadow = true; im.frustumCulled = false;
      parent.add(im);
    }
  }
}
export function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
export const CONT_COLORS = [0xF8FAFC, 0xD1D5DB, 0xD1D5DB, 0x9aa0a8, 0x6b7078, 0x4A4E54, 0x2B2E34, 0xe6e9ed];
export const contColor = (R) => R() < 0.035 ? 0xD14B28 : CONT_COLORS[Math.floor(R() * CONT_COLORS.length)];

/* ---------- turtle path (heading h: direction = (cos h, -sin h) in x,z ; object.rotation.y = h) ---------- */
export class Path {
  constructor(x, z, h) { this.p = [[x, z]]; this.len = [0]; this.x = x; this.z = z; this.h = h; }
  _push(x, z) { const l = this.len[this.len.length - 1] + Math.hypot(x - this.x, z - this.z); this.p.push([x, z]); this.len.push(l); this.x = x; this.z = z; }
  fwd(d) { const n = Math.max(1, Math.ceil(d / 1.5)), sx = this.x, sz = this.z; for (let i = 1; i <= n; i++) this._push(sx + Math.cos(this.h) * d * i / n, sz - Math.sin(this.h) * d * i / n); return this; }
  turn(a, r) {
    const s = Math.sign(a), n = Math.ceil(Math.abs(a) / 0.06), h0 = this.h;
    const cx = this.x - Math.sin(h0) * r * s, cz = this.z - Math.cos(h0) * r * s;
    for (let i = 1; i <= n; i++) { const h = h0 + a * i / n; this._push(cx + Math.sin(h) * r * s, cz + Math.cos(h) * r * s); }
    this.h = h0 + a; return this;
  }
  get L() { return this.len[this.len.length - 1]; }
  pos(d) {
    const L = this.len, P = this.p; d = Math.min(this.L, Math.max(0, d));
    let lo = 0, hi = L.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (L[m] <= d) lo = m; else hi = m; }
    const k = (d - L[lo]) / Math.max(1e-9, L[hi] - L[lo]);
    return { x: P[lo][0] + (P[hi][0] - P[lo][0]) * k, z: P[lo][1] + (P[hi][1] - P[lo][1]) * k };
  }
  at(d, e = 0.8) { const a = this.pos(d - e), b = this.pos(d + e), c = this.pos(d); return { x: c.x, z: c.z, h: Math.atan2(-(b.z - a.z), b.x - a.x) }; }
}
