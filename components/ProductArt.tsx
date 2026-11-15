// Simple illustrated product art, used until real product photography is supplied.
// Replace by setting an `image` on the product and rendering <Image> instead.

const G = { dark: "#22603c", mid: "#2e7d4f", light: "#4b9a5f", leaf: "#7fb069", brown: "#7a4a24", husk: "#a8743f", cream: "#fffaf0" };

function Art({ kind }: { kind: string }) {
  switch (kind) {
    case "coconut":
      return (
        <g>
          <ellipse cx="85" cy="100" rx="38" ry="42" fill={G.husk} />
          <path d="M60 80 q25 -25 50 0" stroke="#8a5a2b" strokeWidth="3" fill="none" />
          <path d="M55 100 q30 -15 60 0" stroke="#8a5a2b" strokeWidth="3" fill="none" />
          <circle cx="125" cy="108" r="30" fill={G.brown} />
          <circle cx="118" cy="100" r="4" fill="#4a2a12" />
          <circle cx="130" cy="98" r="4" fill="#4a2a12" />
          <circle cx="124" cy="110" r="4" fill="#4a2a12" />
          <path d="M120 40 q-30 10 -40 30 q25 -8 40 -30z" fill={G.light} />
          <path d="M120 40 q20 5 30 25 q-22 -6 -30 -25z" fill={G.mid} />
        </g>
      );
    case "milk":
      return (
        <g>
          <rect x="70" y="45" width="60" height="90" rx="8" fill="#fff" stroke={G.mid} strokeWidth="3" />
          <rect x="82" y="32" width="36" height="16" rx="3" fill={G.mid} />
          <rect x="70" y="78" width="60" height="34" fill={G.mid} />
          <circle cx="100" cy="95" r="11" fill={G.brown} />
          <circle cx="100" cy="95" r="6" fill="#fff" />
          <path d="M140 120 q12 -18 0 -36 q-12 18 0 36z" fill="#fff" stroke={G.light} strokeWidth="2" />
        </g>
      );
    case "flakes":
      return (
        <g>
          <path d="M55 105 h90 q-5 35 -45 35 q-40 0 -45 -35z" fill={G.brown} />
          <ellipse cx="100" cy="105" rx="45" ry="10" fill="#fff" stroke={G.husk} strokeWidth="2" />
          {[...Array(14)].map((_, i) => (
            <rect key={i} x={68 + (i % 7) * 10} y={88 - Math.floor(i / 7) * 9 + (i % 2) * 3} width="7" height="3" rx="1.5" fill="#fff" stroke="#e8dcc0" transform={`rotate(${i * 25} ${72 + (i % 7) * 10} ${90 - Math.floor(i / 7) * 9})`} />
          ))}
          <ellipse cx="100" cy="92" rx="34" ry="12" fill="#fffdf6" />
        </g>
      );
    case "sugar":
      return (
        <g>
          <path d="M65 60 h70 l-6 75 h-58z" fill={G.husk} />
          <rect x="62" y="52" width="76" height="12" rx="4" fill={G.brown} />
          <rect x="78" y="85" width="44" height="26" rx="4" fill={G.cream} />
          <text x="100" y="102" fontSize="10" textAnchor="middle" fill={G.dark} fontFamily="sans-serif" fontWeight="700">SUGAR</text>
          {[...Array(8)].map((_, i) => (
            <rect key={i} x={140 + (i % 3) * 7} y={120 + Math.floor(i / 3) * 6} width="4" height="4" fill="#b8864e" transform={`rotate(20 ${142 + (i % 3) * 7} ${122})`} />
          ))}
        </g>
      );
    case "oil":
      return (
        <g>
          <path d="M85 40 h30 v14 q22 10 22 35 v40 q0 8 -8 8 h-58 q-8 0 -8 -8 v-40 q0 -25 22 -35z" fill="#fff6d6" stroke={G.mid} strokeWidth="3" />
          <rect x="83" y="30" width="34" height="12" rx="3" fill={G.mid} />
          <path d="M66 100 h68 v29 q0 8 -8 8 h-52 q-8 0 -8 -8z" fill="#f7e7a8" />
          <circle cx="100" cy="98" r="14" fill={G.cream} stroke={G.light} strokeWidth="2" />
          <path d="M100 88 q-8 8 0 18 q8 -10 0 -18z" fill={G.light} />
        </g>
      );
    case "jar":
      return (
        <g>
          <rect x="68" y="55" width="64" height="80" rx="12" fill="#c0462b" />
          <rect x="72" y="58" width="56" height="20" rx="6" fill="#d9692f" opacity=".6" />
          <rect x="64" y="38" width="72" height="20" rx="5" fill={G.mid} />
          <rect x="78" y="88" width="44" height="28" rx="4" fill={G.cream} />
          <path d="M88 102 q12 -12 24 0" stroke={G.mid} strokeWidth="3" fill="none" />
          <circle cx="145" cy="125" r="8" fill="#e8b23a" />
          <path d="M145 117 q4 -6 8 -4" stroke={G.mid} strokeWidth="2" fill="none" />
        </g>
      );
    case "papad":
      return (
        <g>
          <circle cx="92" cy="98" r="44" fill="#f0d79a" />
          <circle cx="112" cy="88" r="40" fill="#f6e3b0" stroke="#e0c47e" strokeWidth="2" />
          {[[100, 75], [120, 82], [108, 98], [128, 100], [95, 92], [115, 110]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.2" fill="#a57c3a" />
          ))}
        </g>
      );
    case "veg":
      return (
        <g>
          <path d="M60 110 q10 -40 30 -30 q-5 30 -30 30z" fill="#6a2c70" />
          <path d="M84 82 q6 -10 14 -6" stroke={G.mid} strokeWidth="4" fill="none" />
          <path d="M100 135 l18 -70 l8 2 l-14 70z" fill={G.light} />
          <path d="M116 66 q4 -12 12 -10" stroke={G.dark} strokeWidth="3" fill="none" />
          <circle cx="140" cy="115" r="18" fill="#d9452b" />
          <path d="M134 98 l6 6 l6 -6" stroke={G.mid} strokeWidth="3" fill="none" />
          <path d="M60 135 q40 -12 90 0" stroke={G.leaf} strokeWidth="6" fill="none" strokeLinecap="round" />
        </g>
      );
    case "powder":
      return (
        <g>
          <ellipse cx="80" cy="118" rx="34" ry="14" fill="#9cbf6a" />
          <path d="M50 118 q30 -40 60 0z" fill="#86ad55" />
          <ellipse cx="128" cy="122" rx="28" ry="11" fill="#c9d17a" />
          <path d="M104 122 q24 -30 48 0z" fill="#b7c463" />
          <path d="M70 60 q15 -20 30 0 q-15 20 -30 0z" fill={G.mid} />
          <path d="M100 55 q12 -16 24 0 q-12 16 -24 0z" fill={G.light} />
          <circle cx="142" cy="70" r="12" fill="#b8d35a" stroke={G.mid} strokeWidth="2" />
          <path d="M142 58 v24" stroke={G.mid} strokeWidth="1" opacity=".5" />
        </g>
      );
    default:
      return null;
  }
}

export default function ProductArt({ kind, className = "" }: { kind: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-hidden>
      <defs>
        <radialGradient id={`bg-${kind}`} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#fffdf6" />
          <stop offset="100%" stopColor="#ece5cf" />
        </radialGradient>
      </defs>
      <rect width="200" height="160" fill={`url(#bg-${kind})`} />
      <circle cx="100" cy="92" r="62" fill="#f7f3e8" />
      <Art kind={kind} />
    </svg>
  );
}
