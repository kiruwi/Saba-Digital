import React, { memo, useCallback, useMemo, useRef } from "react";

export type Review = {
  id: string;
  rating: number; // 1-5
  text: string;
  reviewerName: string;
  reviewerTitle?: string;
};

// Temporary seeded data; replace when integrating live reviews
const DEMO_REVIEWS: Review[] = [
  {
    id: "1",
    rating: 5,
    text: "Outstandingly remarkable! I would recommend him for exceptional creativity and attention to detail. Professional, reliable, and able to translate ideas into impactful results.",
    reviewerName: "Taita Ngetich",
    reviewerTitle: "C.E.O, Synnefa",
  },
  {
    id: "2",
    rating: 5,
    text: "Fast, collaborative, and precise. He delivered an excellent website for Makvo and consistently demonstrates strong design skills that align with client needs.",
    reviewerName: "Mark Biegon",
    reviewerTitle: "C.E.O, Makvo LTD",
  },
  {
    id: "3",
    rating: 5,
    text: "Great communication and design thinking throughout. He delivered an experience that is accessible, fast, and aligned with our brand vision.",
    reviewerName: "Ken Biegon",
    reviewerTitle: "C.E.O, Mutai Enterprises LTD",
  },
];

const Stars: React.FC<{ rating: number }> = memo(({ rating }) => {
  const clamped = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center justify-center gap-1 text-yellow-300" aria-label={`Rating: ${clamped} out of 5`}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <span key={idx} className={idx < clamped ? "text-lg leading-none" : "text-lg leading-none opacity-30"}>
          ?
        </span>
      ))}
    </div>
  );
});
Stars.displayName = "Stars";

const ReviewCard: React.FC<{ review: Review }> = memo(({ review }) => (
  <article className="flex h-full flex-col justify-between rounded-[1.5rem] bg-gradient-to-br from-white/15 via-white/5 to-transparent px-8 py-10 text-center text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-sm sm:px-10 sm:py-12">
    <div className="space-y-6">
      <div className="space-y-4">
        <Stars rating={review.rating} />
        <div className="mx-auto h-px w-12 bg-white/20" aria-hidden="true" />
      </div>
      <p className="text-lg leading-relaxed text-slate-100/90" itemProp="reviewBody">
        {review.text}
      </p>
    </div>
    <div className="pt-8">
      <div className="mx-auto mb-6 h-px w-16 bg-white/15" aria-hidden="true" />
      <div className="space-y-1 text-sm text-white/70">
        <span className="block text-base font-semibold text-white" itemProp="author">
          {review.reviewerName}
        </span>
        {review.reviewerTitle && <span className="block">{review.reviewerTitle}</span>}
      </div>
      <meta itemProp="itemReviewed" content="Saba Digital" />
    </div>
  </article>
));
ReviewCard.displayName = "ReviewCard";

const Testimonials: React.FC<{ items?: Review[] }> = ({ items = DEMO_REVIEWS }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByStep = useCallback((direction: 1 | -1, cardWidth?: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const style = getComputedStyle(container);
    const gap = parseFloat(style.getPropertyValue("column-gap") || style.getPropertyValue("gap") || "0");
    const fallbackWidth = container.querySelector<HTMLElement>('[data-card="true"]')?.offsetWidth ?? 0;
    const width = cardWidth ?? fallbackWidth;

    if (width <= 0) return;

    container.scrollBy({ left: direction * (width + gap), behavior: "smooth" });
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollByStep(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollByStep(-1);
      }
    },
    [scrollByStep],
  );

  const handleCardClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      scrollByStep(1, event.currentTarget.offsetWidth);
    },
    [scrollByStep],
  );

  const handleCardKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        scrollByStep(1, (event.currentTarget as HTMLDivElement).offsetWidth);
      }
    },
    [scrollByStep],
  );

  const { ratedCount, avgRating } = useMemo(() => {
    if (!items.length) return { ratedCount: 0, avgRating: null as number | null };
    const sum = items.reduce((acc, review) => acc + review.rating, 0);
    return { ratedCount: items.length, avgRating: Math.round((sum / items.length) * 10) / 10 };
  }, [items]);

  return (
    <section
      aria-label="Testimonials"
      className="relative w-full overflow-hidden border-t border-white/10 bg-[radial-gradient(circle_at_top_right,_rgb(6,56,106)_0%,_#032648_55%,_#032648_100%)] py-20 text-slate-100"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 text-center lg:grid-cols-3 lg:text-left xl:gap-16">
        <div className="mx-auto max-w-md space-y-6 lg:mx-0 lg:max-w-none">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/60">What clients say</span>
          <h2 className="text-3xl font-semibold leading-tight text-slate-50 sm:text-4xl">Results backed by customer stories</h2>

          {avgRating !== null && (
            <div className="flex flex-col items-center gap-2 text-slate-300 lg:items-start">
              <div className="flex items-baseline gap-2 text-emerald-200">
                <span className="text-4xl font-semibold text-emerald-400">{avgRating.toFixed(1)}</span>
                <span className="text-sm text-slate-300">out of 5</span>
              </div>
              <div className="text-sm text-slate-300">Based on {ratedCount} review{ratedCount === 1 ? "" : "s"}</div>
            </div>
          )}
        </div>
        <div className="relative lg:col-span-2">
          <div
            ref={scrollRef}
            className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 pb-4"
            tabIndex={0}
            role="list"
            aria-label="Client testimonials"
            onKeyDown={handleKeyDown}
          >
            {items.map((review) => (
              <div
                key={review.id}
                data-card="true"
                role="button"
                tabIndex={0}
                aria-label={`Testimonial from ${review.reviewerName}. Click to read the next slide.`}
                onClick={handleCardClick}
                onKeyDown={handleCardKeyDown}
                className="snap-center shrink-0 w-[min(80vw,22rem)] cursor-pointer overflow-hidden rounded-3xl border border-white/15 bg-slate-950/60 px-[1.5px] py-[1.5px] shadow-[0_25px_40px_-20px_rgba(2,18,35,0.8)] transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400 sm:w-[min(75vw,22rem)] md:w-[min(60vw,22rem)] lg:w-[22rem]"
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#032648] via-[#032648]/80 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#032648] via-[#032648]/80 to-transparent"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
