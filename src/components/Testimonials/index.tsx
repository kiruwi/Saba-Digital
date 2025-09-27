import React, { memo, useCallback, useMemo, useRef, useState, useEffect } from "react";

export type Review = {
  id: string;
  rating: number; // 1-5
  text: string;
  reviewerName: string;
  reviewerTitle?: string;
};

// Testimonial data matching the screenshot design
const DEMO_REVIEWS: Review[] = [
  {
    id: "1",
    rating: 5,
    text: "He did a very good website and he also does very good design work.",
    reviewerName: "Mark Biegon",
    reviewerTitle: "Makvo | Mutai Enterprises",
  },
  {
    id: "2", 
    rating: 5,
    text: "Outstandingly remarkable! I would recommend him due to his exceptional creativity and attention to detail.",
    reviewerName: "Taita Ngetich",
    reviewerTitle: "Synnefa",
  },
  {
    id: "3",
    rating: 5,
    text: "Ian, did a great Job designing our website and Is a very good product designer",
    reviewerName: "John Maingi",
    reviewerTitle: "Global Pathways Advisory",
  },
];

const Stars: React.FC<{ rating: number }> = memo(({ rating }) => {
  const clamped = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center justify-center gap-1 mb-4" aria-label={`Rating: ${clamped} out of 5`}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <svg
          key={idx}
          className={`w-4 h-4 ${
            idx < clamped 
              ? "text-yellow-400" 
              : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
});
Stars.displayName = "Stars";

const ReviewCard: React.FC<{ review: Review }> = memo(({ review }) => (
  <div className="text-center p-6 bg-white">
    <Stars rating={review.rating} />
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{review.reviewerTitle}</h3>
    <p className="text-gray-600 text-sm leading-relaxed mb-6 px-2">
      {review.text}
    </p>
    <p className="text-gray-900 font-semibold text-sm">{review.reviewerName}</p>
    <meta itemProp="itemReviewed" content="Saba Digital" />
  </div>
));
ReviewCard.displayName = "ReviewCard";

const Testimonials: React.FC<{ items?: Review[] }> = ({ items = DEMO_REVIEWS }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const style = getComputedStyle(container);
    const gap = parseFloat(style.getPropertyValue("column-gap") || style.getPropertyValue("gap") || "0");
    const cardWidth = container.querySelector<HTMLElement>('[data-card="true"]')?.offsetWidth ?? 0;

    if (cardWidth <= 0) return;

    const scrollLeft = index * (cardWidth + gap);
    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  const scrollByStep = useCallback((direction: 1 | -1, _cardWidth?: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const newIndex = Math.max(0, Math.min(items.length - 1, activeIndex + direction));
    scrollToIndex(newIndex);
    
    // Pause auto-play when user manually navigates
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000); // Resume after 8 seconds
  }, [activeIndex, items.length, scrollToIndex]);

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

  const _handleCardClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      scrollByStep(1, event.currentTarget.offsetWidth);
    },
    [scrollByStep],
  );

  const _handleCardKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        scrollByStep(1, (event.currentTarget as HTMLDivElement).offsetWidth);
      }
    },
    [scrollByStep],
  );

  const { ratedCount: _ratedCount, avgRating: _avgRating } = useMemo(() => {
    if (!items.length) return { ratedCount: 0, avgRating: null as number | null };
    const sum = items.reduce((acc, review) => acc + review.rating, 0);
    return { ratedCount: items.length, avgRating: Math.round((sum / items.length) * 10) / 10 };
  }, [items]);

  // Auto-play functionality
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    
    autoPlayRef.current = setTimeout(() => {
      if (isAutoPlaying) {
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        scrollToIndex(nextIndex);
      }
    }, 4000); // 4 seconds per slide
  }, [activeIndex, items.length, isAutoPlaying, scrollToIndex]);

  const pauseAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const _toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev);
  }, []);

  // Touch/swipe gesture handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && activeIndex < items.length - 1) {
      scrollByStep(1);
    } else if (isRightSwipe && activeIndex > 0) {
      scrollByStep(-1);
    }
  }, [touchStart, touchEnd, activeIndex, items.length, scrollByStep]);

  // Track scroll position to update active index
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const style = getComputedStyle(container);
      const gap = parseFloat(style.getPropertyValue("column-gap") || style.getPropertyValue("gap") || "0");
      const cardWidth = container.querySelector<HTMLElement>('[data-card="true"]')?.offsetWidth ?? 0;
      
      if (cardWidth <= 0) return;

      const scrollLeft = container.scrollLeft;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < items.length) {
        setActiveIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex, items.length]);

  // Auto-play effect
  useEffect(() => {
    if (isAutoPlaying && items.length > 1) {
      startAutoPlay();
    } else {
      pauseAutoPlay();
    }

    return () => pauseAutoPlay();
  }, [isAutoPlaying, activeIndex, items.length, startAutoPlay, pauseAutoPlay]);

  return (
    <section
      aria-label="Testimonials"
      className="relative w-full bg-gradient-to-tl from-blue-50/100 to-white/100 py-16"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-green-600 text-sm font-semibold uppercase tracking-wider mb-2">
            MY CLIENTS
          </p>
          <h2 className="text-3xl font-bold text-gray-900">
            Reviews
          </h2>
        </div>

        {/* Desktop: Three Column Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-8">
          {items.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden relative">
          <div
            ref={scrollRef}
            className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory"
            tabIndex={0}
            role="list"
            aria-label="Client testimonials"
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {items.map((review) => (
              <div
                key={review.id}
                data-card="true"
                className="snap-center shrink-0 w-[85vw]"
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-green-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
