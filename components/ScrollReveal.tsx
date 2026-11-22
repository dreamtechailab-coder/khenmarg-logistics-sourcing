"use client";
import { useEffect, useRef } from "react";

type Variant = "fade-up" | "fade-in";

/**
 * Lightweight scroll reveal (native IntersectionObserver, once, threshold 0.12).
 * `fade-up`: 18px rise + fade; `fade-in`: opacity only. `delay` in ms for staggers.
 * Reduced-motion users see content immediately (see .sr in globals.css).
 */
export default function ScrollReveal({
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "ul";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("sr-in");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("sr-in");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={`sr sr-${variant} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}
