// src/components/CookieBanner.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Clarity from '@microsoft/clarity';

// Key used in localStorage to remember the visitor's choice
const CONSENT_KEY = 'cookie_consent';

// Fire up Clarity only after consent
function enableClarity() {
  try {
    Clarity.consent(true);
    const id = process.env.REACT_APP_CLARITY_PROJECT_ID;
    if (id) Clarity.init(id);
  } catch {
    /* ignore */
  }
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
      enableClarity();
    } else if (!stored) {
      setVisible(true);
    } else if (stored === 'declined') {
      Clarity.consent(false);
    }
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    enableClarity();
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    Clarity.consent(false);
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
