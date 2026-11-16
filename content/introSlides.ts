/**
 * Slides for the post-animation intro carousel (components/IntroCarousel.tsx).
 * Images are optimised copies of the supplied Pexels photographs (originals untouched).
 * `position` / `scale` / `origin` / `flip` keep each photo's subject clear of the left-hand text column.
 */
export type IntroSlide = {
  src: string;
  srcSm: string;
  alt: string;
  label: string;
  position: string;
  scale?: number;
  origin?: string;
  flip?: boolean;
};

const dir = "/images/logistics-intro";

export const introSlides: IntroSlide[] = [
  {
    src: `${dir}/slide-01.jpg`,
    srcSm: `${dir}/slide-01-sm.jpg`,
    alt: "Two warehouse workers walking down a tall racking aisle, one carrying a carton, the other holding a tablet",
    label: "Warehousing & Distribution",
    position: "0% 45%",
    scale: 1.25,
    origin: "0% 45%",
  },
  {
    src: `${dir}/slide-02.jpg`,
    srcSm: `${dir}/slide-02-sm.jpg`,
    alt: "Cargo aircraft on approach against a sunset sky",
    label: "Air Cargo",
    position: "60% 50%",
    scale: 1.18,
    origin: "100% 50%",
  },
  {
    src: `${dir}/slide-03.jpg`,
    srcSm: `${dir}/slide-03-sm.jpg`,
    alt: "Large container ship loaded with containers sailing at golden hour",
    label: "Ocean Freight",
    position: "50% 50%",
    flip: true,
  },
  {
    src: `${dir}/slide-04.jpg`,
    srcSm: `${dir}/slide-04-sm.jpg`,
    alt: "Aerial view of a busy container terminal with stacked containers and trucks queuing",
    label: "Container Terminals",
    position: "55% 50%",
    scale: 1.08,
    origin: "70% 50%",
  },
  {
    src: `${dir}/slide-05.jpg`,
    srcSm: `${dir}/slide-05-sm.jpg`,
    alt: "Courier handing a parcel bag to a customer at the back of a delivery van",
    label: "Reliable Delivery",
    position: "100% 20%",
    scale: 1.1,
    origin: "100% 20%",
  },
];
