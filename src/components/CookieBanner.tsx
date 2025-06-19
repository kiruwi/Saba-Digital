// src/components/CookieBanner.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Key used in localStorage to remember the visitor's choice
const CONSENT_KEY = 'cookie_consent';

// Dynamically load the Clarity script tag
function injectClarity() {
  if (document.getElementById('clarity-script')) return;

  const projectId = process.env.REACT_APP_CLARITY_PROJECT_ID || 's20bk117ff'; // fallback to hard-coded ID

  // Create wrapper to mimic window.clarity queue until script loads
  (window as any).clarity = (window as any).clarity || function () {
    ((window as any).clarity.q = (window as any).clarity.q || []).push(arguments);
  };

  const t = document.createElement('script');
  t.id = 'clarity-script';
  t.async = true;
  t.src = `https://www.clarity.ms/tag/${projectId}`;
  const y = document.getElementsByTagName('script')[0];
  y.parentNode?.insertBefore(t, y);
}

// Styled banner components
const Banner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #0e1322;
  color: #fff;
  padding: 12px 16px;
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  z-index: 9999;
`;

const Message = styled.span`
  flex: 1 1 auto;
  margin-right: 12px;
`;

const Button = styled.button<{ $secondary?: boolean }>`
  background: ${({ $secondary }) => ($secondary ? '#6c757d' : '#00cf95')};
  color: #fff;
  border: none;
  padding: 6px 14px;
  margin-left: 8px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 0;
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
        This website uses cookies to enhance your experience.“Accept”.
      </Message>
      <Button onClick={handleDecline} $secondary>
        Decline
      </Button>
      <Button onClick={handleAccept}>Accept</Button>
    </Banner>
  );
};

export default CookieBanner;
