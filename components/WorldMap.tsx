// Stylised route map: Chennai hub with animated lanes to key trade regions.
// Positions are on a simple equirectangular grid (x: lon, y: lat) — illustrative only.

const W = 1000;
const H = 500;
const proj = (lon: number, lat: number) => [((lon + 180) / 360) * W, ((90 - lat) / 180) * H] as const;

const hub = { name: "Chennai", lon: 80.27, lat: 13.08 };
const dests: { name: string; lon: number; lat: number; gulf?: boolean; dx?: number; dy?: number; anchor?: string }[] = [
  { name: "Gulf Region", lon: 54, lat: 24.5, gulf: true, dx: -10, dy: -14, anchor: "end" },
  { name: "Europe", lon: 8, lat: 50 },
  { name: "Africa", lon: 36.8, lat: -1.3 },
  { name: "North America", lon: -80, lat: 38 },
  { name: "South-East Asia", lon: 103.8, lat: 1.35, dx: 10, dy: 22, anchor: "start" },
  { name: "East Asia", lon: 121.5, lat: 31.2 },
  { name: "Australia", lon: 144.9, lat: -37.8 },
  { name: "South America", lon: -46.6, lat: -23.5 },
];

// coarse land blobs (very rough) for context
const land = [
  "M120 90 L260 70 L330 110 L300 180 L250 230 L200 200 L150 160 Z", // N America
  "M290 260 L340 250 L360 300 L330 400 L300 380 L285 310 Z", // S America
  "M470 90 L560 70 L580 120 L520 150 L470 140 Z", // Europe
  "M470 170 L560 160 L600 230 L570 340 L530 350 L500 280 L460 220 Z", // Africa
  "M560 80 L820 60 L880 120 L840 180 L760 210 L700 230 L640 200 L590 160 Z", // Asia
  "M830 320 L900 310 L920 360 L870 380 L830 360 Z", // Australia
];

export default function WorldMap({ theme = "km" }: { theme?: "km" | "sh" }) {
  const [hx, hy] = proj(hub.lon, hub.lat);
  const lane = theme === "sh" ? "#7fd39a" : "#f26b1d";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Khenmarg global network map from Chennai">
      <defs>
        <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="rgba(255,255,255,0.10)" />
        </pattern>
        <pattern id="landdots" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="rgba(255,255,255,0.35)" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#dots)" />
      {land.map((d, i) => (
        <path key={i} d={d} fill="url(#landdots)" stroke="none" strokeLinejoin="round" />
      ))}
      {dests.map((d) => {
        const [x, y] = proj(d.lon, d.lat);
        const mx = (hx + x) / 2;
        const my = Math.min(hy, y) - Math.abs(hx - x) * 0.25 - 20;
        return (
          <g key={d.name}>
            <path d={`M${hx} ${hy} Q${mx} ${my} ${x} ${y}`} stroke={lane} strokeWidth={d.gulf ? 3 : 1.8} fill="none" className="route-line" opacity={d.gulf ? 1 : 0.85} />
            <circle cx={x} cy={y} r={d.gulf ? 7 : 5} fill={d.gulf ? "#7fd39a" : "#fff"} />
            <text x={x + (d.dx ?? 0)} y={y + (d.dy ?? (d.lat < 0 ? 22 : -12))} textAnchor={(d.anchor as "start" | "end" | undefined) ?? "middle"} fontSize="15" fill="#fff" fontFamily="Inter, sans-serif" fontWeight={d.gulf ? 700 : 500}>
              {d.name}
            </text>
          </g>
        );
      })}
      <circle cx={hx} cy={hy} r="18" fill={lane} opacity="0.25">
        <animate attributeName="r" values="12;26;12" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx={hx} cy={hy} r="9" fill={lane} stroke="#fff" strokeWidth="3" />
      <text x={hx} y={hy + 36} textAnchor="middle" fontSize="17" fill="#fff" fontWeight="700" fontFamily="Poppins, sans-serif">
        Chennai, India
      </text>
    </svg>
  );
}
