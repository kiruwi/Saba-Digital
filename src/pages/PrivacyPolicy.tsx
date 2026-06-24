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

const FooterNote = styled.footer`
  margin-top: 24px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors?.border ?? 'rgba(0,0,0,0.1)'};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors?.secondary ?? '#6c757d'};
`;

const LinkA = styled.a`
  color: ${({ theme }) => theme.colors?.accent ?? '#007e41'};
`;

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy policy for Saba Digital and iankcheruiyot.work."
        canonical="https://iankcheruiyot.work/privacy"
      />
      <PageWrap>
        <Container>
          <BackRow>
            <BackButton onClick={() => navigate(-1)} aria-label="Go back">
              ← Back
            </BackButton>
          </BackRow>

        <Title>Privacy Policy for iankcheruiyot.work</Title>

        <Subtitle>1. What information we collect</Subtitle>
        <P><strong>Log data:</strong> We automatically log your IP address, browser type, pages you visit, time and date, and duration on each page.</P>
        <P><strong>Enquiry form data:</strong> When you use the contact form, we collect your name, email address, phone number (if provided), and details about your request.</P>

        <Subtitle>2. How we use and share your data</Subtitle>
        <P>We share your information with third parties only as needed to provide our services: hosting providers, IT support, payment processors, etc.</P>
        <P>We may disclose your data if required by law or to protect our legal rights.</P>

        <Subtitle>3. Ownership of information</Subtitle>
        <P>iankcheruiyot.work owns all data collected. We do not sell, rent, or share your data beyond what’s outlined here.</P>

        <Subtitle>4. Your choices and rights</Subtitle>
        <P>You can opt out of direct marketing or request restrictions on data use by contacting us.</P>
        <P>You have the right to:</P>
        <List>
          <li>Access the personal data we hold.</li>
          <li>Request a copy in a readable format (like PDF).</li>
          <li>Correct any inaccuracies.</li>
          <li>Erase your data.</li>
          <li>Request data transfer to another party.</li>
          <li>Be notified of any data breach, if applicable.</li>
        </List>

        <Subtitle>5. Consent</Subtitle>
        <P>By using the site, you consent to data collection, storage, use, and disclosure as stated here. If you're under 18, you must have permission from a parent or guardian to use the site and provide personal data.</P>

        <Subtitle>6. Complaints</Subtitle>
        <P>
          Contact us at
          {' '}<LinkA href="mailto:iankcheruiyot@gmail.com">iankcheruiyot@gmail.com</LinkA>{' '}
          with any privacy concerns or complaints. We’ll review and reply in writing with next steps.
        </P>

          <FooterNote>© 2025 iankcheruiyot.work, All rights reserved.</FooterNote>
        </Container>
      </PageWrap>
    </>
  );
};

export default PrivacyPolicy;
