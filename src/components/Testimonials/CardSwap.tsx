import React, {
  Children,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import gsap from 'gsap';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, className, style, children, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`rounded-2xl [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${
      customClass ?? ''
    } ${className ?? ''}`.trim()}
    style={style}
  >
    {children}
  </div>
));
Card.displayName = 'Card';

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children,
}) => {
  const childArr = useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children],
  );
  
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const orderRef = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize card positions and start animation
  useEffect(() => {
    // Wait for refs to be populated
    const initTimer = setTimeout(() => {
      if (refs.current.length === 0 || refs.current.every(r => r === null)) {
        return;
      }
      
      const total = refs.current.length;
      
      // Set initial positions for all cards
      refs.current.forEach((card, i) => {
        if (card) {
          gsap.set(card, {
            x: i * cardDistance,
            y: -i * verticalDistance,
            z: -i * 80,
            xPercent: -50,
            yPercent: -50,
            skewY: skewAmount,
            rotationY: -8,
            transformOrigin: 'center center',
            zIndex: total - i,
            opacity: 1,
            visibility: 'visible',
            force3D: true,
          });
        }
      });
      
      // Start the animation
      const config = easing === 'elastic'
        ? {
            ease: 'elastic.out(0.6,0.9)',
            durDrop: 2,
            durMove: 2,
            durReturn: 2,
          }
        : {
            ease: 'power1.inOut',
            durDrop: 0.8,
            durMove: 0.8,
            durReturn: 0.8,
          };

      const swap = () => {
        const order = orderRef.current;
        if (order.length < 2) {
          return;
        }

        const [front, ...rest] = order;
        const frontCard = refs.current[front];
        if (!frontCard) {
          return;
        }

        const tl = gsap.timeline();
        tlRef.current = tl;

        // Move front card down
        tl.to(frontCard, {
          y: '+=500',
          duration: config.durDrop,
          ease: config.ease,
        });

        // Move other cards forward
        tl.addLabel('promote', `-=${config.durDrop * 0.8}`);
        
        rest.forEach((idx, i) => {
          const card = refs.current[idx];
          if (!card) return;
          
          tl.set(card, { zIndex: refs.current.length - i }, 'promote');
          tl.to(
            card,
            {
              x: i * cardDistance,
              y: -i * verticalDistance,
              z: -i * 80,
              duration: config.durMove,
              ease: config.ease,
            },
            `promote+=${i * 0.1}`,
          );
        });

        // Move front card to back
        const backPosition = refs.current.length - 1;
        tl.addLabel('return', `promote+=${config.durMove * 0.2}`);
        tl.set(frontCard, { zIndex: 0 }, 'return');
        tl.to(
          frontCard,
          {
            x: backPosition * cardDistance,
            y: -backPosition * verticalDistance,
            z: -backPosition * 80,
            duration: config.durReturn,
            ease: config.ease,
          },
          'return',
        );

        tl.call(() => {
          orderRef.current = [...rest, front];
        });
      };

      // Start animation after a delay
      setTimeout(() => {
        swap();
        intervalRef.current = window.setInterval(swap, delay);
      }, 1000);

      // Pause on hover logic
      if (pauseOnHover && containerRef.current) {
        const container = containerRef.current;
        
        const handleMouseEnter = () => {
          tlRef.current?.pause();
          clearInterval(intervalRef.current);
        };
        
        const handleMouseLeave = () => {
          tlRef.current?.play();
          intervalRef.current = window.setInterval(swap, delay);
        };
        
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
          clearTimeout(initTimer);
          clearInterval(intervalRef.current);
          container.removeEventListener('mouseenter', handleMouseEnter);
          container.removeEventListener('mouseleave', handleMouseLeave);
        };
      }

      return () => {
        clearTimeout(initTimer);
        clearInterval(intervalRef.current);
      };
    }, 200);
    
    return () => clearTimeout(initTimer);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, childArr.length, containerRef]);

  const rendered = childArr.map((child, i) => {
    if (isValidElement(child)) {
      // We need to wrap the Card in a div to attach the ref
      return (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          style={{ 
            width, 
            height, 
            position: 'absolute',
            top: '50%',
            left: '50%'
          }}
          onClick={(e) => {
            onCardClick?.(i);
          }}
        >
          {child}
        </div>
      );
    }
    return child;
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      style={{ 
        width, 
        height, 
        perspective: '1200px',
        transformStyle: 'preserve-3d'
      }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;


