import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { FiPause, FiPlay } from 'react-icons/fi';
import { portfolioItems } from '../ProjectCard/PortfolioGrid';
import { afterPageLoad } from '../../utils/afterPageLoad';
import { getProjectPreview } from '../../data/projectPreviews';

const Preview = styled.div`
  position: absolute; right: 0; top: 0; width: 52%; height: 100%;
  perspective: 1100px;
  @media (max-width: 700px) {
    position: relative; right: auto; width: 100%; height: 340px; margin-top: 1rem; order: 3;
  }
`;
const Window = styled.div`
  position: absolute; inset: 0; overflow: hidden;
  mask-image: linear-gradient(to bottom, transparent, #000 14%, #000 83%, transparent);
  &::after {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background: linear-gradient(to right, #fff 0%, rgba(255,255,255,.8) 12%, transparent 44%);
  }
  @media (max-width: 700px) { &::after { display: none; } }
`;
const Plane = styled.div`
  width: 100%; height: 100%; transform: perspective(1100px) rotateX(16deg) rotateY(-24deg) rotateZ(12deg);
  transform-origin: 65% 50%;
  @media (max-width: 700px) { width: 88%; margin: auto; transform: perspective(900px) rotateX(12deg) rotateY(-18deg) rotateZ(9deg); }
`;
const Track = styled.div`will-change: transform;`;
const Group = styled.div`
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; padding-bottom: 16px;
`;
const Tile = styled.div`
  aspect-ratio: 4 / 3; overflow: hidden; border-radius: 0; background: #f5f6f3;
  box-shadow: 0 8px 24px rgba(22,25,22,.1);
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`;
const Toggle = styled.button`
  position: absolute; right: 2.5rem; bottom: 1rem; z-index: 3;
  width: 36px; height: 36px; border: 0; border-radius: 0; cursor: pointer;
  background: #fff; color: #161916; box-shadow: 0 2px 12px rgba(0,0,0,.1);
  display: grid; place-items: center;
  @media (prefers-reduced-motion: reduce) { display: none; }
  @media (max-width: 700px) { right: 0; bottom: 0; }
`;

// Two identical groups make the downward loop seamless at every viewport size.
const images = portfolioItems.filter(item => item.id !== 'motion');
const ProjectStream = () => {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const visible = useRef(true);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [imageCount, setImageCount] = useState(4);
  const loadedImages = useRef(new Set<string>());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let nextRow: number | undefined;
    const cancel = afterPageLoad(() => {
      setImageCount(6);
      nextRow = window.setTimeout(() => setImageCount(images.length), 500);
    });
    return () => { cancel(); window.clearTimeout(nextRow); };
  }, []);

  const imageReady = (id: string) => {
    loadedImages.current.add(id);
    if (loadedImages.current.size === images.length) setReady(true);
  };

  useEffect(() => {
    if (!ready) return;
    const media = gsap.matchMedia();
    // Let async image decoding happen naturally, then start once every row has loaded.
    media.add('(prefers-reduced-motion: no-preference)', () => {
      tween.current = gsap.fromTo(track.current, { yPercent: -50 }, {
        yPercent: 0, duration: 42, ease: 'none', repeat: -1,
        paused: pausedRef.current || !visible.current,
      });
      return () => { tween.current = null; };
    }, root);
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      tween.current?.paused(!entry.isIntersecting || pausedRef.current);
    });
    if (root.current) observer.observe(root.current);
    const handleVisibility = () => tween.current?.paused(document.hidden || !visible.current || pausedRef.current);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      observer.disconnect(); media.revert();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [ready]);

  const toggle = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    tween.current?.paused(pausedRef.current || !visible.current);
  };

  return <Preview ref={root}>
    <Window aria-hidden="true"><Plane><Track ref={track}>
      {[0, 1].map(copy => <Group key={copy}>
        {images.map((item, index) => <Tile key={item.id}>
          {index < imageCount && <img {...getProjectPreview(item.id, item.image)} sizes="(max-width: 700px) 40vw, (max-width: 1250px) 26vw, 325px" alt="" decoding="async" width={400} height={300} fetchPriority="low" onLoad={() => imageReady(item.id)} onError={() => imageReady(item.id)} />}
        </Tile>)}
      </Group>)}
    </Track></Plane></Window>
    <Toggle onClick={toggle} aria-label={paused ? 'Play project animation' : 'Pause project animation'}>
      {paused ? <FiPlay aria-hidden="true" /> : <FiPause aria-hidden="true" />}
    </Toggle>
  </Preview>;
};
export default ProjectStream;
