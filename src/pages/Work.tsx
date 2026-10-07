import React, { useState } from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';
import PortfolioGrid, { portfolioItems, categoryLabels, PortfolioCategory } from '../components/ProjectCard/PortfolioGrid';
import Footer from '../components/Footer/Footer';

const Main = styled.main`
  min-height: 70vh;
`;
const Header = styled.header`
  max-width: 1250px; margin: auto; padding: 3rem 1.5rem 1.5rem;
  h1 { font-size: clamp(3rem, 6vw, 5rem); letter-spacing: -.04em; }
  > p { max-width: 38rem; font-size: 1.2rem; margin: 1rem 0 2rem; }
`;
const Projects = styled.section`
  background: ${({ theme }) => theme.theme === 'light' ? '#f5f6f3' : theme.colors.background};
  padding: 3rem 1.5rem 4rem;
  > div { max-width: 1202px; margin: auto; }
`;
const Filters = styled.div`
  display: flex; flex-wrap: wrap; gap: .65rem; margin-bottom: 1.5rem;
`;
const Filter = styled.button`
  min-height: 44px; padding: .65rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border}; border-radius: 0;
  background: transparent; color: ${({ theme }) => theme.colors.text}; cursor: pointer;
  &[aria-pressed='true'] { background: #161916; color: #ffffff; border-color: transparent; }
  &:hover { border-color: ${({ theme }) => theme.colors.primary}; }
`;
const Count = styled.p`font-size: .85rem; margin-bottom: 1.5rem;`;
const Work = () => {
  const [category, setCategory] = useState<PortfolioCategory | 'all'>('all');
  const items = category === 'all' ? portfolioItems : portfolioItems.filter(item => item.category === category);
  return <>
    <SEO title="Work | Saba Digital Portfolio" description="Explore Ian Cheruiyot’s branding, UX/UI, web development, ad design, and motion graphics work." canonical="https://iankcheruiyot.work/work" />
    <Main>
      <Header>
      <h1>Work that speaks.</h1>
      <p>A selection of brands, digital products, and websites I’ve designed and built.</p>
      <Filters role="group" aria-label="Filter work by discipline">
        <Filter aria-pressed={category === 'all'} onClick={() => setCategory('all')}>All work</Filter>
        {(Object.keys(categoryLabels) as PortfolioCategory[]).map(key => <Filter key={key} aria-pressed={category === key} onClick={() => setCategory(key)}>{categoryLabels[key]}</Filter>)}
      </Filters>
      <Count role="status">{items.length} {items.length === 1 ? 'project or collection' : 'projects and collections'}</Count>
      </Header>
      <Projects aria-label="Portfolio projects"><div><PortfolioGrid items={items} /></div></Projects>
    </Main>
    <Footer offWhite={false} />
  </>;
};
export default Work;
