// Master timeline: every object + the camera is a pure function of t (0..30 s) -> frame-exact, loop-safe rendering.
import { Path, PI } from './kit.js';
import { posePerson } from './objects.js';

export const DURATION = 30;
const cl = x => x < 0 ? 0 : x > 1 ? 1 : x, P = (t, a, b) => cl((t - a) / (b - a)), E = x => x * x * (3 - 2 * x), S = (t, a, b) => E(P(t, a, b));
const mix = (a, b, k) => a + (b - a) * k;
// hidden resets (each happens while that zone is far off-screen)
const RA = 25.2;   // origin terminal, ship, cranes, truck, port side of airport B
const RP = 28.3;   // aircraft + destination apron
const RC = 10.0;   // customer district keeps its final pose across the loop point, resets here

/* ---- routes ---- */
const SP = new Path(-208, -10, PI / 2).turn(PI / 2, 8).fwd(11).turn(PI / 2, 8).fwd(27.5);                         // reach stacker
const TP = new Path(110, 24, 0).fwd(112).turn(PI / 2, 8).fwd(40);                                                    // port -> airport truck
const AP = new Path(215, -8, PI / 2).fwd(10).turn(-PI / 4, 14).fwd(37.9).turn(PI / 4, 14).fwd(265.4).turn(PI / 4, 14).fwd(37.9).turn(-PI / 4, 14).fwd(7.4); // aircraft
const VP = new Path(227.6, -375, 0).fwd(1.7).turn(-PI / 2, 5).fwd(10.8).turn(-PI / 2, 6).fwd(67.8);                  // delivery van
const AD1 = 105.3, AD2 = 290.3;

/* ---- stage 1-2 : forklift ---- */
function forklift(t) {
  if (t >= RA || t < 1.2) return { x: -180, z: -27, h: PI / 2, lift: .15 };
  let x = -180, z = -27, h = PI / 2, lift = .15;
  if (t < 4.2) {
    z = mix(-27, -36.42, S(t, 1.2, 2.3)); lift = mix(.15, 1.1, S(t, 1.3, 2.2)); lift = mix(lift, 1.5, S(t, 2.3, 2.8));
    z = mix(z, -29, S(t, 2.8, 3.5)); lift = mix(lift, .35, S(t, 2.9, 3.6));
    const k = S(t, 3.4, 4.2); h = PI / 2 + k * PI / 2; z = mix(z, -26, k); x = mix(-180, -181, k);
  } else {
    h = PI; z = -26;
    x = mix(-181, -199.5, S(t, 4.2, 5.3)); x = mix(x, -201.67, S(t, 5.4, 5.9));
    lift = mix(.35, .6, S(t, 4.9, 5.35)); lift = mix(lift, .17, S(t, 5.9, 6.2));
    x = mix(x, -193, S(t, 6.3, 7.0)); lift = mix(lift, .15, S(t, 6.4, 7));
  }
  return { x, z, h, lift };
}
/* ---- stage 3 : reach stacker ---- */
function stacker(t) {
  let x = -208, z = -6, h = PI / 2, rx = 5.2, sy = 7;
  if (t >= RA || t < 7.7) return { x, z, h, rx, sy };
  if (t < 9.9) {
    z = mix(-6, -19.5, S(t, 7.7, 8.6)); const k = S(t, 8.2, 9.0); rx = mix(5.2, 6.5, k); sy = mix(7, 2.6, k);
    sy = mix(sy, 5.8, S(t, 9.0, 9.5)); z = mix(z, -10, S(t, 9.4, 9.9));
  } else if (t < 11.9 && t >= 9.9) {
    const q = SP.at(SP.L * E(P(t, 9.9, 11.5))); x = q.x; z = q.z; h = q.h; rx = 6.5; sy = mix(5.8, 2.6, S(t, 11.5, 11.9));
  } else { x = -235; h = -PI / 2; z = mix(17.5, 4, S(t, 12.0, 12.9)); const k = S(t, 11.9, 12.3); rx = mix(6.5, 5.2, k); sy = mix(2.6, 7, k); }
  return { x, z, h, rx, sy };
}
/* ---- stage 4-5 : cranes + vessel ---- */
function craneA(t) {
  let tz = 24, sy = 17;
  sy = mix(sy, 2.6, S(t, 12.2, 12.9)); sy = mix(sy, 17.1, S(t, 12.9, 13.5)); tz = mix(tz, 81.8, S(t, 13.45, 14.3));
  sy = mix(sy, 12.48, S(t, 14.3, 14.9)); sy = mix(sy, 20, S(t, 14.9, 15.3)); tz = mix(tz, 24, S(t, 15.6, 17)); sy = mix(sy, 17, S(t, 16, 17));
  return { tz, sy };
}
function craneB(t) {
  let tz = 81.8, sy = 22; if (t >= RA) return { tz, sy };
  sy = mix(sy, 12.48, S(t, 17.3, 17.85)); sy = mix(sy, 17.1, S(t, 17.85, 18.3)); tz = mix(tz, 24, S(t, 18.3, 18.95));
  sy = mix(sy, 4.05, S(t, 18.95, 19.3)); sy = mix(sy, 17, S(t, 19.3, 19.8));
  return { tz, sy };
}
const shipRaw = p => ({ x: -235 + 365 * p, z: 74 + 26 * Math.sin(PI * p) ** 2 });
function ship(t) {
  const u = t >= RA ? 0 : P(t, 15.1, 17.5), p = E(u), a = shipRaw(p), b = shipRaw(Math.min(1, p + .003)), c = shipRaw(Math.max(0, p - .003));
  return { x: a.x, z: a.z, h: Math.atan2(-(b.z - c.z), b.x - c.x), y: .1 * Math.sin(2 * PI * t / 5), roll: .006 * Math.sin(2 * PI * t / 6 + 1), wake: t >= RA ? 0 : Math.min(1, 5 * u * (1 - u)) };
}
function truck(t) {
  const s = (t >= RA || t < 19.35) ? 20 : mix(20, 130.57, E(P(t, 19.35, 20.5)));
  const c = TP.pos(s), a = TP.pos(s - 5), b = TP.pos(s + 4.6), cab = TP.at(s + 8.5);
  return { x: c.x, z: c.z, h: Math.atan2(-(b.z - a.z), b.x - a.x), cab };
}
/* ---- the shipment's container ---- */
function container(t) {
  if (t < 9.0 || t >= RA) return { x: -208, y: 0, z: -26, r: 0 };
  if (t < 11.9) { const s = stacker(t); return { x: s.x + Math.cos(s.h) * s.rx, z: s.z - Math.sin(s.h) * s.rx, y: s.sy - 2.6, r: s.h - PI / 2 }; }
  if (t < 12.9) return { x: -235, y: 0, z: 24, r: -PI };
  if (t < 14.9) { const c = craneA(t); return { x: -235, y: c.sy - 2.6, z: c.tz, r: -PI }; }
  if (t < 17.85) { const s = ship(t); return { x: s.x + 7.8 * Math.sin(s.h), z: s.z + 7.8 * Math.cos(s.h), y: 9.88 + s.y, r: s.h - PI }; }
  if (t < 19.3) { const c = craneB(t); return { x: 130, y: c.sy - 2.6, z: c.tz, r: -PI }; }
  const k = truck(t); return { x: k.x, z: k.z, y: 1.45, r: k.h - PI };
}
/* ---- stage 6-7 : air freight ---- */
function plane(t) {
  const d = (t >= RP || t < 21.9) ? 0 : AP.L * E(P(t, 21.9, 25.7));
  const q = AP.at(d, 2), n = (d - AD1) / (AD2 - AD1);
  const altF = nn => (nn > 0 && nn < 1) ? 32 * Math.pow(Math.sin(PI * nn), 1.6) : 0;
  const alt = altF(n), sl = (altF(n + .01) - altF(n - .01)) / (.02 * (AD2 - AD1));
  let pitch = Math.atan(sl) * (sl > 0 ? 1.0 : .4) + .075 * S(n, .74, .95) * (1 - S(n, 1.0, 1.07));
  const gear = 1 - S(n, .1, .28) + S(n, .58, .8);
  const door = t < 21.5 ? 1 : t < 21.9 ? 1 - S(t, 21.5, 21.9) : t < 25.7 ? 0 : t < RP ? S(t, 25.7, 26.0) : 1;
  return { x: q.x, z: q.z, h: q.h, alt, pitch, gear, door };
}
function loaderB(t) { if (t >= RA) return { x: 221, hgt: 1 }; return { x: mix(221, 224.5, S(t, 21.7, 22.1)), hgt: 1 + 2.1 * (S(t, 20.45, 21.0) - S(t, 21.55, 21.95)) }; }
function loaderC(t) { if (t < 25.5 || t >= RP) return { x: 227.5, hgt: 1 }; return { x: mix(227.5, 221, S(t, 25.55, 25.95)), hgt: 1 + 2.1 * (S(t, 25.85, 26.12) - S(t, 26.45, 26.75)) }; }
/* ---- stage 7-8 : last mile ---- */
function van(t) {
  const tt = t < RC ? t + 30 : t;
  if (tt < 27.3) return { x: mix(234, 227.6, S(tt, 26.2, 26.65)), z: -375, h: 0, doors: S(tt, 26.6, 26.85) * (1 - S(tt, 27.12, 27.32)) };
  const q = VP.at(VP.L * E(P(tt, 27.3, 27.98))); return { x: q.x, z: q.z, h: q.h, doors: 0 };
}
function walk(t, t0, t1, a, b) {
  const k = S(t, t0, t1), L = Math.hypot(b[0] - a[0], b[1] - a[1]);
  return { x: mix(a[0], b[0], k), z: mix(a[1], b[1], k), amp: (t > t0 && t < t1) ? Math.sin(PI * P(t, t0, t1)) : 0, ph: k * L * 4.2, h: Math.atan2(-(b[1] - a[1]), b[0] - a[0]) };
}
const place = (o, x, y, z, h) => { o.position.set(x, y, z); o.rotation.y = h; };

/* ---- camera : monotone cubic through keyframes [t, x, z, H, y] ---- */
function buildCamera(ov) {
  const K = [];
  const k = (t, x, z, H, y = 0) => K.push([t, x, y, z, Math.log(H)]);
  k(0, ov.x, ov.z, ov.H);
  k(1.25, -181.3, -35.9, 18, 1); k(3.4, -182.3, -33.2, 19, 1); k(5.2, -197.2, -28, 19.5, 1); k(7.3, -203.2, -26, 25, 1); k(8.8, -207, -21, 42, 2); k(9.7, -206, -17, 46, 3);
  for (const t of [10.2, 10.5, 10.8, 11.1, 11.4, 11.7]) { const c = container(t); k(t, c.x, c.z - 2, 52, 3); }
  k(12.6, -235, 28, 66, 5); k(13.4, -235, 42, 80, 11); k(14.6, -235, 64, 86, 9);
  for (let t = 15.5; t < 17.45; t += .25) { const s = ship(t); k(t, s.x + 4, s.z - 18, 98 + 46 * Math.sin(PI * P(t, 15.1, 17.5)), 5); }
  k(18.0, 130, 60, 86, 9); k(18.8, 130, 38, 76, 8); k(19.35, 132, 25, 58, 3);
  for (const t of [19.6, 19.8, 20.0, 20.2, 20.4]) { const c = container(t); k(t, c.x + 3, c.z - 3, 60, 2); }
  k(20.9, 223, 3, 44, 2.5); k(21.7, 221, -1, 46, 3);
  for (let t = 22.2; t < 25.65; t += .2) { const a = plane(t); k(t, a.x, a.z, 56 + 56 * Math.pow(Math.sin(PI * P(t, 22.2, 25.5)), 1.2), a.alt * .9 + 4); }
  k(26.05, 221.5, -377, 40, 3); k(26.95, 225, -374.3, 27, 1.2); k(27.3, 227, -374.5, 30, 1.2);
  for (const t of [27.45, 27.6, 27.75, 27.88]) { const v = van(t); k(t, v.x - 3, v.z - 1.2, 40 - 12 * P(t, 27.45, 27.9), 1.2); }
  k(28.2, 157.0, -355.8, 14, 1.2); k(28.95, 156.9, -355.9, 13.2, 1.2);
  k(30, ov.x, ov.z, ov.H);
  const n = K.length, m = K.map(() => [0, 0, 0, 0]);
  for (let c = 1; c <= 4; c++) for (let i = 1; i < n - 1; i++) {
    const h0 = K[i][0] - K[i - 1][0], h1 = K[i + 1][0] - K[i][0], d0 = (K[i][c] - K[i - 1][c]) / h0, d1 = (K[i + 1][c] - K[i][c]) / h1;
    if (d0 * d1 > 0) { const w1 = 2 * h1 + h0, w2 = h1 + 2 * h0; m[i][c - 1] = (w1 + w2) / (w1 / d0 + w2 / d1); }
  }
  m[1] = [0, 0, 0, 0]; m[n - 2] = [0, 0, 0, 0];
  const zoomSeg = (A, B, s) => { const H = Math.exp(mix(A[4], B[4], s)), w = (H - Math.exp(A[4])) / (Math.exp(B[4]) - Math.exp(A[4])); return { x: mix(A[1], B[1], w), y: mix(A[2], B[2], w), z: mix(A[3], B[3], w), H }; };
  return (t) => {
    if (t < K[1][0]) return zoomSeg(K[0], K[1], E(t / K[1][0]));
    if (t >= K[n - 2][0]) return zoomSeg(K[n - 2], K[n - 1], E(cl((t - K[n - 2][0]) / (K[n - 1][0] - K[n - 2][0]))));
    let i = 0; while (i < n - 2 && K[i + 1][0] <= t) i++;
    const h = K[i + 1][0] - K[i][0], s = cl((t - K[i][0]) / h), s2 = s * s, s3 = s2 * s, out = [];
    for (let c = 1; c <= 4; c++) out.push((2 * s3 - 3 * s2 + 1) * K[i][c] + (s3 - 2 * s2 + s) * h * m[i][c - 1] + (-2 * s3 + 3 * s2) * K[i + 1][c] + (s3 - s2) * h * m[i + 1][c - 1]);
    return { x: out[0], y: out[1], z: out[2], H: Math.exp(out[3]) };
  };
}

export function createTimeline(O, overview) {
  const cam = buildCamera(overview);
  return function update(tIn) {
    const t = ((tIn % DURATION) + DURATION) % DURATION, tt = t < RC ? t + 30 : t;

    /* forklift + pallet A */
    const f = forklift(t); place(O.forklift, f.x, 0, f.z, f.h); O.forklift.carriage.position.y = f.lift;
    O.palletA.visible = t < 8 || t >= RA;
    if (t < 2.3 || t >= RA) place(O.palletA, -180, 1.1, -38.15, PI / 2);
    else if (t < 6.2) place(O.palletA, f.x + Math.cos(f.h) * 1.73, f.lift + .02, f.z - Math.sin(f.h) * 1.73, f.h);
    else place(O.palletA, -203.4, .16, -26, PI);

    /* container */
    const c = container(t); place(O.cont, c.x, c.y, c.z, c.r);
    O.cont.setDoors((t < 7.0 || t >= RA) ? 1 : 1 - S(t, 7.0, 7.9));

    /* reach stacker, cranes, ship, truck */
    const s = stacker(t); place(O.stacker, s.x, 0, s.z, s.h); O.stacker.set(s.rx, s.sy);
    const ca = craneA(t), cb = craneB(t); O.craneA.set(ca.tz, ca.sy); O.craneB.set(cb.tz, cb.sy);
    const sh = ship(t); place(O.ship, sh.x, sh.y, sh.z, sh.h); O.ship.rotation.x = sh.roll; O.ship.wake.material.opacity = sh.wake * .34;
    const tk = truck(t); place(O.truck.trailer, tk.x, 0, tk.z, tk.h); place(O.truck.cab, tk.cab.x, 0, tk.cab.z, tk.cab.h);

    /* airport B loader, pallet B, aircraft, airport C loader, pallet C */
    const lb = loaderB(t); place(O.loaderB, lb.x, 0, 1, PI); O.loaderB.set(lb.hgt);
    O.palletB.visible = t < 21.5 || t >= RA;
    place(O.palletB, lb.x - mix(-1.2, 5.2, t >= RA ? 0 : S(t, 21.0, 21.5)), lb.hgt, 1.9, PI);
    const a = plane(t); place(O.plane, a.x, a.alt, a.z, a.h); O.plane.rotation.z = a.pitch; O.plane.setGear(cl(a.gear)); O.plane.setDoor(a.door);
    const lc = loaderC(t); place(O.loaderC, lc.x, 0, -375, PI); O.loaderC.set(lc.hgt);
    O.palletC.visible = t >= 26.1 && t < RP;
    const pcx = lc.x - mix(5.2, 0, S(t, 26.1, 26.45)); place(O.palletC, pcx, lc.hgt, -374.1, PI);

    /* van, handler W5, parcel, courier, customer */
    const v = van(t); place(O.van, v.x, 0, v.z, v.h); O.van.setDoors(v.doors);
    let w5 = { x: 225.6, z: -372.0, h: PI, amp: 0, ph: 0 }, w5arm = 0;
    if (t >= 26.2 && t < RP) {
      const w1 = walk(t, 26.2, 26.62, [225.6, -372.0], [222.5, -372.8]), w2 = walk(t, 26.87, 27.1, [222.5, -372.8], [224.55, -373.0]), w3 = walk(t, 27.25, 27.6, [224.55, -373.0], [224.4, -371.9]);
      w5 = t < 26.87 ? w1 : t < 27.25 ? w2 : w3;
      w5.h = t < 26.62 ? w1.h : PI / 2;
      w5arm = mix(mix(0, 2.0, S(t, 26.6, 26.76)), 1.2, S(t, 26.8, 26.9)) * (1 - S(t, 27.2, 27.35));
    }
    place(O.W5, w5.x, 0, w5.z, w5.h); posePerson(O.W5, { walk: w5.ph, amp: w5.amp, armL: w5arm || null, armR: w5arm || null });

    const ew = walk(tt, 28.05, 28.5, [158.7, -355.0], [156.55, -356.3]);
    O.exec.visible = tt >= 27.97; place(O.exec, ew.x, 0, ew.z, ew.h);
    const hold = 1.15 * (1 - S(tt, 28.78, 28.98)), wv = S(tt, 28.95, 29.12) * (1 - S(tt, 29.65, 29.92));
    posePerson(O.exec, { walk: ew.ph, amp: ew.amp, armL: hold, armR: mix(hold, 2.5 + .35 * Math.sin(tt * 18), wv) });
    const cw = walk(tt, 27.7, 28.3, [154.4, -358.3], [155.45, -356.5]), ch = mix(cw.h, -.18, S(tt, 28.15, 28.45));
    O.cust.visible = tt >= 27.62; place(O.cust, cw.x, 0, cw.z, ch);
    const recv = 1.1 * S(tt, 28.4, 28.62);
    posePerson(O.cust, { walk: cw.ph, amp: cw.amp, armL: recv || null, armR: recv || null, bend: .22 * S(tt, 28.9, 29.05) * (1 - S(tt, 29.2, 29.4)) });

    const pc = O.parcel; pc.visible = true;
    const hand = (o, h, r = .42) => [o.position.x + Math.cos(h) * r, 1.08, o.position.z - Math.sin(h) * r];
    const lerp3 = (A, B, k) => [mix(A[0], B[0], k), mix(A[1], B[1], k) + Math.sin(PI * k) * .12, mix(A[2], B[2], k)];
    let pp, pr = 0;
    if (tt < 26.1) pc.visible = false;
    else if (tt < 27.36) {
      const onP = [pcx, lc.hgt + 1.06, -374.1], inH = [w5.x, 1.15, w5.z - .55], inV = [225.9, .75, -375];
      pp = tt < 26.76 ? onP : tt < 26.88 ? lerp3(onP, inH, S(tt, 26.76, 26.88)) : tt < 27.1 ? inH : lerp3(inH, inV, S(tt, 27.1, 27.22)); pr = PI;
    } else if (tt < 27.97) pc.visible = false;
    else { const eh = hand(O.exec, ew.h), chd = hand(O.cust, ch); pp = lerp3(eh, chd, S(tt, 28.55, 28.8)); pr = ew.h; }
    if (pp) place(pc, pp[0], pp[1], pp[2], pr);
    const ck = S(tt, 28.75, 29.0), co = ck * (1 - S(tt, 29.45, 29.85));
    O.check.material.opacity = co; O.check.visible = co > .003;
    if (pp) { O.check.position.set(pp[0], pp[1] + 1.75 + ck * .25, pp[2]); O.check.scale.setScalar(1.5 * (ck + .28 * Math.sin(PI * ck))); }

    /* yard crew */
    let w = walk(t, .3, 1.3, [-175.8, -40.2], [-178.85, -38.5]); const wh = w.h;
    if (t > 2.5 && t < RA) w = walk(t, 2.5, 3.1, [-178.85, -38.5], [-177.4, -39.6]);
    if (t >= RA) w = { x: -175.8, z: -40.2, amp: 0, ph: 0 };
    const chk = (t < RA) ? S(t, 1.25, 1.6) * (1 - S(t, 2.0, 2.3)) : 0, sig = (t < RA) ? S(t, 2.0, 2.3) * (1 - S(t, 2.9, 3.3)) : 0;
    place(O.W1, w.x, 1.1, w.z, wh); posePerson(O.W1, { walk: w.ph, amp: w.amp, bend: .5 * chk, armL: (1.05 * chk) || null, armR: mix(1.05 * chk, 2.7, sig) || null });
    let x3 = -198.4, z3 = -23.4, h3 = 0, a3L = null, a3R = null, b3 = 0, w3 = { amp: 0, ph: 0 };
    if (t < RA) {
      const bk = S(t, 4.3, 4.7) * (1 - S(t, 5.5, 5.9)); if (bk > 0) a3L = bk * (2.3 + .35 * Math.sin(t * 14));
      w3 = walk(t, 6.6, 7.2, [-198.4, -23.4], [-200.75, -23.65]); x3 = w3.x; z3 = w3.z;
      h3 = mix(mix(0, PI, S(t, 6.55, 6.8)), PI / 2, S(t, 7.05, 7.3));
      const push = S(t, 7.2, 7.4) * (1 - S(t, 7.9, 8.2)); if (push > 0) { a3L = a3R = 1.25 * push; b3 = .2 * push; }
      const s2 = S(t, 8.3, 8.6) * (1 - S(t, 9.1, 9.5)); if (s2 > 0) a3R = 2.6 * s2;
    }
    place(O.W3, x3, 0, z3, h3); posePerson(O.W3, { walk: w3.ph, amp: w3.amp, armL: a3L, armR: a3R, bend: b3 });

    return cam(t);
  };
}
