import { Award, Truck, Globe2, Leaf, type LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";

type Stat = { value: string; label: string; icon: LucideIcon; tone: "km" | "sh" };

const stats: Stat[] = [
  { value: "15+", label: "Years of industry experience", icon: Award, tone: "km" },
  { value: "8", label: "Logistics services", icon: Truck, tone: "km" },
  { value: "Global", label: "Network of overseas partners", icon: Globe2, tone: "km" },
  { value: "9", label: "Shashva food product lines", icon: Leaf, tone: "sh" },
];

const tones = {
  km: "bg-km-50 text-km-600",
  sh: "bg-sh-50 text-sh-600",
};

export default function StatsBar() {
  return (
    <section className="relative z-10 -mt-12 sm:-mt-10" aria-label="Key figures">
      <div className="container-x">
        <Reveal className="grid grid-cols-1 gap-2 rounded-3xl border border-white/60 bg-white/90 p-2 shadow-2xl shadow-black/15 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:p-3">
          {stats.map(({ value, label, icon: Icon, tone }, i) => (
            <div
              key={label}
              className={`group relative flex items-center gap-4 rounded-2xl p-4 sm:p-5 ${
                i > 0 ? "lg:before:absolute lg:before:-left-px lg:before:top-1/4 lg:before:h-1/2 lg:before:w-px lg:before:bg-gray-200" : ""
              }`}
            >
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${tones[tone]}`}>
                <Icon size={26} strokeWidth={1.8} aria-hidden />
              </span>
              <div className="min-w-0">
                <div className="bg-gradient-to-r from-brand-red to-brand-orange bg-clip-text font-display text-3xl font-extrabold leading-tight text-transparent">
                  {value}
                </div>
                <div className="mt-0.5 text-sm font-medium leading-snug text-gray-600">{label}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
