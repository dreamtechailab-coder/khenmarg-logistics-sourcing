"use client";
import { useEffect, useState } from "react";
import { LAND_PATH, MAP_H, PINS } from "@/components/worldDots";

/**
 * Interactive "Chennai to the world" trade-route map.
 * Left: copy + corridor filter pills. Right: dotted world map with animated arcs,
 * travelling cargo pulses and a pulsing Chennai beacon. Pure SVG/CSS, no libraries.
 */

type CorridorId = "gulf" | "europe" | "asia" | "na" | "sa" | "au" | "nz";
type Filter = "all" | CorridorId;

type Node = { key: string; label?: string; dx?: number; dy?: number; anchor?: "start" | "middle" | "end"; major?: boolean };
type Corridor = {
  id: CorridorId;
  pill: string;
  title: string;
  modes: string[];
  ports: string;
  nodes: Node[];
};

const CORRIDORS: Corridor[] = [
  {
    id: "gulf",
    pill: "Gulf & Middle East ★",
    title: "Gulf & Middle East",
    modes: ["Sea", "Air", "Multimodal"],
    ports: "Jebel Ali · Dubai · Riyadh · Dammam · Doha · Muscat",
    nodes: [
      { key: "dubai", label: "Gulf Region", dx: -3.2, dy: -3.4, anchor: "end", major: true },
      { key: "riyadh" },
      { key: "dammam" },
      { key: "doha" },
      { key: "muscat" },
    ],
  },
  {
    id: "europe",
    pill: "Europe",
    title: "Europe",
    modes: ["Sea", "Air", "Multimodal"],
    ports: "Rotterdam · Hamburg",
    nodes: [{ key: "rotterdam", label: "Europe", dy: -3.6, anchor: "middle", major: true }],
  },
  {
    id: "asia",
    pill: "East & SE Asia",
    title: "East & South-East Asia",
    modes: ["Sea", "Air"],
    ports: "Shanghai · Busan · Singapore",
    nodes: [
      { key: "shanghai", label: "East Asia", dx: 0, dy: -3.6, anchor: "middle", major: true },
      { key: "singapore", label: "South-East Asia", dy: 5.2, anchor: "middle", major: true },
    ],
  },
  {
    id: "na",
    pill: "North America",
    title: "North America",
    modes: ["Sea", "Air"],
    ports: "New York / NJ · Houston",
    nodes: [
      { key: "newyork", label: "North America", dy: -3.6, anchor: "middle", major: true },
      { key: "houston" },
    ],
  },
  {
    id: "sa",
    pill: "South America",
    title: "South America",
    modes: ["Sea", "Air"],
    ports: "Santos · São Paulo · Buenos Aires",
    nodes: [
      { key: "santos", label: "South America", dy: -3.6, anchor: "middle", major: true },
      { key: "buenosaires" },
    ],
  },
  {
    id: "au",
    pill: "Australia",
    title: "Australia",
    modes: ["Sea", "Air"],
    ports: "Sydney · Melbourne",
    nodes: [
      { key: "sydney", label: "Australia", dx: -1, dy: -3.6, anchor: "middle", major: true },
      { key: "melbourne" },
    ],
  },
  {
    id: "nz",
    pill: "New Zealand",
    title: "New Zealand",
    modes: ["Sea", "Air"],
    ports: "Auckland",
    nodes: [{ key: "auckland", label: "New Zealand", dx: 3, dy: 5.6, anchor: "end", major: true }],
  },
];

// Extra pins, projected with the same lon/lat → x/y fit as the base map pins (x = 78.8 + 0.47·lon, y = 26.8 + 0.536·(40.7 − lat)).
const P: Record<string, [number, number]> = {
  ...PINS,
  santos: [57, 61.5],
  buenosaires: [51.4, 67.2],
  sydney: [149.9, 66.8],
  melbourne: [146.9, 68.9],
  auckland: [160.9, 66.8],
};

// The base dot map ends at x≈157, so New Zealand's two islands are added here in the same dot style.
const VIEW_W = 166;
// Empty ocean band under the map where the glass card sits on sm+ so it never covers South America / Australia / NZ pins.
const VIEW_H = MAP_H + 32;
const NZ_ROWS: [number, number, number][] = [
  // [lat, lonFrom, lonTo]
  [-35.2, 173.3, 174.6], [-36.8, 174.0, 175.8], [-38.4, 174.6, 177.6], [-40.0, 173.8, 176.4], [-41.5, 174.8, 175.9],
  [-41.2, 172.6, 173.8], [-42.8, 171.5, 173.4], [-44.4, 169.6, 172.2], [-46.0, 167.6, 170.4],
];
const NZ_PATH = NZ_ROWS.flatMap(([lat, a, b]) => {
  const out: string[] = [];
  for (let lon = a; lon <= b + 0.01; lon += 1.8) {
    out.push(`M${(78.8 + 0.47 * lon).toFixed(1)} ${(26.8 + 0.536 * (40.7 - lat)).toFixed(1)}h0`);
  }
  return out;
}).join("");

const PILLS: { id: Filter; label: string }[] = [
  { id: "all", label: "All Corridors" },
  ...CORRIDORS.map((c) => ({ id: c.id as Filter, label: c.pill })),
];

const [HX, HY] = P.chennai;

/** Quadratic arc from Chennai to (x, y), bowed perpendicular to the straight line (always upwards). */
function arc(x: number, y: number) {
  const dx = x - HX;
  const dy = y - HY;
  const len = Math.hypot(dx, dy) || 1;
  let px = dy / len;
  let py = -dx / len;
  if (py > 0) {
    px = -px;
    py = -py;
  }
  const bow = len * 0.28;
  const cx = (HX + x) / 2 + px * bow;
  const cy = (HY + y) / 2 + py * bow;
  return `M${HX} ${HY} Q${cx.toFixed(2)} ${cy.toFixed(2)} ${x} ${y}`;
}

let order = 0;
const ARCS = CORRIDORS.flatMap((c) =>
  c.nodes.map((n) => {
    const [x, y] = P[n.key];
    return { corridor: c.id, node: n, x, y, d: arc(x, y), i: order++ };
  })
);

export default function NetworkMap() {
  const [selected, setSelected] = useState<Filter>("all");
  const [hover, setHover] = useState<Filter | null>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const on = () => setReduce(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const active: Filter = hover ?? selected;
  const info = CORRIDORS.find((c) => c.id === active);
  const lit = (id: CorridorId) => active === "all" || active === id;

  return (
    <div className="grid items-center gap-6 lg:grid-cols-[38fr_62fr] lg:gap-10">
      {/* ---------- left: copy + filters ---------- */}
      <div>
        <div className="eyebrow mb-3 flex items-center gap-2 !text-white/70">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F58C22] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F58C22]" />
          </span>
          Global network
        </div>
        <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">From Chennai to the world</h2>
        <p className="mt-3 text-base leading-relaxed text-white/75 md:text-lg">
          Through worldwide agents and overseas partners, we move cargo across continents — with a strong focus on the
          Gulf region.
        </p>

        <div className="mt-5 flex flex-wrap gap-2.5" role="group" aria-label="Filter trade corridors">
          {PILLS.map((p) => {
            const on = selected === p.id;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={on}
                onClick={() => setSelected(p.id)}
                onMouseEnter={() => setHover(p.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(p.id)}
                onBlur={() => setHover(null)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  on
                    ? "border-transparent text-white shadow-md shadow-orange-500/30"
                    : "border-white/20 bg-white/5 text-white/80 hover:border-orange-400/60 hover:text-white"
                }`}
                style={on ? { background: "linear-gradient(135deg, #C8281E 0%, #E8541A 55%, #F58C22 100%)" } : undefined}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------- right: map ---------- */}
      <div
        className="relative overflow-hidden rounded-2xl border border-orange-500/20 bg-[#0F1117] shadow-2xl shadow-black/40"
        style={{
          backgroundImage:
            "radial-gradient(42% 55% at 68% 48%, rgba(245,140,34,0.20) 0%, rgba(232,84,26,0.08) 45%, transparent 75%), linear-gradient(180deg, #171412 0%, #0F1117 100%)",
        }}
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="-mb-[19.3%] block h-auto w-full sm:mb-0"
          role="img"
          aria-label="Khenmarg global trade-route map showing corridors from Chennai to the Gulf, Europe, Asia, North and South America, Australia and New Zealand"
        >
          <defs>
            <radialGradient id="nm-vignette" cx="50%" cy="50%" r="62%">
              <stop offset="55%" stopColor="#fff" />
              <stop offset="100%" stopColor="#000" />
            </radialGradient>
            <mask id="nm-mask">
              <rect width={VIEW_W} height={MAP_H} fill="url(#nm-vignette)" />
            </mask>
            <radialGradient id="nm-beacon">
              <stop offset="0%" stopColor="#F58C22" />
              <stop offset="60%" stopColor="#E8541A" />
              <stop offset="100%" stopColor="#C8281E" />
            </radialGradient>
            <filter id="nm-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.7" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* dotted continents with edge vignette */}
          <g mask="url(#nm-mask)">
            <path d={LAND_PATH} stroke="#e9d9c8" strokeOpacity="0.5" strokeWidth="0.78" strokeLinecap="round" fill="none" />
            <path d={NZ_PATH} stroke="#e9d9c8" strokeOpacity="0.5" strokeWidth="0.78" strokeLinecap="round" fill="none" />
          </g>

          {/* arcs: dim base + animated glow trail + travelling pulse */}
          {ARCS.map((a) => {
            const on = lit(a.corridor);
            const gulf = a.corridor === "gulf";
            return (
              <g key={`${a.corridor}-${a.node.key}`} style={{ transition: "opacity .3s" }} opacity={on ? 1 : 0.12}>
                <path d={a.d} fill="none" stroke="#E8541A" strokeOpacity={gulf ? 0.45 : 0.3} strokeWidth={gulf ? 0.5 : 0.35} />
                <path
                  d={a.d}
                  pathLength={100}
                  fill="none"
                  stroke={gulf ? "#FFB45A" : "#F58C22"}
                  strokeWidth={gulf ? 0.8 : 0.6}
                  strokeLinecap="round"
                  strokeDasharray="16 84"
                  filter="url(#nm-glow)"
                  className={reduce ? undefined : "nm-flow"}
                  style={{ animationDelay: `${(a.i % 7) * 0.45}s`, animationDuration: gulf ? "2.6s" : "3.6s" }}
                />
                {!reduce && on && (
                  <circle r={gulf ? 1 : 0.8} fill="#fff" filter="url(#nm-glow)">
                    <animateMotion
                      dur={gulf ? "3s" : "5s"}
                      begin={`${(a.i % 6) * 0.6}s`}
                      repeatCount="indefinite"
                      path={a.d}
                      rotate="auto"
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* destination nodes */}
          {CORRIDORS.map((c) => {
            const on = lit(c.id);
            const focusedCorridor = active === c.id;
            return (
              <g
                key={c.id}
                tabIndex={0}
                role="button"
                aria-label={`${c.title}: ${c.ports}`}
                onMouseEnter={() => setHover(c.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(c.id)}
                onBlur={() => setHover(null)}
                onClick={() => setSelected(selected === c.id ? "all" : c.id)}
                style={{ cursor: "pointer", outline: "none", transition: "opacity .3s" }}
                opacity={on ? 1 : 0.25}
              >
                {c.nodes.map((n) => {
                  const [x, y] = P[n.key];
                  const gulf = c.id === "gulf";
                  return (
                    <g key={n.key}>
                      <circle cx={x} cy={y} r={3.2} fill="transparent" />
                      {gulf && on && <circle cx={x} cy={y} r={n.major ? 2.6 : 2} fill="#F58C22" opacity="0.22" />}
                      {on && !reduce && (
                        <circle cx={x} cy={y} r="1.2" fill="none" stroke={gulf ? "#FFB45A" : "#F58C22"} strokeWidth={focusedCorridor ? 0.35 : 0.25}>
                          <animate
                            attributeName="r"
                            values="1.2;3.6"
                            dur={focusedCorridor ? "1.6s" : "2.6s"}
                            begin={`${(n.key.length % 5) * 0.4}s`}
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values={focusedCorridor ? "0.9;0" : "0.6;0"}
                            dur={focusedCorridor ? "1.6s" : "2.6s"}
                            begin={`${(n.key.length % 5) * 0.4}s`}
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                      <circle
                        cx={x}
                        cy={y}
                        r={gulf ? 1.25 : 1}
                        fill={gulf ? "#FFB45A" : "#fff"}
                        stroke="#0F1117"
                        strokeWidth="0.3"
                      />
                      {n.label && (
                        <text
                          x={x + (n.dx ?? 0)}
                          y={y + (n.dy ?? -3.6)}
                          textAnchor={n.anchor ?? "middle"}
                          fontSize="2.7"
                          fill={gulf ? "#FFD08A" : "#fff"}
                          fontWeight={gulf ? 700 : 500}
                          fontFamily="Inter, sans-serif"
                          style={{ paintOrder: "stroke" }}
                          stroke="#0F1117"
                          strokeWidth="0.7"
                        >
                          {n.label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Chennai origin beacon */}
          <g>
            {!reduce &&
              [0, 0.8, 1.6].map((b) => (
                <circle key={b} cx={HX} cy={HY} r="2" fill="none" stroke="#F58C22" strokeWidth="0.4">
                  <animate attributeName="r" values="2;8" dur="2.4s" begin={`${b}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0" dur="2.4s" begin={`${b}s`} repeatCount="indefinite" />
                </circle>
              ))}
            <circle cx={HX} cy={HY} r="2.3" fill="url(#nm-beacon)" stroke="#fff" strokeWidth="0.55" />
            <g transform={`translate(${HX - 8} ${HY + 5.4})`}>
              <rect x="-13" y="-2.7" width="26" height="5.4" rx="2.7" fill="#171412" stroke="#E8541A" strokeOpacity="0.8" strokeWidth="0.35" />
              <text textAnchor="middle" y="0.95" fontSize="2.5" fontWeight="700" fill="#fff" fontFamily="Inter, sans-serif">
                Chennai Hub • HQ
              </text>
            </g>
          </g>
        </svg>

        {/* glass micro-card */}
        <div className="m-3 rounded-xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md sm:absolute sm:bottom-3 sm:left-3 sm:m-0 sm:max-w-[24rem]">
          {info ? (
            <>
              <div className="text-sm font-semibold text-white">{info.title}</div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {info.modes.map((m) => (
                  <span key={m} className="rounded-full bg-[#E8541A]/25 px-2 py-0.5 text-[11px] font-medium text-[#FFD08A]">
                    {m}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-xs leading-relaxed text-white/70">{info.ports}</div>
            </>
          ) : (
            <>
              <div className="text-sm font-semibold text-white">Global Reach — Worldwide Network</div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {["Sea", "Air", "Multimodal"].map((m) => (
                  <span key={m} className="rounded-full bg-[#E8541A]/25 px-2 py-0.5 text-[11px] font-medium text-[#FFD08A]">
                    {m}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-xs leading-relaxed text-white/70">
                Gulf &amp; Middle East • Europe • East &amp; SE Asia • North America • South America • Australia • New Zealand
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
