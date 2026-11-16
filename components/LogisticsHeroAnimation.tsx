"use client";
import { useEffect, useRef, useState } from "react";

/** Live 3D isometric logistics scene (Three.js) rendered edge-to-edge into its parent. */
export default function LogisticsHeroAnimation({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let handle: { dispose: () => void } | null = null;
    let cancelled = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    import("@/lib/logistics-scene/scene.js")
      .then(({ createLogisticsScene }) => {
        if (cancelled) return;
        try {
          handle = createLogisticsScene(el, { reducedMotion: reduced });
          setReady(true);
        } catch (e) {
          console.warn("3D hero unavailable (WebGL)", e);
        }
      })
      .catch((e) => console.warn("3D hero failed to load", e));
    return () => {
      cancelled = true;
      handle?.dispose();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ transform: "translateZ(0)" }}
      className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"} ${className}`}
    />
  );
}
