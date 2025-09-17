import React, { memo, useMemo } from 'react';
import { CardsColumn, Container, Layout, Section, TextColumn } from './TestimonialsElements';
import CardSwap, { Card } from './CardSwap';

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company?: string;
  rating?: number; // 1�5
};

// Temporary seeded data; replace with Google Reviews payload when integrated
const DEMO_TESTIMONIALS: Testimonial[] = [
  {
    quote:
    'Outstandingly remarkable! I would recommend him for his exceptional creativity and attention to detail. His professionalism, reliability, and ability to translate ideas into impactful results make him a valuable partner to work with.',
    name: 'Taita Ngetich' ,
    title: 'C.E.O, Synnefa.',
    rating: 5,
  },
  {
    quote:
    'Fast, collaborative, and precise. He delivered an excellent website for Makvo and consistently demonstrates strong design skills that align with client needs.',
    name: 'Mark Biegon' ,
    title: 'C.E.O, Makvo LTD',
    rating: 5,
  },
  {
    quote:
    'Great communication and design thinking throughout. He delivered an experience that is accessible, fast, and aligned with our brand vision.',
    name: 'Ken Biegon' ,
    title: 'C.E.O, Mutai Enterprises LTD',
    rating: 5,
  },
];

const FULL_STAR = '\u2605';
const EMPTY_STAR = '\u2606';

const StarRow: React.FC<{ rating: number }> = memo(({ rating }) => {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="mb-4 flex items-center gap-1 text-yellow-400" aria-label={`Rating: ${full} out of 5`}>
      {[0, 1, 2, 3, 4].map((idx) => (
        <span key={idx} className="text-lg leading-none">
          {idx < full ? FULL_STAR : EMPTY_STAR}
        </span>
      ))}
    </div>
  );
});
StarRow.displayName = 'StarRow';

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

// Color schemes that complement dark blue background
const cardColors = [
  { border: '#ff8c42', bg: '#251208' }, // Warm amber - complementary to blue
  { border: '#4ecdc4', bg: '#0a1918' }, // Teal - analogous harmony
  { border: '#f4a261', bg: '#1f1308' }, // Soft gold - warm accent
];

const ReviewCard: React.FC<{ data: Testimonial; index: number }> = memo(({ data, index }) => {
  const colorScheme = cardColors[index % cardColors.length];
  
  return (
    <Card
      className="overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02]"
      style={{ 
        background: colorScheme.bg,
        border: `2px solid ${colorScheme.border}`,
        width: '100%',
        height: '100%',
        borderRadius: '20px',
        position: 'relative'
      }}>
    <div className="flex h-full flex-col justify-between p-16 text-center text-white">
      <div className="space-y-4 px-4">
        {typeof data.rating === 'number' && (
          <div className="flex justify-center">
            <StarRow rating={data.rating} />
          </div>
        )}
        <p className="text-lg leading-relaxed" itemProp="reviewBody">
          {data.quote}
        </p>
      </div>
      <div className="mt-8 flex items-center justify-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-base font-semibold uppercase tracking-wide">
          {getInitials(data.name)}
        </div>
        <div className="flex flex-col text-sm text-white/70">
          <span className="text-base font-semibold text-white" itemProp="author">
            {data.name}
          </span>
          <span>
            {data.title}
            {data.company ? ` - ${data.company}` : ''}
          </span>
        </div>
      </div>
      <meta itemProp="itemReviewed" content="Saba Digital" />
    </div>
  </Card>
  );
});
ReviewCard.displayName = 'ReviewCard';

const Testimonials: React.FC<{ items?: Testimonial[] }> = ({ items = DEMO_TESTIMONIALS }) => {
  const { ratedCount, avgRating } = useMemo(() => {
    const rated = items.filter((i): i is Testimonial & { rating: number } => typeof i.rating === 'number');
    if (!rated.length) return { ratedCount: 0, avgRating: null as number | null };
    const sum = rated.reduce((acc, i) => acc + i.rating, 0);
    return { ratedCount: rated.length, avgRating: Math.round((sum / rated.length) * 10) / 10 };
  }, [items]);

  return (
    <Section aria-label="Testimonials">
      <Container>
        <Layout>
          <TextColumn>
            <span className="eyebrow">What clients say</span>
            <h2>Results backed by customer stories</h2>
            
            {avgRating !== null && (
              <div className="mt-6 flex items-center gap-4 max-[900px]:justify-center">
                <div className="flex items-baseline gap-2">
                  <span className="text-emerald-400 text-4xl font-semibold">
                    {avgRating.toFixed(1)}
                  </span>
                  <span className="text-slate-300 text-sm">out of 5</span>
                </div>
                <div className="text-slate-300 text-sm">
                  Based on {ratedCount} Google review{ratedCount === 1 ? '' : 's'}
                </div>
              </div>
            )}
          </TextColumn>
          <CardsColumn>
            <CardSwap width={460} height={340} cardDistance={60} verticalDistance={70} delay={5000} skewAmount={6} pauseOnHover={true}>
              {items.map((t, idx) => (
                <ReviewCard key={idx} data={t} index={idx} />
              ))}
            </CardSwap>
          </CardsColumn>
        </Layout>
      </Container>
    </Section>
  );
};

export default Testimonials;
