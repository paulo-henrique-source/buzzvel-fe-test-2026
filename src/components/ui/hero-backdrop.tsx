export function HeroBackdrop() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-6 -right-[18px] bottom-[14px] left-7 -z-2 rounded-[20px] bg-peach lg:-right-10 lg:bottom-7"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[14px] -left-[18px] -z-1 size-16 rounded-[50%] bg-lavender lg:bottom-2.5 lg:-left-[46px] lg:size-24"
      />
    </>
  );
}
