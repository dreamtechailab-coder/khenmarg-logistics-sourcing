// Live, responsive port of the KHENMARG isometric logistics scene (see ../khenmarg-logistics-sourcing).
// createLogisticsScene(container) fills its container edge-to-edge (no letterboxing), resizes with it,
// pauses when off-screen / tab hidden, adapts resolution to GPU speed and returns { dispose }.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { M } from './kit.js';
import { buildWorld, LANDS } from './world.js';
import * as OB from './objects.js';
import { createTimeline, DURATION } from './timeline.js';

const MAX_DPR = 2;
const STILL_T = 3.4; // frame shown for reduced-motion users (forklift + workers on the platform)

export function createLogisticsScene(container, { reducedMotion = false } = {}) {
  let W = Math.max(2, container.clientWidth), H = Math.max(2, container.clientHeight);
  let pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_DPR);

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(pixelRatio); renderer.setSize(W, H, false);
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.12;
  const cv = renderer.domElement;
  cv.style.cssText = 'display:block;width:100%;height:100%;position:absolute;inset:0';
  container.appendChild(cv);

  const scene = new THREE.Scene(); scene.background = new THREE.Color(0x1E293B);
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture; scene.environmentIntensity = 0.42;
  scene.add(new THREE.HemisphereLight(0xdfe9f5, 0x3a3f47, 0.75));
  const LDIR = new THREE.Vector3(-0.62, 1, 0.5).normalize();
  const sun = new THREE.DirectionalLight(0xfff3e2, 3.1); sun.castShadow = true;
  sun.shadow.mapSize.set(4096, 4096); sun.shadow.bias = -0.0004; scene.add(sun, sun.target);

  buildWorld(scene);
  const O = {
    forklift: OB.makeForklift(), palletA: OB.makePallet(true), cont: OB.makeHeroContainer(), stacker: OB.makeStacker(),
    craneA: OB.makeGantry(), craneB: OB.makeGantry(), ship: OB.makeShip(), truck: OB.makeTruck(),
    loaderB: OB.makeLoader(), loaderC: OB.makeLoader(), palletB: OB.makePallet(true), palletC: OB.makePallet(false), parcel: OB.makeParcel(),
    plane: OB.makeAircraft(), van: OB.makeVan(), check: OB.makeCheck(),
    W1: OB.makePerson({ vest: M.vestO, hat: M.yellow }), W3: OB.makePerson({ vest: M.vestY, hat: M.white }), W5: OB.makePerson({ vest: M.vestO, hat: M.white }),
    exec: OB.makePerson({ vest: M.vestO, hat: M.orange, shirt: M.navy, pants: M.navy }),
    cust: OB.makePerson({ vest: null, hat: null, hair: true, shirt: M.shirtW, pants: M.khaki }),
  };
  O.craneA.position.x = -235; O.craneB.position.x = 130;
  for (const k in O) { if (k === 'truck') scene.add(O.truck.cab, O.truck.trailer); else scene.add(O[k]); }

  /* isometric camera */
  const CDIR = new THREE.Vector3(1, Math.SQRT2 * Math.tan(THREE.MathUtils.degToRad(33)), 1).normalize();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 5000);
  const right = new THREE.Vector3(1, 0, -1).normalize(), up = new THREE.Vector3().crossVectors(right, CDIR.clone().negate()).normalize();
  const computeOverview = (aspect) => {
    let r0 = 1e9, r1 = -1e9, u0 = 1e9, u1 = -1e9;
    for (const [x0, x1, z0, z1] of LANDS) for (const x of [x0, x1]) for (const z of [z0, z1]) for (const y of [0, 26]) {
      const p = new THREE.Vector3(x, y, z), r = p.dot(right), u = p.dot(up); r0 = Math.min(r0, r); r1 = Math.max(r1, r); u0 = Math.min(u0, u); u1 = Math.max(u1, u);
    }
    const rc = (r0 + r1) / 2, uc = (u0 + u1) / 2, g = new THREE.Vector3(-1, 0, -1).normalize(), b = uc / g.dot(up);
    const c = right.clone().multiplyScalar(rc).addScaledVector(g, b);
    return { x: c.x, z: c.z, H: Math.max((r1 - r0) / aspect, u1 - u0) * 1.05 };
  };
  let update = createTimeline(O, computeOverview(W / H));

  /* post: tilt-shift miniature blur + soft vignette */
  const rt = new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType, samples: 4 });
  const composer = new EffectComposer(renderer, rt); composer.setPixelRatio(pixelRatio); composer.setSize(W, H);
  composer.addPass(new RenderPass(scene, camera));
  const TS = (dir, vig) => new ShaderPass({
    uniforms: { tDiffuse: { value: null }, dir: { value: dir }, amt: { value: 1 }, vig: { value: vig } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: `uniform sampler2D tDiffuse; uniform vec2 dir; uniform float amt, vig; varying vec2 vUv;
      void main(){ float r=smoothstep(.17,.52,abs(vUv.y-.5))*amt; vec4 c=vec4(0.); float tw=0.;
        for(int i=-5;i<=5;i++){ float w=exp(-float(i*i)/9.); c+=texture2D(tDiffuse,vUv+dir*r*float(i)/5.)*w; tw+=w; }
        c/=tw; vec2 p=(vUv-.5)*vec2(1.,1.15); c.rgb*=mix(1.,1.-vig,smoothstep(.38,.95,length(p)*1.25)); gl_FragColor=c; }`,
  });
  const tsH = TS(new THREE.Vector2(), 0), tsV = TS(new THREE.Vector2(), 0.3);
  composer.addPass(tsH); composer.addPass(tsV); composer.addPass(new OutputPass());
  const setBlur = () => { const blur = 4.5 * Math.max(H, 540) / 2160; tsH.uniforms.dir.value.set(blur / W, 0); tsV.uniforms.dir.value.set(0, blur / H); };
  setBlur();

  const oceanN = M.ocean.normalMap;
  function renderAt(t) {
    const c = update(t), aspect = W / H;
    camera.top = c.H / 2; camera.bottom = -c.H / 2; camera.right = c.H / 2 * aspect; camera.left = -camera.right;
    // on wide screens push the action to the right so it clears the headline copy
    const off = aspect > 1.3 ? Math.min(0.2, (aspect - 1.3) * 0.2) * (camera.right - camera.left) : 0;
    camera.left -= off; camera.right -= off;
    camera.position.set(c.x, c.y, c.z).addScaledVector(CDIR, 1800); camera.lookAt(c.x, c.y, c.z); camera.updateProjectionMatrix();
    const ext = Math.max(70, c.H * 1.3 * Math.max(1, aspect / 1.78)), sc = sun.shadow.camera;
    sun.target.position.set(c.x, 0, c.z); sun.position.copy(sun.target.position).addScaledVector(LDIR, 1200);
    sc.left = -ext; sc.right = ext; sc.top = ext; sc.bottom = -ext; sc.near = 100; sc.far = 2400; sc.updateProjectionMatrix();
    sun.shadow.normalBias = ext / 4096 * 2.5;
    const tilt = THREE.MathUtils.clamp(1.25 - c.H / 500, .55, 1.15); tsH.uniforms.amt.value = tilt; tsV.uniforms.amt.value = tilt;
    oceanN.offset.set((t / DURATION) * 2, -(t / DURATION) * 1);
    composer.render();
  }

  function resize() {
    const w = Math.max(2, container.clientWidth), h = Math.max(2, container.clientHeight);
    if (w === W && h === H) return;
    W = w; H = h;
    renderer.setPixelRatio(pixelRatio); renderer.setSize(W, H, false);
    composer.setPixelRatio(pixelRatio); composer.setSize(W, H);
    update = createTimeline(O, computeOverview(W / H));
    setBlur();
    if (reducedMotion || !running) renderAt(clock());
  }
  const ro = new ResizeObserver(resize); ro.observe(container);

  /* playback: runs only while visible; adapts pixel ratio to keep ~30fps+ on weak GPUs */
  let running = false, raf = 0, tAcc = reducedMotion ? STILL_T : 0, last = 0, visible = true, tabVisible = !document.hidden;
  let slowFrames = 0, fastFrames = 0, disposed = false, cycled = false, covered = false;
  // once the intro section fully covers the scene there is nothing to see: stop rendering to save GPU
  const onCovered = () => { covered = true; sync(); };
  window.addEventListener('khenmarg:hero-covered', onCovered);
  const clock = () => tAcc % DURATION;
  const adapt = (dt) => {
    if (dt > 0.036) { slowFrames++; fastFrames = 0; } else if (dt < 0.02) { fastFrames++; slowFrames = 0; } else { slowFrames = 0; fastFrames = 0; }
    if (slowFrames > 20 && pixelRatio > 1.5) { pixelRatio = Math.max(1.5, pixelRatio - 0.25); slowFrames = 0; const w = W; W = 0; resizeForce(w); }
    else if (fastFrames > 240 && pixelRatio < Math.min(window.devicePixelRatio || 1, MAX_DPR)) { pixelRatio = Math.min(Math.min(window.devicePixelRatio || 1, MAX_DPR), pixelRatio + 0.1); fastFrames = 0; const w = W; W = 0; resizeForce(w); }
  };
  const resizeForce = () => resize();
  const loop = (now) => {
    if (!running) return;
    raf = requestAnimationFrame(loop);
    const dt = Math.min(0.1, (now - last) / 1000); last = now; tAcc += dt; adapt(dt);
    renderAt(clock());
    // first full playback finished (only counts time actually rendered) -> let the page reveal the intro section
    if (!cycled && tAcc >= DURATION) { cycled = true; window.dispatchEvent(new CustomEvent('khenmarg:hero-cycle')); }
  };
  const sync = () => {
    const should = visible && tabVisible && !reducedMotion && !disposed && !covered;
    if (should && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(loop); }
    else if (!should && running) { running = false; cancelAnimationFrame(raf); }
  };
  const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; sync(); }, { threshold: 0 }); io.observe(container);
  const onVis = () => { tabVisible = !document.hidden; sync(); };
  document.addEventListener('visibilitychange', onVis);

  renderAt(clock());   // first frame immediately
  sync();

  return {
    dispose() {
      disposed = true; running = false; cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect(); document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('khenmarg:hero-covered', onCovered);
      scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
      composer.dispose?.(); rt.dispose(); pm.dispose(); renderer.dispose();
      renderer.forceContextLoss?.(); cv.remove();
    },
  };
}
