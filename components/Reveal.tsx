"use client";
import ScrollReveal from "@/components/ScrollReveal";

/** Back-compat wrapper: the site-wide reveal is now ScrollReveal (fade-up). */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li";
}) {
  return (
    <ScrollReveal className={className} delay={delay} as={as}>
      {children}
    </ScrollReveal>
  );
}
