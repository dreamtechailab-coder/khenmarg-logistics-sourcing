// Static diorama: three land masses (origin terminal, destination port + airport, destination airport + city).
import * as THREE from 'three';
import { M, PI, Batch, rng, contColor, decal, roofSignTex, oceanNormal, bx } from './kit.js';
import { makeGantry, makeStacker, makeAircraft, makePerson, posePerson, makeForklift, makeTruck, makePallet } from './objects.js';

export const LANDS = [[-300, -84, -80, 60], [0, 272, -130, 60], [30, 272, -440, -250]];

export function buildWorld(scene) {
  const b = new Batch(), R = rng(11);
  const SIGN = roofSignTex();

  /* ocean */
  const on = oceanNormal(); on.repeat.set(22, 22);
  M.ocean.normalMap = on; M.ocean.normalScale = new THREE.Vector2(.5, .5);
  const ocean = new THREE.Mesh(new THREE.PlaneGeometry(4200, 4200), M.ocean); ocean.rotation.x = -PI / 2; ocean.position.set(0, -3.5, -150); ocean.receiveShadow = true; scene.add(ocean);

  /* helpers */
  const land = ([x0, x1, z0, z1]) => {
    b.box(M.landEdge, x1 - x0, 7.5, z1 - z0, (x0 + x1) / 2, -8, (z0 + z1) / 2);
    b.box(M.land, x1 - x0 - .6, .5, z1 - z0 - .6, (x0 + x1) / 2, -.5, (z0 + z1) / 2);
  };
  const flat = (mat, x0, x1, z0, z1, y = .03) => b.box(mat, x1 - x0, .04, z1 - z0, (x0 + x1) / 2, y - .04, (z0 + z1) / 2);
  const roadX = (x0, x1, z, w = 7) => { flat(M.asphalt, x0, x1, z - w / 2, z + w / 2, .05); for (let x = x0 + 2; x < x1 - 2; x += 6) b.box(M.line, 2.6, .02, .16, x + 1.3, .05, z); };
  const roadZ = (z0, z1, x, w = 7) => { flat(M.asphalt, x - w / 2, x + w / 2, z0, z1, .05); for (let z = z0 + 2; z < z1 - 2; z += 6) b.box(M.line, .16, .02, 2.6, x, .05, z + 1.3); };
  const tree = (x, z, s = 1) => {
    b.cyl(M.trunk, .22 * s, 2.2 * s, x, 0, z);
    const m = R() < .5 ? M.tree : M.tree2;
    b.sph(m, 1.9 * s, 1.7 * s, 1.9 * s, x, 3.3 * s, z); b.sph(m, 1.3 * s, 1.2 * s, 1.3 * s, x + .7 * s, 4.5 * s, z - .4 * s);
  };
  const pole = (x, z, h = 16) => { b.cyl(M.mid, .22, h, x, 0, z); b.box(M.light, 2.4, .35, .9, x, h, z); };
  const car = (x, z, ry, m) => { b.box(m, 4.2, .75, 1.75, x, .35, z, ry); b.box(M.glass, 2.2, .6, 1.6, x - Math.cos(ry) * .2, 1.1, z + Math.sin(ry) * .2, ry); };
  const lorry = (x, z, ry, cabM, boxM) => {
    const c = Math.cos(ry), s = -Math.sin(ry);
    b.box(cabM, 2.2, 2.6, 2.4, x + c * 5.4, .6, z + s * 5.4, ry); b.box(M.glass, .1, 1.0, 2.2, x + c * 6.52, 2.0, z + s * 6.52, ry);
    b.box(M.slate, 13, .5, 2.2, x, .6, z, ry); if (boxM === 'c') b.cont(contColor(R), x - c * 1, 1.1, z - s * 1, ry); else if (boxM) b.box(boxM, 9.2, 2.7, 2.45, x - c * 1.6, 1.1, z - s * 1.6, ry);
    for (const d of [5, -3, -5]) b.box(M.rubber, 1.0, 1.0, 2.5, x + c * d, 0, z + s * d, ry);
  };
  const warehouse = (x0, x1, z0, z1, h, sign = false) => {
    const w = x1 - x0, d = z1 - z0, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
    b.box(M.light, w, h, d, cx, 0, cz); b.box(M.mid, w + .8, .5, d + .8, cx, h, cz); b.box(M.grey, w - 2, .35, d - 2, cx, h + .5, cz);
    for (let x = x0 + 5; x < x1 - 3; x += 7) b.box(M.white, 1.6, .12, d - 6, x, h + .85, cz);                // skylights
    for (let x = x0 + 6; x < x1 - 5; x += 9) { b.box(M.grey, 4.4, 4.6, .2, x, 0, z1 + .02); b.box(M.slate, 5.2, .25, 2.2, x, 5.1, z1 + 1.1); }
    for (let z = z0 + 7; z < z1 - 5; z += 10) b.box(M.grey, .2, 4.6, 4.4, x1 + .02, 0, z);
    b.box(M.slate, w + .1, .9, d + .1, cx, h - 2.2, cz);                                                    // dark band
    if (sign) {
      const sw = Math.min(w * .62, d * 1.24 * 1.6), s = decal(SIGN, sw, sw / 2, { transparent: false }); s.rotation.x = -PI / 2; s.position.set(cx, h + .9, cz); scene.add(s);
      const f = decal(SIGN, 16, 8, { transparent: false }); f.scale.setScalar(Math.min(1, (h - 3.4) / 8 * 1.6)); f.position.set(cx, h * .5 + .2, z1 + .13); scene.add(f);
    }
  };
  const building = (x0, x1, z0, z1, h, mat = M.light, o = {}) => {
    const w = x1 - x0, d = z1 - z0, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, fl = o.floor || 3.4;
    b.box(mat, w, h, d, cx, 0, cz); b.box(M.mid, w + .5, .45, d + .5, cx, h, cz); b.box(M.grey, w - 1.6, .2, d - 1.6, cx, h + .3, cz);
    for (let y = (o.lobby ? 5.2 : 1.6); y < h - 1.8; y += fl) { b.box(M.glass, w - 1.4, fl * .5, .12, cx, y, z1 + .03); b.box(M.glass, .12, fl * .5, d - 1.4, x1 + .03, y, cz); }
    if (o.lobby) { b.box(M.glass, w - 1.4, 3.4, .12, cx, .5, z1 + .03); b.box(M.glass, .12, 3.4, d - 1.4, x1 + .03, .5, cz); }
    if (h > 10) { b.box(M.mid, 3, 1.4, 3, cx - w * .2, h + .4, cz); b.box(M.light, 2, 1, 4, cx + w * .2, h + .4, cz - d * .15); }
  };
  const block = (xs, z0, rows, maxT, skip = () => false) => {
    for (const x of xs) for (let r = 0; r < rows; r++) { if (skip(r)) continue; const n = 1 + Math.floor(R() * maxT); for (let t = 0; t < n; t++) b.cont(contColor(R), x, t * 2.59, z0 + r * 2.7); }
  };
  const rtg = (x, z0, z1) => {
    for (const dx of [-5, 5]) { for (const z of [z0, z1]) { b.box(M.yellow, .8, 17, .8, x + dx, 1, z); b.box(M.rubber, 1.4, 1.2, 2.6, x + dx, 0, z); } b.box(M.yellow, .9, 1.4, z1 - z0 + 1, x + dx, 17.6, (z0 + z1) / 2); }
    for (const z of [z0, z1]) b.box(M.yellow, 10.8, .9, .8, x, 9, z);
    const tz = z0 + (z1 - z0) * (.3 + R() * .4); b.box(M.slate, 9, 1.2, 4, x, 18.9, tz); b.box(M.yellow, 12.2, .4, 2.4, x, 11.5, tz); b.box(M.dark, .08, 7, .08, x - 3, 11.9, tz); b.box(M.dark, .08, 7, .08, x + 3, 11.9, tz);
  };
  const quay = (x0, x1) => {
    flat(M.concrete, x0, x1, 14, 59.7);
    for (const z of [30, 52]) b.box(M.steel, x1 - x0 - 2, .1, .3, (x0 + x1) / 2, .03, z);
    b.box(M.lineY, x1 - x0 - 2, .02, .5, (x0 + x1) / 2, .04, 58.2);
    for (let x = x0 + 6; x < x1; x += 13) { b.cyl(M.slate, .45, .8, x, 0, 59); b.box(M.dark, 1.6, 2.6, .7, x + 6, -3.2, 60.2); }
    for (const z of [20.2, 27.8]) for (let x = x0 + 3; x < x1 - 3; x += 7) b.box(M.line, 3, .02, .16, x + 1.5, .04, z);
  };
  const runway = (x, z0, z1) => {
    flat(M.asphalt, x - 10, x + 10, z0, z1, .06);
    for (const dx of [-9, 9]) b.box(M.line, .3, .02, z1 - z0 - 4, x + dx, .06, (z0 + z1) / 2);
    for (let z = z0 + 26; z < z1 - 26; z += 14) b.box(M.line, .5, .02, 8, x, .06, z + 4);
    for (const zz of [z0 + 5, z1 - 13]) for (let i = -3; i <= 3; i++) if (i) b.box(M.line, 1.3, .02, 8, x + i * 2.3, .06, zz + 4);
    for (const zz of [z0 + 22, z1 - 28]) for (const dx of [-4, 4]) b.box(M.line, 2.2, .02, 6, x + dx, .06, zz + 3);
  };
  const hangar = (x0, x1, z0, z1) => {
    const w = x1 - x0, d = z1 - z0, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
    b.box(M.light, w, 9, d, cx, 0, cz); b.box(M.mid, w + .6, 1.3, d * .82, cx, 9, cz); b.box(M.mid, w + .6, 1.2, d * .55, cx, 10.3, cz); b.box(M.grey, w + .6, .9, d * .25, cx, 11.5, cz); b.box(M.grey, .25, 7.4, d - 5, x1 + .03, 0, cz);
  };
  const tower = (x, z) => {
    b.cyl(M.light, 2.4, 24, x, 0, z); b.cyl(M.mid, 3.3, 1.2, x, 24, z); b.cyl(M.glass, 4.3, 3, x, 25.2, z); b.cyl(M.light, 4.8, .7, x, 28.2, z); b.cyl(M.mid, 1.2, 1.6, x, 28.9, z); b.cyl(M.mid, .12, 6, x, 30.5, z);
    b.box(M.light, 10, 5, 10, x - 2, 0, z + 2);
  };
  const person = (x, z, h, o, pose, y = 0) => { const p = makePerson(o); p.position.set(x, y, z); p.rotation.y = h; posePerson(p, pose || {}); scene.add(p); return p; };

  LANDS.forEach(land);

  /* ============ LAND A : railway yard + container terminal + origin seaport ============ */
  quay(-298, -86);
  // railway
  for (const z of [-52, -46]) {
    b.box(M.ballast, 215, .2, 3.4, -192, 0, z);
    for (let x = -299; x < -85; x += .8) b.box(M.sleeper, .26, .12, 2.6, x, .2, z);
    for (const dz of [-.72, .72]) b.box(M.steel, 215, .15, .1, -192, .32, z + dz);
  }
  flat(M.concrete, -299, -85, -37.4, -30, .03);
  b.box(M.pave, 130, 1.1, 6.8, -205, 0, -40.9); b.box(M.lineY, 130, .02, .3, -205, 1.1, -37.75); b.box(M.mid, 130, .25, .15, -205, 1.1, -44.2);
  const wagon = (x, z, type) => {
    for (const dx of [-4.6, 4.6]) { b.box(M.dark, 2.6, .7, 2.2, x + dx, .35, z); }
    b.box(M.slate, 14, .3, 2.9, x, 1.0, z);
    if (type === 'flat') { b.cont(contColor(R), x, 1.3, z); return; }
    const body = M.grey;
    if (type === 'open') {
      b.box(body, 5.2, 2.7, .12, x - 4.3, 1.3, z + 1.4); b.box(body, 5.2, 2.7, .12, x + 4.3, 1.3, z + 1.4); b.box(body, 13.8, 2.7, .12, x, 1.3, z - 1.4);
      for (const dx of [-6.85, 6.85]) b.box(body, .12, 2.7, 2.9, x + dx, 1.3, z);
      b.box(body, 3.3, 2.5, .1, x - 3.4, 1.4, z + 1.52);                                               // slid-open door
      b.box(M.card, 2.3, 1.4, 1.9, x - 2.4, 1.3, z - .3); b.box(M.card, 2.3, 1.9, 1.9, x + 2.6, 1.3, z - .3); b.box(M.orange, 2.32, .1, 1.92, x + 2.6, 2.3, z - .3); b.box(M.orange, 2.32, .1, 1.92, x - 2.4, 2.1, z - .3);
    } else {
      b.box(body, 13.8, 2.7, 2.9, x, 1.3, z); b.box(M.slate, 3.2, 2.4, .1, x, 1.4, z + 1.47);
      for (let i = -6; i <= 6; i++) if (Math.abs(i) > 1) b.box(M.slate, .1, 2.6, .06, x + i * 1.05, 1.35, z + 1.47);
    }
    b.box(M.mid, 14.1, .25, 3.1, x, 4.0, z); b.box(M.mid, 13.6, .2, 2.2, x, 4.2, z);
  };
  ['box', 'flat', 'box', 'flat', 'box', 'open', 'box', 'flat'].forEach((t, i) => wagon(-257 + i * 14.6, -46, t));
  // locomotive
  b.box(M.dark, 17, .9, 2.4, -275.5, .35, -46); b.box(M.slate, 18, 2.6, 3.0, -275.5, 1.2, -46); b.box(M.grey, 13, 1.0, 2.6, -277.5, 3.8, -46);
  b.box(M.slate, 4, 1.5, 3.05, -268.6, 3.8, -46); b.box(M.glass, 4.06, .8, 3.1, -268.6, 4.3, -46); b.box(M.terra, 18.05, .35, 3.05, -275.5, 2.2, -46); b.box(M.yellow, .2, 1.0, 3.1, -266.5, 1.2, -46);
  ['flat', 'flat', 'box', 'flat', 'flat', 'box'].forEach((t, i) => wagon(-196 + i * 14.6, -52, t));
  // warehouses
  warehouse(-292, -222, -78, -60, 9, true); warehouse(-212, -150, -78, -60, 8.5);
  building(-140, -108, -77, -58, 13, M.white);
  // terminal surface + lanes
  flat(M.apron, -246, -194, -32, 14, .03);
  for (const [x0, x1, z] of [[-244, -200, -11.4], [-244, -218, -24.6]]) for (let x = x0; x < x1; x += 5) b.box(M.line, 2.4, .02, .16, x, .04, z);
  for (const x of [-241.6, -228.4]) for (let z = -8; z < 14; z += 5) b.box(M.line, .16, .02, 2.4, x, .04, z);
  b.box(M.lineY, 13.4, .02, .2, -208, .04, -24.5); b.box(M.lineY, 13.4, .02, .2, -208, .04, -27.5); b.box(M.lineY, .2, .02, 3.2, -214.7, .04, -26); b.box(M.lineY, .2, .02, 3.2, -201.3, .04, -26);
  b.box(M.lineY, 13.4, .02, .2, -235, .04, 22.5); b.box(M.lineY, 13.4, .02, .2, -235, .04, 25.5);
  // container yards
  block([-285, -272.4, -259.8], -12, 10, 4, r => r === 4 || r === 5); rtg(-272, -15.5, 15.5);
  block([-158, -145.4, -132.8, -120.2, -107.6, -95], -22, 13, 3, r => r === 6); rtg(-114, -25.5, 13.5);
  for (const x of [-281]) { const c = makeGantry(); c.position.x = x; c.set(62, 20); scene.add(c); }
  const st2 = makeStacker(); st2.position.set(140, 0, -8); st2.rotation.y = PI / 2; st2.set(5.4, 6.2); scene.add(st2);
  const fl2 = makeForklift(); fl2.position.set(-156, 0, -34.5); fl2.rotation.y = PI * .5; scene.add(fl2);
  for (const [x, z] of [[-150, -33.4], [-148.5, -33.4]]) { const p = makePallet(false); p.position.set(x, 0, z); scene.add(p); }
  lorry(-262, 24, 0, M.light, 'c'); lorry(-186, 24, 0, M.white, 'c'); lorry(-150, 21, 0, M.orange, 'c'); lorry(-288, -26, PI / 2, M.grey, M.light);
  for (const [x, z] of [[-296, -30], [-296, 10], [-88, -35], [-168, 16], [-230, -56], [-88, 16]]) pole(x, z);
  for (const x of [-297, -286, -275]) tree(x, -70 + (x % 3), .9);
  for (let i = 0; i < 6; i++) tree(-88 - (i % 2) * 0, -66 + i * 5, .85);
  person(-183.2, -42.6, -PI / 2 + .3, { vest: M.vestY, hat: M.white }, { armL: 1.2, armR: .9 }, 1.1);
  person(-171, -41, PI, { vest: M.vestO, hat: M.yellow }, {}, 1.1);

  /* ============ LAND B : destination port + cargo airport ============ */
  quay(2, 212);
  roadX(2, 226, 24, 8); roadZ(-22, 28, 230, 8);
  block([20, 32.6, 45.2, 57.8, 70.4, 83, 95.6, 108.2], -34, 15, 4, r => r === 7 || r === 8); rtg(39, -37.5, 9.5); rtg(89, -37.5, 9.5);
  for (const x of [84, 176]) { const c = makeGantry(); c.position.x = x; c.set(x === 84 ? 70 : 44, 21); scene.add(c); }
  warehouse(8, 62, -124, -96, 10); warehouse(72, 138, -124, -96, 10); warehouse(8, 58, -84, -54, 9); warehouse(68, 138, -86, -52, 11, true);
  roadX(2, 150, -45, 7); roadZ(-128, -48.5, 144, 6);
  lorry(40, -45.8, 0, M.orange, M.white); lorry(96, -90, 0, M.light, 'c'); lorry(20, 24, 0, M.grey, 'c');
  // airport
  flat(M.apron, 186, 240, -78, 40, .03);
  runway(250, -128, 58);
  for (const [x0, z0, x1, z1] of [[215, -18, 250, -64.6]]) for (let i = 0; i <= 14; i++) { const k = i / 14; b.box(M.lineY, .25, .02, 3.2, x0 + (x1 - x0) * k, .05, z0 + (z1 - z0) * k, Math.atan2(x1 - x0, z1 - z0)); }
  for (let z = -16; z < 22; z += 5) b.box(M.lineY, .25, .02, 3, 215, .05, z);
  warehouse(150, 184, -44, 12, 9, true);
  tower(168, -54);
  hangar(150, 200, -126, -92);
  const pl2 = makeAircraft({ plain: true }); pl2.scale.setScalar(.72); pl2.position.set(178, 0, -72); scene.add(pl2);
  for (const [x, z] of [[192, 30], [192, -76], [238, 44], [146, 20]]) pole(x, z, 18);
  for (let i = 0; i < 7; i++) tree(4 + (i % 2) * 5, -40 + i * 8, .9);
  for (let i = 0; i < 5; i++) car(148 + i * 3.2, 18.5, PI / 2, i % 2 ? M.light : M.mid);
  person(225.6, 4.2, PI / 2 + .5, { vest: M.vestY, hat: M.white }, { armR: 2.3 });
  b.box(M.yellow, 3.2, 1.3, 1.7, 197, .3, 20, .3); b.box(M.light, 2.6, 1.1, 1.6, 193, .3, 21.5, .3);

  /* ============ LAND C : destination airport + customer district ============ */
  runway(250, -438, -252);
  flat(M.apron, 190, 240, -432, -345, .03);
  for (let i = 0; i <= 14; i++) { const k = i / 14; b.box(M.lineY, .25, .02, 3.2, 250 - 35 * k, .05, -330 - 46.6 * k, Math.atan2(-35, -46.6)); }
  building(150, 184, -432, -398, 10, M.white, { lobby: true }); tower(196, -426); hangar(204, 238, -438, -420);
  roadX(34, 236, -352, 7); roadZ(-436, -254, 95, 7); roadZ(-348.5, -254, 196, 6);
  flat(M.pave, 34, 186, -359, -355.5, .06); flat(M.pave, 34, 236, -348.5, -346, .06);
  // customer building (hero)
  b.box(M.white, 40, 17, 26, 155, 0, -372); b.box(M.mid, 40.6, .5, 26.6, 155, 17, -372); b.box(M.grey, 36, .25, 22, 155, 17.5, -372);
  for (let y = 5.4; y < 15; y += 3.6) { b.box(M.glass, 37, 2.0, .14, 155, y, -358.95); b.box(M.glass, .14, 2.0, 23, 175.03, y, -372); }
  b.box(M.glass, 37, 3.6, .14, 155, .4, -358.95); b.box(M.glass, .14, 3.6, 23, 175.03, .4, -372);
  b.box(M.terra, 9, .35, 3.4, 154.4, 3.9, -357.5); b.box(M.light, .25, 3.9, .25, 150.4, 0, -358.7); b.box(M.light, .25, 3.9, .25, 158.4, 0, -358.7);   // canopy
  b.box(M.slate, 2.6, 2.9, .18, 154.4, .1, -358.9); b.box(M.light, 5, .14, 2.2, 154.4, .0, -357.7);
  for (const x of [147, 162, 168]) { b.box(M.light, 3.4, .6, 1.5, x, 0, -357.6); b.sph(M.tree2, 1.5, .7, .6, x, .95, -357.6); }
  const cs = decal(SIGN, 6, 3, { transparent: false }); cs.position.set(141.5, 5.9, -358.85); scene.add(cs);
  b.box(M.mid, 3, 1.5, 3, 146, 17.5, -376); b.box(M.light, 5, 1.2, 2.4, 164, 17.5, -368);
  // plaza / park opposite (kept low so the delivery is never hidden)
  flat(M.grass, 100, 192, -345.5, -326, .05); flat(M.pave, 138, 172, -345.5, -326, .06);
  b.cyl(M.light, 4.2, .5, 155, 0, -336); b.cyl(M.ocean, 3.6, .1, 155, .5, -336); b.cyl(M.light, .5, 1.4, 155, .5, -336);
  for (const [x, z] of [[104, -342], [112, -331], [121, -340], [130, -332], [178, -341], [186, -331], [181, -334], [108, -336], [126, -328], [189, -342]]) tree(x, z, .8 + R() * .3);
  for (const x of [142, 168]) for (const z of [-343, -329]) b.box(M.mid, 2.2, .5, .6, x, 0, z);
  // surrounding city
  building(40, 88, -386, -359, 22, M.light); building(102, 128, -386, -359, 15, M.white);
  building(40, 88, -436, -396, 30, M.white); building(102, 144, -436, -398, 36, M.light, { floor: 3.2 });
  building(40, 88, -343, -318, 16, M.white); building(40, 64, -308, -262, 24, M.light); building(70, 88, -308, -262, 12, M.white);
  building(102, 132, -318, -292, 14, M.light); building(140, 190, -318, -296, 12, M.white); building(102, 150, -284, -260, 18, M.white); building(158, 190, -286, -260, 10, M.light);
  flat(M.asphalt, 202, 234, -340, -262, .05); for (let i = 0; i < 9; i++) for (const x of [208, 228]) { b.box(M.line, 5, .02, .14, x, .05, -336 + i * 8.6); if (R() < .6) car(x, -332 + i * 8.6, 0, [M.light, M.mid, M.white, M.slate][Math.floor(R() * 4)]); }
  for (let x = 40; x < 190; x += 12) if (Math.abs(x - 95) > 6 && (x < 134 || x > 178)) tree(x, -357.2, .7);
  for (let x = 104; x < 236; x += 13) tree(x, -347.2, .65);
  for (const [x, z] of [[92, -350], [192, -350], [236, -346], [140, -350]]) pole(x, z, 9);
  person(120, -357, .3, { vest: null, hat: null, hair: true, shirt: M.shirtW, pants: M.khaki }); person(178, -338, 2, { vest: null, hat: null, hair: true, shirt: M.khaki });
  person(150, -340, 1, { vest: null, hat: null, hair: true, shirt: M.shirtW, pants: M.slate }, { walk: 1, amp: 1 });

  /* far-off vessels to give the ocean scale */
  const miniShip = (x, z, ry, s) => { b.box(M.slate, 70 * s, 7 * s, 13 * s, x, -5, z, ry); b.box(M.white, 9 * s, 12 * s, 11 * s, x - Math.cos(ry) * 26 * s, 0, z + Math.sin(ry) * 26 * s, ry); for (let i = -1; i <= 2; i++) b.box([M.light, M.mid, M.grey, M.white][i + 1], 11 * s, 6 * s, 11 * s, x + Math.cos(ry) * i * 12 * s, 2 * s, z - Math.sin(ry) * i * 12 * s, ry); };
  miniShip(-150, 230, .25, 1); miniShip(420, -120, 1.2, .9); miniShip(-120, -260, -.4, 1); miniShip(-330, -230, .1, .8);

  b.build(scene);
}
