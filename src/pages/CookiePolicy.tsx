import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const PageWrap = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 64px 16px;
  background: ${({ theme }) => theme.colors?.background ?? '#ffffff'};
  color: ${({ theme }) => theme.colors?.text ?? '#121212'};
`;

const Container = styled.article`
  width: 100%;
  max-width: 900px;
  background: ${({ theme }) => theme.colors?.cardBackground ?? '#fff'};
  color: ${({ theme }) => theme.colors?.text ?? '#121212'};
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  border: 1px solid ${({ theme }) => theme.colors?.border ?? 'rgba(0,0,0,0.1)'};
  border-radius: 16px;
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 12px;
  }
`;

const Title = styled.h1`
  margin: 0 0 16px 0;
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors?.headingText ?? '#000'};
`;

const Subtitle = styled.h2`
  margin: 24px 0 8px 0;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors?.headingText ?? '#000'};
`;

const P = styled.p`
  margin: 8px 0;
  line-height: 1.7;
`;

const List = styled.ul`
  margin: 8px 0 16px 20px;
  line-height: 1.7;
`;

const BackRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const BackButton = styled.button`
  appearance: none;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors?.primary ?? '#00cf95'};
  color: ${({ theme }) => theme.colors?.buttonText ?? '#fff'};
  padding: 8px 12px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease;
  &:hover { opacity: 0.95; }
  &:active { transform: translateY(1px); }
`;

const CookiePolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Cookie Policy"
        description="Cookie policy for Saba Digital and iancheruiyot.work."
        canonical="https://iancheruiyot.work/cookies"
      />
      <PageWrap>
        <Container>
          <BackRow>
            <BackButton onClick={() => navigate(-1)} aria-label="Go back">
              ← Back
            </BackButton>
          </BackRow>

        <Title>Cookie Policy for iancheruiyot.work</Title>
        <P>This Cookie Policy explains how iancheruiyot.work uses cookies and similar technologies.</P>

        <Subtitle>1. What are cookies?</Subtitle>
        <P>
          Cookies are small text files placed on your device when you visit a website. They help websites remember your actions and
          preferences. Some cookies are deleted when you close your browser (session cookies), while others remain until they expire or
          you delete them (persistent cookies).
        </P>

        <Subtitle>2. How we use cookies</Subtitle>
        <P>We use cookies to:</P>
        <List>
          <li>Keep the website running smoothly.</li>
          <li>Improve security and detect unusual activity.</li>
          <li>Analyse traffic and understand how visitors use the site.</li>
          <li>Store your cookie preferences.</li>
          <li>Support basic marketing and advertising.</li>
        </List>

        <Subtitle>3. Types of cookies we use</Subtitle>
        <List>
          <li><strong>Necessary</strong>, Essential for core site functions, like remembering consent choices.</li>
          <li><strong>Functional</strong>, Help improve security and performance of the site.</li>
          <li><strong>Analytics</strong>, Collect anonymous statistics to help us improve the site (e.g. Google Analytics, Microsoft Clarity).</li>
          <li><strong>Performance</strong>, Measure how well pages load and how users interact.</li>
          <li><strong>Advertising</strong>, Used by third-party services (e.g. Microsoft Advertising, Bing) to deliver relevant ads.</li>
        </List>

        <Subtitle>4. Managing cookies</Subtitle>
        <P>
          You can control cookies through your browser settings. You can block or delete cookies, but some parts of the site may not
          function properly if you do.
        </P>

        <Subtitle>5. Consent</Subtitle>
        <P>
          By using this website, you consent to the use of cookies as outlined in this policy. If you do not agree, you should adjust your
          browser settings or stop using the site.
        </P>

        <Subtitle>6. Updates</Subtitle>
        <P>
          We may update this Cookie Policy from time to time. Any changes will be posted on this page with the updated date.
        </P>
        </Container>
      </PageWrap>
    </>
  );
};

export default CookiePolicy;
