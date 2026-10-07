import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { allProjects, ProjectType } from '../../data/projects';
import adImage from '../../images/addesign/bright-squad-cleaners.webp';
import { getProjectPreview } from '../../data/projectPreviews';

export type PortfolioCategory = 'graphics' | 'uxui' | 'webdev' | 'ads' | 'motion';
export const categoryLabels: Record<PortfolioCategory, string> = {
  graphics: 'Branding', uxui: 'UX/UI Design', webdev: 'Web Development', ads: 'Ad Design', motion: 'Motion Graphics',
};
const categoryPaths = { graphics: 'graphics', uxui: 'ux-ui', webdev: 'web-dev' };
export type PortfolioItem = { id: string; title: string; description: string; image: string; category: PortfolioCategory; path: string; collection?: boolean };
const fromProject = (project: ProjectType): PortfolioItem => ({
  id: project.id, title: project.title, description: project.shortDescription, image: project.image,
  category: project.category, path: `/work/${categoryPaths[project.category]}/${project.id}`,
});
export const portfolioItems: PortfolioItem[] = [
  ...allProjects.map(fromProject),
  { id: 'ad-design', title: 'Campaign creatives', description: 'A collection of visual campaigns for social, print, and digital channels.', image: adImage, category: 'ads', path: '/work/ad-design', collection: true },
  { id: 'motion', title: 'Brands in motion', description: 'Logo animations and posters brought to life through motion.', image: '/assets/projects/3d-graphics/synnefa-images/banner.webp', category: 'motion', path: '/work/motion', collection: true },
];
export const featuredItems = ['synnefa-rebrand', 'eve-on-safari', 'ufanisi-resort'].map(id => portfolioItems.find(item => item.id === id)!);

const Grid = styled.div<{ $featured: boolean }>`
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem;
  ${({ $featured }) => $featured && `
    grid-template-columns: repeat(2, minmax(0, 1fr));
    > a:first-child {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      align-items: center;
    }
    > a:first-child h3 { font-size: clamp(2rem, 4vw, 3rem); }
  `}
  @media (max-width: 1000px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 600px) { grid-template-columns: 1fr; > a:first-child { display: flex; grid-column: auto; } }
`;
const Card = styled(Link)`
  display: flex; flex-direction: column;
  padding-bottom: 1rem;
  overflow: hidden; text-decoration: none; color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.cardBackground};
  &:hover h3 { color: ${({ theme }) => theme.colors.primary}; }
  &:hover img { transform: scale(1.035); }
`;
const Image = styled.div`
  aspect-ratio: 4 / 3; overflow: hidden; border-radius: 4px; background: ${({ theme }) => theme.colors.border};
  img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform .3s ease; }
`;
const Copy = styled.div`
  padding: 1.5rem 1rem; flex: 1; display: flex; flex-direction: column;
  p { line-height: 1.6; margin: .75rem 0 1.25rem; font-size: .95rem; }
  h3 { font-size: 1.5rem; letter-spacing: -.02em; }
`;
const Category = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: .95rem; margin-top: .6rem;
`;
const Action = styled.span`
  display: flex; align-items: center; justify-content: space-between; margin-top: auto; font-weight: 600;
  svg { color: ${({ theme }) => theme.colors.primary}; font-size: 1.4rem; }
`;
const PortfolioGrid: React.FC<{ items: PortfolioItem[]; featured?: boolean }> = ({ items, featured = false }) => (
  <Grid $featured={featured}>
    {items.map((item, index) => <Card key={item.id} to={item.path}>
      <Image><img {...getProjectPreview(item.id, item.image)} sizes={featured
        ? `(max-width: 600px) calc(100vw - 3rem), (max-width: 1000px) calc((100vw - 4.5rem) / 2), ${index === 0 ? '720px' : '590px'}`
        : '(max-width: 600px) calc(100vw - 3rem), (max-width: 1000px) calc((100vw - 4.5rem) / 2), 384px'} alt={`${item.title} project preview`} loading="lazy" decoding="async" width={800} height={600} /></Image>
      <Copy>
        <h3>{item.title}</h3>
        <Category>{categoryLabels[item.category]}</Category><p>{item.description}</p>
        <Action>{item.collection ? 'View collection' : 'View case study'}<FiArrowUpRight aria-hidden="true" /></Action>
      </Copy>
    </Card>)}
  </Grid>
);
export default PortfolioGrid;
