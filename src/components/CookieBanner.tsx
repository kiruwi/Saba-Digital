// src/components/CookieBanner.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Key used in localStorage to remember the visitor's choice
const CONSENT_KEY = 'cookie_consent';

// Dynamically load the Clarity script tag
function injectClarity() {
  if ((window as any).clarity) return;

  (function (c: any, l: any, a: string, r: string, i: string) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = 'https://www.clarity.ms/tag/' + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode!.insertBefore(t, y);
  })(window, document, 'clarity', 'script', 's22e2bgovv');
}

// Styled banner components
const Banner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: none;
  background: #ffffff;
  color: ${({ theme }) => theme.colors?.text ?? '#121212'};
  padding: 16px;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 9999;
  flex-direction: row;
  border-radius: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 12px;
  }
`;

const Message = styled.span`
  flex: 1 1 auto;
  margin-right: 12px;
  color: ${({ theme }) => theme.colors?.secondary ?? '#6c757d'};
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-left: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-left: 0;
    margin-top: 12px;
  }
`;

const Button = styled.button<{ $secondary?: boolean }>`
  background: ${({ $secondary, theme }) => ($secondary ? 'rgba(0,0,0,0.05)' : (theme.colors?.primary ?? '#00cf95'))};
  color: ${({ $secondary, theme }) => ($secondary ? (theme.colors?.secondary ?? '#6c757d') : '#ffffff')};
  border: none;
  padding: 6px 14px;
  margin-left: 8px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 0;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted') {
      injectClarity();
    } else if (!stored) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    injectClarity();
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  };

  return (
    <Banner>
      <Message>
        By continuing to browse iancheruiyot.work you consent to our use of cookies and similar technologies to improve your experience, analyze site traffic, and tailor content. For more information, please review our Privacy Policy.
      </Message>
      <ButtonsWrapper>
        <Button onClick={handleAccept}>Accept</Button>
        <Button onClick={handleDecline} $secondary>Reject</Button>
      </ButtonsWrapper>
     </Banner>
  );
};

export default CookieBanner;
