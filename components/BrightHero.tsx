import Image from "next/image";

/**
 * Unified bright hero used on About, Services and Industries & Network:
 * clean white fade on the left for the text, untouched original photo on the right.
 */
export default function BrightHero({
  eyebrow,
  title,
  intro,
  image,
  position = "right",
  mirror = false,
  zoom,
  theme = "km",
  className = "py-10 sm:py-14 lg:py-16",
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  /** CSS object-position for the photo. */
  position?: string;
  mirror?: boolean;
  /** Optional zoom (anchored at the left edge) to push the subject toward the right. */
  zoom?: number;
  /** "sh" = Shashva green eyebrow/headline. */
  theme?: "km" | "sh";
  className?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200/80 bg-white">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectPosition: position, ...(zoom ? { transform: `scale(${zoom})`, transformOrigin: "0% 50%" } : {}) }}
        className={`-z-20 object-cover ${mirror ? "-scale-x-100" : ""}`}
      />
      {/* mobile: soft scrim; desktop: gradient reaches 0% opacity by 70% so the right side is the untouched photo */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-white/85 md:bg-transparent" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.90) 36%, rgba(255,255,255,0.35) 56%, rgba(255,255,255,0) 70%)",
        }}
      />
      <div className={`container-x relative flex min-h-[340px] flex-col justify-center lg:min-h-[380px] ${className}`}>
        <div className="max-w-xl lg:max-w-2xl">
          <div className={`eyebrow mb-2 font-bold tracking-wider ${theme === "sh" ? "text-[#1f5c3a]" : "text-[#d94e1f]"}`}>{eyebrow}</div>
          <h1 className={`text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${theme === "sh" ? "text-[#0f2e1d]" : "text-[#0f172a]"}`}>{title}</h1>
          <p className="mt-4 text-lg text-[#334155]">{intro}</p>
        </div>
      </div>
    </section>
  );
}
