// Procedural logistics objects. Convention: local +X = forward, origin on the ground, rotation.y = heading.
import * as THREE from 'three';
import { M, GEO, PI, bx, cy, sp, mesh, grp, wheel, rod, stretch, decal, extrude, Batch, rng, contColor, logoTex, containerSideTex, corrugation, checkTex, wakeTex } from './kit.js';

const LOGO_W = logoTex('#ffffff');
const LOGO_W_SUB = logoTex('#ffffff', 'LOGISTICS');
const LOGO_O = logoTex('#D14B28');

/* ---------------- people ---------------- */
export function makePerson(o = {}) {
  const { vest = M.vestO, shirt = M.shirt, pants = M.navy, hat = M.yellow, hair = false } = o;
  const g = new THREE.Group(), P = {};
  const cap = (r, l) => new THREE.CapsuleGeometry(r, l, 5, 12);
  const leg = (z) => { const p = grp(0, .9, z); const m = mesh(cap(.085, .66), pants); m.position.y = -.42; p.add(m, bx(M.dark, .27, .09, .14, .05, -.9, 0)); g.add(p); return p; };
  P.legL = leg(.1); P.legR = leg(-.1);
  const torso = grp(0, .9, 0); g.add(torso); P.torso = torso;
  const tm = mesh(cap(.15, .36), shirt); tm.scale.set(.82, 1, 1.25); tm.position.y = .36; torso.add(tm);
  if (vest) {
    const v = mesh(cap(.158, .26), vest); v.scale.set(.9, 1, 1.3); v.position.y = .38; torso.add(v);
    torso.add(bx(M.light, .31, .035, .43, 0, .3, 0));                               // reflective band
  }
  const arm = (z) => { const p = grp(0, .62, z); const m = mesh(cap(.055, .46), shirt); m.position.y = -.28; p.add(m, sp(M.skin, .062, .07, .062, 0, -.6, 0)); torso.add(p); return p; };
  P.armL = arm(.27); P.armR = arm(-.27);
  torso.add(cy(M.skin, .05, .1, 0, .7, 0));
  torso.add(sp(M.skin, .12, .135, .12, 0, .86, 0));
  if (hat) {
    const h = mesh(new THREE.SphereGeometry(.145, 18, 10, 0, PI * 2, 0, PI / 2), hat); h.position.y = .88; torso.add(h);
    torso.add(bx(hat, .13, .025, .22, .14, .88, 0));
  } else if (hair) { const h = mesh(new THREE.SphereGeometry(.132, 18, 10, 0, PI * 2, 0, PI / 1.9), M.hair); h.position.y = .875; torso.add(h); }
  g.P = P; return g;
}
export function posePerson(p, { walk = 0, amp = 0, armL = null, armR = null, bend = 0 } = {}) {
  const P = p.P, s = Math.sin(walk) * amp;
  P.legL.rotation.z = s * .62; P.legR.rotation.z = -s * .62;
  P.armL.rotation.z = armL === null ? -s * .5 : armL; P.armR.rotation.z = armR === null ? s * .5 : armR;
  P.torso.rotation.z = -bend;
}

/* ---------------- cargo ---------------- */
function cargoBox(x, y, z, w = .56, h = .45, d = .46) {
  const g = grp(x, y, z, bx(M.card, w, h, d), bx(M.orange, w + .012, .075, d + .012, 0, h * .5 - .037, 0));
  return g;
}
export function makeParcel() {
  const g = cargoBox(0, 0, 0);
  g.add(bx(M.white, .2, .006, .14, -.12, .451, .1));
  const d = decal(LOGO_O, .4, .1); d.position.set(0, .12, .236); g.add(d);
  return g;
}
export function makePallet(top = true) {
  const g = new THREE.Group();
  g.add(bx(M.wood, 1.2, .035, 1.0, 0, .105, 0));
  for (const z of [-.43, 0, .43]) g.add(bx(M.wood, 1.2, .105, .13, 0, 0, z));
  for (let l = 0; l < 2; l++) for (const x of [-.295, .295]) for (const z of [-.245, .245]) g.add(cargoBox(x, .14 + l * .46, z));
  if (top) g.add(makeParcel()), g.children[g.children.length - 1].position.set(0, 1.06, 0);
  return g;
}

/* ---------------- forklift ---------------- */
export function makeForklift() {
  const g = new THREE.Group(), Y = M.yellow;
  g.add(wheel(.33, .24, .78, .5), wheel(.33, .24, .78, -.5), wheel(.27, .22, -.78, .46), wheel(.27, .22, -.78, -.46));
  g.add(bx(Y, 2.0, .5, 1.12, -.05, .22, 0));
  g.add(bx(M.slate, .55, .85, 1.14, -.98, .25, 0));                                  // counterweight
  g.add(bx(Y, .85, .42, 1.0, -.55, .72, 0));                                         // engine hood
  g.add(bx(M.dark, .5, .12, .5, -.25, 1.14, 0), bx(M.dark, .1, .5, .5, -.48, 1.2, 0)); // seat
  g.add(rod(M.dark, .04, .35, .95, 0, .5, 1.25, 0, true)); g.add(cy(M.dark, .16, .04, .5, 1.27, 0, 'x'));
  for (const z of [-.5, .5]) { g.add(rod(M.slate, .07, .5, .7, z, .42, 2.08, z)); g.add(rod(M.slate, .07, -.85, 1.1, z, -.72, 2.08, z)); }
  g.add(bx(M.slate, 1.3, .06, 1.1, -.15, 2.06, 0));
  for (const z of [-.36, .36]) g.add(bx(M.slate, .1, 2.12, .12, 1.0, .08, z));       // mast
  g.add(bx(M.slate, .08, .1, .84, 1.0, 2.1, 0), bx(M.slate, .08, .1, .84, 1.0, 1.1, 0));
  g.add(cy(M.steel, .045, 1.6, .98, 1.0, 0));                                        // lift ram
  const car = grp(1.09, .15, 0);
  car.add(bx(M.dark, .06, .5, .95, 0, 0, 0));
  for (let i = -2; i <= 2; i++) car.add(bx(M.dark, .04, 1.0, .04, 0, 0, i * .22));
  car.add(bx(M.dark, .04, .05, .95, 0, 1.0, 0));
  for (const z of [-.27, .27]) car.add(bx(M.steel, 1.15, .045, .12, .6, 0, z));
  g.add(car); g.carriage = car;
  const d = makePerson({ vest: M.vestY, hat: M.white }); d.position.set(-.3, .42, 0); d.scale.setScalar(.95);
  posePerson(d, { armL: 1.1, armR: 1.1 }); d.P.legL.rotation.z = 1.4; d.P.legR.rotation.z = 1.4; g.add(d);
  g.add(cy(M.vestO, .07, .08, -.6, 2.14, .35));                                      // beacon
  return g;
}

/* ---------------- hero 40ft container ---------------- */
export function makeHeroContainer() {
  const L = 12.19, W = 2.44, H = 2.59, g = new THREE.Group(), O = M.orange, OD = M.terra;
  const sideMat = new THREE.MeshStandardMaterial({ map: containerSideTex(), normalMap: corrugation(34), normalScale: new THREE.Vector2(.7, .7), roughness: .55 });
  const topMat = new THREE.MeshStandardMaterial({ color: 0xE05A2B, normalMap: corrugation(40), normalScale: new THREE.Vector2(.5, .5), roughness: .55 });
  g.add(bx(M.grey, L, .15, W, 0, 0, 0));
  g.add(bx(topMat, L, .07, W, 0, H - .07, 0));
  for (const s of [1, -1]) {
    g.add(bx(O, L, H - .2, .05, 0, .12, s * (W / 2 - .025)));
    const p = new THREE.Mesh(new THREE.PlaneGeometry(L - .28, H - .26), sideMat); p.position.set(0, H / 2, s * (W / 2 + .004)); if (s < 0) p.rotation.y = PI; p.receiveShadow = true; g.add(p);
    g.add(bx(OD, L, .13, .08, 0, 0, s * (W / 2 - .03)), bx(OD, L, .13, .08, 0, H - .13, s * (W / 2 - .03)));
    for (const e of [1, -1]) g.add(bx(OD, .14, H, .14, e * (L / 2 - .07), 0, s * (W / 2 - .07)));
  }
  g.add(bx(O, .05, H - .2, W, -L / 2 + .025, .12, 0));
  g.add(bx(OD, .1, .13, W, L / 2 - .05, H - .13, 0));
  g.doors = [1, -1].map(s => {
    const p = grp(L / 2, 0, s * (W / 2 - .02));
    p.add(bx(O, .06, H - .3, W / 2 - .03, 0, .15, -s * (W / 4)));
    for (const k of [.3, .85]) { p.add(cy(M.steel, .028, H - .36, .05, H / 2, -s * k)); p.add(bx(M.steel, .05, .05, .32, .07, 1.05, -s * k)); }
    for (const yy of [.5, 1.3, 2.1]) p.add(bx(OD, .07, .04, W / 2 - .06, 0, yy, -s * (W / 4)));
    g.add(p); p.userData.s = s; return p;
  });
  const lg = decal(LOGO_W, 1.0, .25); lg.rotation.y = PI / 2; lg.position.set(.035, 1.75, -W / 4); g.doors[0].add(lg);
  // cargo already stowed inside
  const cargo = new THREE.Group();
  for (const z of [-.57, .57]) {
    for (const y of [.16, 1.22]) { const p = makePallet(false); p.position.set(3.35, y, z); cargo.add(p); }
    cargo.add(bx(M.card, 1.18, 2.1, 1.0, 2.1, .16, z), bx(M.card, 7.0, 2.1, 1.0, -2.1, .16, z));
    cargo.add(bx(M.orange, 1.19, .08, 1.01, 2.1, 1.0, z), bx(M.orange, 1.19, .08, 1.01, 2.1, 2.0, z));
  }
  g.add(cargo); g.cargo = cargo;
  g.setDoors = (k) => { g.doors[0].rotation.y = -k * 1.47 * PI; g.doors[1].rotation.y = k * 1.47 * PI; cargo.visible = k > 0.001; };
  return g;
}

/* ---------------- reach stacker ---------------- */
export function makeStacker() {
  const g = new THREE.Group(), Y = M.yellow;
  g.add(bx(Y, 7.4, 1.0, 2.9, 0, .85, 0));
  g.add(bx(M.slate, 7.0, .35, 2.5, 0, .55, 0));
  for (const z of [1.25, 2.0, -1.25, -2.0]) g.add(wheel(.95, .62, 2.7, z));
  for (const z of [1.55, -1.55]) g.add(wheel(.85, .7, -2.6, z));
  g.add(bx(M.yellowD, 1.7, 1.5, 3.0, -3.4, 1.2, 0));                                  // counterweight
  g.add(bx(M.slate, 1.5, .8, 2.6, -1.3, 1.85, 0));                                    // engine cover
  g.add(bx(M.glass, 1.7, 1.45, 1.5, .55, 1.85, 0), bx(Y, 1.9, .14, 1.7, .55, 3.3, 0)); // cab
  for (const x of [-.3, 1.4]) for (const z of [-.78, .78]) g.add(bx(Y, .1, 1.5, .1, x, 1.85, z));
  for (const z of [-1.05, 1.05]) g.add(bx(Y, .7, 2.6, .35, -2.7, 1.85, z));            // boom towers
  g.add(cy(M.vestO, .1, .12, -1.2, 2.72, .9));
  const PV = { x: -2.7, y: 4.25 };
  const boom = grp(PV.x, PV.y, 0);
  boom.add(bx(Y, 7.2, .8, .85, 3.4, -.4, 0));
  const inner = bx(M.yellowD, 7.0, .56, .6, 0, -.28, 0); boom.add(inner);
  g.add(boom);
  const rams = [-.62, .62].map(z => { const o = rod(M.steel, .16, 0, 0, z, 0, 1, z, true), b = rod(M.slate, .24, 0, 0, z, 0, 1, z, true); g.add(o, b); return { o, b, z }; });
  const head = new THREE.Group();
  head.add(bx(M.slate, .9, 1.0, 1.2, 0, .42, 0));                                       // rotator
  head.add(bx(Y, .55, .42, 12.1, 0, 0, 0));
  for (const z of [-6.0, 6.0]) head.add(bx(Y, 2.4, .36, .3, 0, 0, z));
  for (const z of [-5.9, 5.9]) for (const x of [-1.12, 1.12]) head.add(bx(M.slate, .2, .16, .2, x, -.1, z));
  g.add(head);
  g.set = (rx, sy) => {                                                                // rx: reach, sy: spreader underside height
    const tx = rx, ty = sy + 1.42, dx = tx - PV.x, dy = ty - PV.y, Lb = Math.hypot(dx, dy), a = Math.atan2(dy, dx);
    boom.rotation.z = a; inner.position.x = Lb - 3.5;
    head.position.set(rx, sy, 0);
    for (const r of rams) {
      const bxp = PV.x + Math.cos(a) * 4.2 + Math.sin(a) * .7, byp = PV.y + Math.sin(a) * 4.2 - Math.cos(a) * .7;
      const mx = (1.2 + bxp) / 2, my = (1.9 + byp) / 2;
      stretch(r.b, 1.2, 1.9, r.z, mx, my, r.z); stretch(r.o, mx, my, r.z, bxp, byp, r.z);
    }
  };
  g.set(5.2, 7); return g;
}

/* ---------------- ship-to-shore gantry crane (group at x=cx; z in world units) ---------------- */
export function makeGantry() {
  const g = new THREE.Group(), Y = M.yellow;
  for (const x of [-9, 9]) {
    for (const z of [30, 52]) { g.add(bx(Y, 1.3, 30.5, 1.3, x, .9, z)); g.add(bx(M.slate, 3.4, .9, 1.7, x, 0, z)); }
    g.add(bx(Y, 1.05, 1.3, 22, x, 13, 41), bx(Y, 1.05, 1.5, 22, x, 29.9, 41));
    g.add(rod(Y, .7, x, 14, 30.4, x, 29.6, 51.6), rod(Y, .55, x, 14, 51.6, x, 22, 41));
    g.add(bx(Y, .8, 1.0, 23, x, 6.2, 41));
  }
  for (const z of [30, 52]) g.add(bx(Y, 19.3, 1.3, 1.1, 0, 13, z), bx(Y, 19.3, 1.5, 1.2, 0, 29.9, z));
  for (const x of [-2.7, 2.7]) g.add(bx(Y, .95, 1.9, 82, x, 31.3, 51));               // boom girders z 10..92
  for (const z of [10.5, 20, 60, 70, 80, 91.5]) g.add(bx(Y, 6.3, .7, .7, 0, 32.3, z));
  for (const x of [-2.7, 2.7]) {                                                       // A-frame + stays
    g.add(rod(Y, .75, x, 33, 52, 0, 45.5, 47), rod(Y, .6, x, 33, 30, 0, 45.5, 47));
    g.add(rod(M.slate, .28, 0, 45.5, 47, x, 33.2, 89, true), rod(M.slate, .28, 0, 45.5, 47, x, 33.2, 68, true), rod(M.slate, .28, 0, 45.5, 47, x, 33.2, 12, true));
  }
  g.add(bx(M.light, 7.2, 4.6, 11, 0, 33.2, 37), bx(M.slate, 7.4, .3, 11.2, 0, 37.8, 37));  // machinery house
  g.add(bx(M.glass, 7.24, 1.0, 3, 0, 35.4, 40));
  g.add(cy(M.vestO, .2, .3, 0, 46, 47));
  const trolley = grp(0, 0, 24);
  trolley.add(bx(M.slate, 6.6, 1.0, 4.4, 0, 30.3, 0), bx(M.light, 2.2, 2.3, 2.6, 4.3, 27.9, 0), bx(M.glass, 2.24, 1.1, 2.64, 4.3, 28.3, 0));
  g.add(trolley);
  const spreader = new THREE.Group();
  spreader.add(bx(Y, 12.15, .4, .7, 0, 0, 0), bx(M.slate, 3.2, .9, 2.0, 0, .4, 0));
  for (const x of [-6.0, 6.0]) spreader.add(bx(Y, .32, .36, 2.4, x, 0, 0));
  for (const x of [-3, 3]) spreader.add(bx(Y, .3, .3, 2.2, x, 0, 0));
  g.add(spreader);
  const cables = []; for (const x of [-1.4, 1.4]) for (const z of [-.85, .85]) { const c = bx(M.dark, .07, 1, .07, x, 0, z); g.add(c); cables.push(c); }
  g.set = (tz, sy) => {
    trolley.position.z = tz; spreader.position.set(0, sy, tz);
    const y0 = sy + 1.3, len = 30.3 - y0;
    cables.forEach((c, i) => { c.scale.y = len; c.position.set(i < 2 ? -1.4 : 1.4, y0 + len / 2, tz + (i % 2 ? .85 : -.85)); });
  };
  g.set(24, 17); return g;
}

/* ---------------- container vessel ---------------- */
export function makeShip() {
  const g = new THREE.Group();
  const hullShape = (s = 1) => {
    const sh = new THREE.Shape(), b = 11.5 * s;
    sh.moveTo(-65 * s, -8 * s); sh.quadraticCurveTo(-65 * s, -b, -59 * s, -b); sh.lineTo(36 * s, -b);
    sh.quadraticCurveTo(55 * s, -b, 66 * s, 0); sh.quadraticCurveTo(55 * s, b, 36 * s, b); sh.lineTo(-59 * s, b);
    sh.quadraticCurveTo(-65 * s, b, -65 * s, 8 * s); sh.closePath(); return sh;
  };
  const ext = (shape, y0, y1) => { const geo = new THREE.ExtrudeGeometry(shape, { depth: y1 - y0, bevelEnabled: false, curveSegments: 24 }); geo.rotateX(-PI / 2); geo.translate(0, y0, 0); return geo; };
  g.add(mesh(ext(hullShape(), -6, 4.5), M.slate));
  g.add(mesh(ext(hullShape(1.004), -4.2, -2.3), M.terra));                              // boot-top stripe
  g.add(mesh(ext(hullShape(1.006), 3.7, 3.95), M.light));
  g.add(mesh(ext(hullShape(.965), 4.5, 4.62), M.grey));                                 // deck
  const fc = new THREE.Shape(); fc.moveTo(40, -11.2); fc.quadraticCurveTo(56, -11, 66, 0); fc.quadraticCurveTo(56, 11, 40, 11.2); fc.closePath();
  g.add(mesh(ext(fc, 4.5, 6.6), M.slate));
  const fd = new THREE.Shape(); fd.moveTo(41, -10.4); fd.quadraticCurveTo(55, -10, 64, 0); fd.quadraticCurveTo(55, 10, 41, 10.4); fd.closePath();
  g.add(mesh(ext(fd, 6.6, 6.7), M.grey));
  g.add(cy(M.light, .25, 7, 52, 10, 0), bx(M.light, .3, .3, 5, 52, 12, 0), cy(M.yellow, .5, .8, 47, 7.1, 4), cy(M.yellow, .5, .8, 47, 7.1, -4));
  for (const s of [1, -1]) { const d = decal(LOGO_W, 30, 7.5); d.position.set(-6, .9, s * 11.56); if (s < 0) d.rotation.y = PI; g.add(d); }
  // superstructure
  g.add(bx(M.white, 13, 3.1, 20.5, -52, 4.6, 0), bx(M.white, 11.5, 3, 18, -52.4, 7.7, 0), bx(M.white, 10.5, 3, 16, -52.8, 10.7, 0), bx(M.white, 10, 3, 14.5, -53, 13.7, 0));
  g.add(bx(M.white, 8.5, 3.2, 22.6, -52.2, 16.7, 0), bx(M.glass, 8.6, 1.3, 22.7, -52.2, 18.0, 0), bx(M.light, 9, .3, 23, -52.2, 19.9, 0));
  for (const y of [5.9, 8.9, 11.9, 14.9]) g.add(bx(M.glass, .2, 1.0, 12, -46.2 - (y - 5.9) * .09, y, 0));
  g.add(bx(M.orange, 4.4, 6.5, 5.5, -59.5, 13.7, 0), bx(M.white, 4.45, 1.2, 5.55, -59.5, 17.4, 0), bx(M.slate, 3.6, .9, 4.6, -59.5, 20.2, 0));
  g.add(cy(M.light, .22, 6, -51, 23, 0), bx(M.light, .25, .25, 7, -51, 24.5, 0), cy(M.white, 1.0, 1.3, -54.5, 20.8, 4), bx(M.orange, 5.5, 2.2, 2.3, -62, 4.6, 9), bx(M.orange, 5.5, 2.2, 2.3, -62, 4.6, -9));
  // deck cargo
  const b = new Batch(), R = rng(42);
  for (let k = 0; k < 8; k++) for (let r = 0; r < 7; r++) {
    const x = -37.8 + 12.6 * k, z = -7.8 + 2.6 * r;
    let n = 3 + (R() < .45 ? 1 : 0) - (R() < .2 ? 1 : 0);
    if (r === 6) n = Math.min(n, 3);
    if (k === 3) n = r === 6 ? 2 : 3;
    if ((k === 2 || k === 4) && r >= 5) n = 3;
    for (let t = 0; t < n; t++) { let c = contColor(R); if (c === 0xD14B28) c = 0x9aa0a8; b.cont(c, x, 4.7 + t * 2.59, z); }
  }
  for (let k = 0; k < 8; k++) b.box(M.grey, 12.3, .12, 19.5, -37.8 + 12.6 * k, 4.6, 0);
  b.build(g);
  // wake
  const wk = new THREE.Mesh(new THREE.PlaneGeometry(52, 25), new THREE.MeshBasicMaterial({ map: wakeTex(), transparent: true, opacity: 0, depthWrite: false }));
  wk.rotation.x = -PI / 2; wk.position.set(-90, -3.42, 0); g.add(wk); g.wake = wk;
  
  g.SLOT = { x: 0, y: 4.7 + 2 * 2.59, z: 7.8 };
  return g;
}

/* ---------------- road vehicles ---------------- */
export function makeTruck() {     // returns {cab, trailer}; trailer origin = container centre, bed top y=1.45
  const cab = new THREE.Group();
  cab.add(mesh(extrude([[-1.15, .95], [-1.15, 3.35], [.55, 3.35], [1.08, 2.3], [1.15, .95]], 2.36, .07), M.orange));
  const ws = bx(M.glass, .05, 1.15, 2.2, 0, 0, 0); ws.position.set(.86, 2.86, 0); ws.rotation.z = Math.atan2(.53, 1.05); cab.add(ws);
  cab.add(bx(M.glass, .9, .75, 2.54, .0, 2.35, 0), bx(M.dark, .12, .55, 2.5, 1.2, .55, 0), bx(M.white, .06, .18, .4, 1.25, 1.2, .85), bx(M.white, .06, .18, .4, 1.25, 1.2, -.85));
  cab.add(bx(M.orange, 1.6, .5, 2.3, -.3, 3.35, 0));                                    // roof fairing
  cab.add(bx(M.slate, 6.4, .34, 1.05, -2.3, .68, 0), bx(M.dark, 1.0, .12, 1.1, -3.9, 1.02, 0));
  for (const z of [1.05, -1.05]) { cab.add(wheel(.52, .34, .25, z)); for (const x of [-3.3, -4.5]) cab.add(wheel(.52, .5, x, z * .93)); }
  for (const s of [1, -1]) { const d = decal(LOGO_W, 1.5, .375); d.position.set(-.3, 1.55, s * 1.26); if (s < 0) d.rotation.y = PI; cab.add(d); }
  const tr = new THREE.Group();
  tr.add(bx(M.slate, 12.6, .3, 1.1, 0, 1.12, 0));
  for (const x of [-6.1, -2, 2, 6.1]) tr.add(bx(M.slate, .25, .14, 2.44, x, 1.31, 0));
  for (const z of [1.0, -1.0]) for (const x of [-3.4, -4.7, -6.0]) tr.add(wheel(.5, .5, x, z));
  tr.add(bx(M.dark, .15, .9, .15, 2.6, .2, .6), bx(M.dark, .15, .9, .15, 2.6, .2, -.6), bx(M.terra, .1, .25, 2.4, -6.3, .85, 0));
  return { cab, trailer: tr };
}
export function makeVan() {
  const g = new THREE.Group();
  g.add(mesh(extrude([[-2.8, .5], [-2.8, 2.5], [1.15, 2.5], [2.2, 1.5], [2.78, 1.3], [2.8, .5]], 2.0, .07), M.orange));
  const ws = bx(M.glass, .05, 1.38, 1.86, 0, 0, 0); ws.position.set(1.71, 2.03, 0); ws.rotation.z = Math.atan2(1.05, 1.0); g.add(ws);
  g.add(bx(M.glass, .95, .62, 2.17, .95, 1.62, 0));
  g.add(bx(M.dark, .16, .32, 2.1, 2.84, .42, 0), bx(M.dark, .12, .3, 2.1, -2.86, .42, 0));
  for (const z of [.72, -.72]) g.add(bx(M.white, .06, .16, .38, 2.87, 1.02, z), bx(M.terra, .05, .3, .14, -2.885, 1.5, z * 1.25));
  for (const z of [1.0, -1.0]) for (const x of [1.75, -1.7]) g.add(wheel(.4, .28, x, z * .93));
  for (const s of [1, -1]) {
    const d = decal(LOGO_W_SUB, 2.9, .725); d.position.set(-1.05, 1.62, s * 1.075); if (s < 0) d.rotation.y = PI; g.add(d);
    g.add(bx(M.white, 3.4, .07, .02, -1.0, .92, s * 1.07));
  }
  g.add(bx(M.void, .03, 1.75, 1.8, -2.875, .62, 0));
  g.doors = [1, -1].map(s => {
    const p = grp(-2.9, .6, s * .96);
    p.add(bx(M.orange, .05, 1.82, .93, 0, 0, -s * .475), bx(M.glass, .06, .5, .6, 0, 1.15, -s * .47));
    g.add(p); p.userData.s = s; return p;
  });
  const rl = decal(LOGO_W, .8, .2); rl.rotation.y = -PI / 2; rl.position.set(-.035, .55, -.47); g.doors[0].add(rl);
  g.setDoors = (k) => { g.doors[0].rotation.y = k * 1.9; g.doors[1].rotation.y = -k * 1.9; };
  g.side = bx(M.terra, .9, 1.7, .05, 1.0, .62, -1.09); g.side.visible = false; g.add(g.side);   // opened cab door (kerb side)
  return g;
}

/* ---------------- airport high-loader ---------------- */
export function makeLoader() {
  const g = new THREE.Group();
  g.add(bx(M.slate, 6.4, .5, 3.0, 0, .3, 0));
  for (const z of [1.3, -1.3]) for (const x of [-2.4, 0, 2.4]) g.add(wheel(.34, .3, x, z));
  g.add(bx(M.yellow, 1.1, 1.0, .9, -2.5, .8, 1.85), bx(M.glass, 1.12, .45, .92, -2.5, 1.3, 1.85));
  const plat = new THREE.Group();
  plat.add(bx(M.light, 6.3, .16, 3.2, 0, -.16, 0));
  for (const z of [1.56, -1.56]) plat.add(bx(M.yellow, 6.3, .42, .08, 0, 0, z));
  for (let i = -5; i <= 5; i++) plat.add(bx(M.steel, .08, .02, 2.9, i * .55, 0, 0));
  g.add(plat);
  const arms = []; for (const z of [1.15, -1.15]) for (const d of [1, -1]) { const a = rod(M.yellow, .2, 0, 0, z, 0, 1, z); g.add(a); arms.push({ a, z, d }); }
  g.set = (h) => { plat.position.y = h; for (const { a, z, d } of arms) stretch(a, -2.6 * d, .82, z, 2.6 * d, h - .2, z); };
  g.set(1.0); return g;
}

/* ---------------- cargo aircraft (length 44, span 40) ---------------- */
export function makeAircraft(o = {}) {
  const plain = !!o.plain, g = new THREE.Group(), CY = 4.0, W = M.white;
  g.rotation.order = 'YZX';
  const prof = [[0, 22], [.55, 21.7], [1.3, 20.7], [2.05, 18.9], [2.48, 16.6], [2.6, 14], [2.6, -7], [2.35, -12], [1.75, -17], [1.0, -20.6], [.4, -22], [0, -22]];
  const fus = new THREE.LatheGeometry(prof.slice().reverse().map(p => new THREE.Vector2(p[0], p[1])), 48); fus.rotateZ(-PI / 2);
  const pa = fus.attributes.position;
  for (let i = 0; i < pa.count; i++) { const x = pa.getX(i); if (x < -7) pa.setY(i, pa.getY(i) + Math.pow((-7 - x) / 15, 2) * 1.55); if (x > 16) pa.setY(i, pa.getY(i) - Math.pow((x - 16) / 6, 2) * .5); }
  fus.computeVertexNormals();
  const body = mesh(fus, W); body.position.y = CY; g.add(body);
  g.add(sp(M.glass, 1.25, .62, 1.5, 19.25, CY + .62, 0));                             // cockpit glazing
  g.add(bx(M.light, 12, 1.1, 4.6, -1, CY - 3.05, 0));                                  // belly fairing
  const wingGeo = extrude([[5.2, 2], [-4.2, 2], [-9.6, 20], [-7.0, 20]], .55, .05); wingGeo.rotateX(PI / 2);
  const stabGeo = extrude([[-15.8, .8], [-20.4, .8], [-22.6, 7.2], [-20.9, 7.2]], .3, .04); stabGeo.rotateX(PI / 2);
  for (const s of [1, -1]) {
    const wg = grp(0, CY - 1.55, 0, mesh(wingGeo, W)); wg.scale.z = s; wg.rotation.x = -s * .085; g.add(wg);
    const wl = bx(plain ? M.light : M.orange, 1.6, 1.5, .18, -8.6, 0, 19.95); wl.rotation.z = -.35; wg.add(wl);   // winglet
    const sg = grp(0, CY + 1.45, 0, mesh(stabGeo, W)); sg.scale.z = s; sg.rotation.x = -s * .1; g.add(sg);
    const e = grp(2.2, CY - 2.55, s * 7.2);
    const nac = mesh(new THREE.CylinderGeometry(1.3, 1.05, 4.4, 28), M.light); nac.rotation.z = -PI / 2; e.add(nac);
    e.add(cy(plain ? M.mid : M.orange, 1.33, .7, 1.75, 0, 0, 'x'), cy(M.dark, 1.12, .1, 2.18, 0, 0, 'x'), cy(M.steel, .35, .5, 2.2, 0, 0, 'x'), cy(M.dark, .8, .3, -2.25, 0, 0, 'x'));
    e.add(bx(W, 2.6, 1.0, .3, -1.0, .7, 0));
    g.add(e);
  }
  const fin = mesh(extrude([[-13.6, CY + 2.0], [-21.2, CY + 2.4], [-23.6, CY + 9.6], [-20.7, CY + 9.6]], .42, .05), plain ? M.light : M.orange); g.add(fin);
  if (!plain) {
    for (const s of [1, -1]) {
      const d = decal(LOGO_W, 5.2, 1.3); d.position.set(-19.6, CY + 5.4, s * .27); if (s < 0) d.rotation.y = PI; g.add(d);
      const phi = .36, t = decal(LOGO_O, 11, 2.75); t.position.set(8.5, CY + Math.sin(phi) * 2.61, s * Math.cos(phi) * 2.615); t.rotation.set(-s * phi, s < 0 ? PI : 0, 0, 'YXZ'); g.add(t);
      const st = bx(M.orange, 30, .34, .03, -1, CY - .55, s * 2.585); g.add(st);
    }
  }
  // landing gear
  const gear = new THREE.Group();
  gear.add(cy(M.steel, .16, 2.2, 15.5, 1.5, 0), wheel(.45, .26, 15.5, .3), wheel(.45, .26, 15.5, -.3));
  for (const s of [1, -1]) { gear.add(cy(M.steel, .2, 2.4, -2.2, 1.7, s * 3.3)); for (const x of [-1.6, -2.8]) for (const z of [-.38, .38]) gear.add(wheel(.56, .36, x, s * 3.3 + z)); }
  g.add(gear); g.gear = gear;
  // cargo door (right side, aft of wing)
  const hole = bx(M.void, 2.9, 2.3, .4, -9, CY - .95, 2.28); g.add(hole);
  const dp = grp(-9, CY + 1.38, 2.36); const leaf = bx(W, 2.9, 2.3, .07, 0, -2.3, .12); leaf.rotation.x = -.08; dp.add(leaf); g.add(dp);
  g.setDoor = (k) => { const on = k > .01; hole.visible = on; dp.visible = on; dp.rotation.x = -k * 1.75; };
  g.setGear = (k) => { gear.visible = k > .02; gear.scale.y = Math.max(.02, k); gear.position.y = (1 - k) * 2.2; };
  g.setDoor(0); return g;
}

/* ---------------- misc ---------------- */
export function makeCheck() {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: checkTex(), transparent: true, depthTest: false, depthWrite: false, opacity: 0 }));
  s.renderOrder = 10; return s;
}
