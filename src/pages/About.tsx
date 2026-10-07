import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import SEO from '../components/SEO';
import Footer from '../components/Footer/Footer';
import { WorkLink } from '../components/HeroSection/HeroSection';

const Main = styled.main`
  max-width: 1250px;
  margin: 0 auto;
  padding: clamp(3rem, 6vw, 5rem) 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  align-items: center;
  gap: clamp(2rem, 6vw, 5rem);
  h1 { font-size: clamp(3rem, 6vw, 5.5rem); letter-spacing: -.035em; font-weight: 500; margin-bottom: 1.5rem; }
  h1 span { color: ${({ theme }) => theme.colors.primary}; font-family: inherit; }
  p { font-size: 1.1rem; line-height: 1.7; margin-bottom: 1.5rem; }
  @media (max-width: 700px) { grid-template-columns: 1fr; }
`;
const Portrait = styled.picture`
  display: block;
  width: 100%;
  max-width: 460px;
  justify-self: center;
  img { width: 100%; height: auto; display: block; }
  @media (max-width: 700px) { max-width: 300px; grid-row: 2; }
`;
const Actions = styled.div`
  display: flex; align-items: center; flex-wrap: wrap; gap: 1.5rem;
  > a:last-child { text-underline-offset: 5px; }
`;
const About = () => <>
  <Helmet>
    <link rel="preload" as="image" href="/images/optimized/portrait/ian-720.webp"
      imageSrcSet="/images/optimized/portrait/ian-480.webp 480w, /images/optimized/portrait/ian-720.webp 720w, /images/optimized/portrait/ian-960.webp 960w, /images/optimized/portrait/ian-1200.webp 1200w"
      imageSizes="(max-width: 700px) 300px, 460px" fetchPriority="high" />
  </Helmet>
  <SEO title="About Ian Cheruiyot | Saba Digital" description="Meet Ian Cheruiyot, a Nairobi-based designer working across branding, UX/UI design, and web development through Saba Digital." canonical="https://iankcheruiyot.work/about" />
  <Main>
    <Portrait>
      <source type="image/webp" srcSet="/images/optimized/portrait/ian-480.webp 480w, /images/optimized/portrait/ian-720.webp 720w, /images/optimized/portrait/ian-960.webp 960w, /images/optimized/portrait/ian-1200.webp 1200w" sizes="(max-width: 700px) 300px, 460px" />
      <img src="/images/optimized/portrait/ian-720.webp" alt="Ian Cheruiyot" width={1200} height={1200} fetchPriority="high" />
    </Portrait>
    <div>
      <h1>I’m Ian<span>.</span></h1>
      <p>I’m a Nairobi-based designer building brands, intuitive interfaces, and websites for growing businesses.</p>
      <p>Saba Digital is my independent design practice. I work across brand identity, UX/UI design, and web development to help businesses communicate clearly and create useful digital experiences.</p>
      <p>Have a brand to build, a product to improve, or a website in mind?</p>
      <Actions>
        <WorkLink to="/contact">Let’s talk <FiArrowUpRight aria-hidden="true" /></WorkLink>
        <Link to="/work">Explore my work ↗</Link>
      </Actions>
    </div>
  </Main>
  <Footer />
</>;
export default About;
