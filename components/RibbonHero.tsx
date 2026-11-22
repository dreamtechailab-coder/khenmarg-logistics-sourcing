import Image from "next/image";

export type RibbonSlice = { src: string; alt: string; pos?: string };


/** Hero: white-faded text zone on the left, angled feathered photo ribbon on the right. */
export default function RibbonHero({
  eyebrow,
  title,
  intro,
  slices,
  theme = "km",
  fullWidth = false,
  fade,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  slices: RibbonSlice[];
  theme?: "km" | "sh";
  /** Ribbon spans 100% of the hero, showing softly through a semi-transparent white fade on the left. */
  fullWidth?: boolean;
  /** Optional custom CSS gradient for the left fade (desktop). */
  fade?: string;
}) {
  const STEP = 100 / slices.length; // each slice starts every STEP% ...
  const WIDTH = STEP * 1.55; // ... and is ~1.55x wider, so neighbours overlap
  const sh = theme === "sh";
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200/80 bg-white">
      <div className={`sh-hero-fade absolute inset-y-0 -z-20 w-full ${fullWidth ? "inset-0 h-full" : "right-0 md:w-[62%]"}`}>
        {slices.map((s, i) => (
          <div
            key={s.src}
            className="absolute inset-y-0"
            style={{
              left: `${i * STEP}%`,
              width: `${WIDTH}%`,
              clipPath: "polygon(14% 0, 100% 0, 86% 100%, 0 100%)",
              // feather the left edge of every slice after the first so frames melt into each other
              ...(i > 0
                ? {
                    WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 22%)",
                    maskImage: "linear-gradient(90deg, transparent 0%, #000 22%)",
                  }
                : {}),
              zIndex: i + 1,
            }}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              loading="eager"
              sizes="(min-width: 768px) 20vw, 40vw"
              style={{ objectPosition: s.pos ?? "50% 50%" }}
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div aria-hidden className={`absolute inset-0 -z-10 md:bg-transparent ${fullWidth ? (sh ? "bg-white/[0.82]" : "bg-white/80") : "bg-white/85"}`} />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden md:block"
        style={{
          background:
            fade ??
            (fullWidth
            ? "linear-gradient(90deg, rgba(255,255,255,0.84) 0%, rgba(255,255,255,0.78) 34%, rgba(255,255,255,0.35) 52%, rgba(255,255,255,0) 65%)"
            : "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 36%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 62%)"),
        }}
      />
      <div className="relative mx-auto flex w-full max-w-[1440px] min-h-[340px] px-4 sm:px-6 lg:px-8 flex-col justify-center py-10 sm:py-14 lg:py-16 lg:min-h-[380px]">
        <div className="max-w-[28rem]">
          <div className={`eyebrow mb-2 font-bold tracking-wider ${sh ? "text-[#1f5c3a]" : "text-[#d94e1f]"}`}>{eyebrow}</div>
          <h1 className={`text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${sh ? "text-[#0f2e1d]" : "text-[#0f172a]"}`}>{title}</h1>
          <p className="mt-4 text-lg text-[#334155]">{intro}</p>
        </div>
      </div>
    </section>
  );
}
