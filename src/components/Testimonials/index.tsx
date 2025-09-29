import React, { memo, useCallback, useMemo, useRef, useState, useEffect } from "react";

export type Review = {
  id: string;
  rating: number; // 1-5
  text: string;
  reviewerName: string;
  reviewerTitle?: string;
  reviewerImage?: string; // Optional profile image
};

// Testimonial data matching the screenshot design
const DEMO_REVIEWS: Review[] = [
  {
    id: "1",
    rating: 5,
    text: "He did a very good job on my website. The site is clean, well-structured, and works smoothly across devices. He paid attention to both the technical setup and the overall usability, which made the process straightforward for me. His design work is equally impressive. He has a good eye for detail and creates layouts that look professional and are easy to use. The designs are not only visually appealing but also practical and functional, which is exactly what I needed. What I liked most is that he was responsive to feedback and willing to adjust things until I was satisfied. The combination of strong web development skills and quality design makes him a reliable person to work with. I would recommend him to anyone looking for someone who can deliver a good website and also handle design tasks well.",
    reviewerName: "Mark Biegon",
    reviewerTitle: "Makvo | Mutai Enterprises",
  },
  {
    id: "2", 
    rating: 5,
    text: "Outstandingly remarkable! His work reflects exceptional creativity and strong attention to detail. Every part of the project felt carefully thought through, from the layout to the final touches. He doesn’t just complete the task; he adds value by bringing in ideas that improve the overall outcome. The creativity in his designs sets them apart, and the precision he applies makes the final product look professional and reliable. I would recommend him without hesitation to anyone looking for someone who delivers high-quality work with consistency and care.",
    reviewerName: "Taita Ngetich",
    reviewerTitle: "Synnefa",
  },
  {
    id: "3",
    rating: 5,
    text: "Ian did a great job designing our website. The site looks professional, functions smoothly, and communicates exactly what we wanted. He combined technical skills with design insight to create something that is both user-friendly and visually appealing. Beyond web design, Ian is a very good product designer. He has the ability to take an idea and turn it into something practical and polished. His designs show clear thinking, creativity, and attention to usability. Working with him was straightforward, and he always took time to refine details until the outcome was right. I would highly recommend him for website projects as well as product design work.",
    reviewerName: "John Maingi",
    reviewerTitle: "Global Pathways Advisory",
  },
];

const Stars: React.FC<{ rating: number }> = memo(({ rating }) => {
  const clamped = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-1" aria-label={`Rating: ${clamped} out of 5`}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <svg
          key={idx}
          className={`w-3 h-3 ${
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
  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-6 sm:p-8 bg-white rounded-lg shadow-sm">
    {/* Left side - Reviewer Info */}
    <div className="flex flex-col items-center min-w-[120px] sm:min-w-[150px]">
      {/* Profile Image Placeholder */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xl sm:text-2xl font-semibold mb-3">
        {review.reviewerImage ? (
          <img 
            src={review.reviewerImage} 
            alt={review.reviewerName} 
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          review.reviewerName.charAt(0).toUpperCase()
        )}
      </div>
      
      {/* Reviewer Name */}
      <h3 className="text-gray-900 font-semibold text-sm text-center mb-1">
        {review.reviewerName}
      </h3>
      
      {/* Company/Title */}
      <p className="text-gray-600 text-xs text-center mb-2">
        {review.reviewerTitle}
      </p>
      
      {/* Stars below name */}
      <Stars rating={review.rating} />
    </div>
    
    {/* Right side - Testimonial Text */}
    <div className="flex-1 relative">
      {/* Quote mark */}
      <div className="absolute -top-2 -left-2 text-green-500 opacity-20 text-5xl sm:text-6xl font-serif">
        "
      </div>
      
      {/* Testimonial text */}
      <p className="text-gray-700 leading-relaxed text-sm sm:text-base pl-4 sm:pl-6 pr-2 sm:pr-4 pt-3 sm:pt-4 relative z-10">
        {review.text}
      </p>
      
      {/* Closing quote mark */}
      <div className="absolute -bottom-4 sm:-bottom-6 right-2 text-green-500 opacity-20 text-5xl sm:text-6xl font-serif rotate-180">
        "
      </div>
    </div>
    
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
      className="relative w-full bg-gradient-to-tl from-sky-100/100 to-white/100 py-16"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-green-500 text-sm font-semibold uppercase tracking-wider mb-2">
            MY CLIENTS
          </p>
          <h2 className="text-3xl font-bold text-gray-900">
            Reviews
          </h2>
        </div>

        {/* Carousel Display - Single Review at a Time */}
        <div className="relative max-w-4xl mx-auto">
          <div
            ref={scrollRef}
            className="no-scrollbar flex gap-8 overflow-x-hidden scroll-smooth snap-x snap-mandatory"
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
                className="snap-center shrink-0 w-full"
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          {items.length > 1 && (
            <>
              <button
                onClick={() => scrollByStep(-1)}
                className={`absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-12 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all ${
                  activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
                }`}
                disabled={activeIndex === 0}
                aria-label="Previous testimonial"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => scrollByStep(1)}
                className={`absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-12 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all ${
                  activeIndex === items.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
                }`}
                disabled={activeIndex === items.length - 1}
                aria-label="Next testimonial"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
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
