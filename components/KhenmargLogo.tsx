import Image from "next/image";

export default function KhenmargLogo() {
  return (
    <>
      <Image src="/logos/khenmarg-mark.png" alt="" width={130} height={135} className="logo-img h-[38px] w-auto object-contain md:h-[42px]" priority />
      <div className="flex flex-col justify-center gap-[3px]">
        <Image
          src="/logos/khenmarg-title.png"
          alt="Khen Marg"
          width={719}
          height={64}
          className="logo-img h-[16px] w-auto object-contain object-left md:h-[19px]"
          priority
        />
        <span className="whitespace-nowrap font-sans text-[11px] font-medium leading-none tracking-[0.03em] text-slate-700 md:text-xs">
          We pave the way for your cargo…
        </span>
      </div>
    </>
  );
}
