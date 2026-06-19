export function SampleWorkPreview() {
  return (
    <div
      aria-label="Sample website work preview"
      className="sample-preview relative mt-11 h-[280px] w-full max-w-5xl sm:h-[330px] lg:h-[380px]"
    >
      <div className="sample-side-card absolute left-[1%] top-16 z-0 hidden h-40 w-[24%] overflow-hidden rounded-2xl bg-white sm:block">
        <div className="sample-side-card-inner sample-plain-white h-full" />
      </div>

      <div className="sample-side-card absolute left-[13%] top-8 z-10 hidden h-48 w-[28%] overflow-hidden rounded-2xl bg-white md:block">
        <div className="sample-side-card-inner sample-plain-white h-full" />
      </div>

      <div className="sample-main-card absolute left-1/2 top-0 z-30 h-[205px] w-[72%] max-w-[540px] -translate-x-1/2 overflow-hidden rounded-[1.4rem] bg-white sm:h-[250px] lg:h-[286px]">
        <div className="sample-plain-main h-full" />
      </div>

      <div className="sample-side-card absolute right-[11%] top-10 z-10 hidden h-48 w-[23%] overflow-hidden rounded-2xl bg-white md:block">
        <div className="sample-side-card-inner sample-plain-white h-full" />
      </div>

      <div className="sample-side-card absolute right-[1%] top-16 z-0 hidden h-40 w-[20%] overflow-hidden rounded-2xl bg-white sm:block">
        <div className="sample-plain-white h-full" />
      </div>
    </div>
  );
}
