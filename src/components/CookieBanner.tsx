// src/components/CookieBanner.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

    // Add load event listener to know when script is ready
    t.onload = () => {
      console.log('Clarity script loaded successfully');
    };

    t.onerror = () => {
      console.error('Failed to load Clarity script');
    };

    const y = l.getElementsByTagName(r)[0];
    if (y && y.parentNode) {
      y.parentNode.insertBefore(t, y);
    } else if (l.head) {
      l.head.appendChild(t);
    } else {
      (l.documentElement || l.body).appendChild(t);
    }
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

const PolicyLink = styled(Link)`
  color: ${({ theme }) => theme.colors?.accent ?? '#007e41'};
  text-decoration: underline;
  &:hover { opacity: 0.9; }
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

      // Wait for Clarity to fully initialize before signaling consent
      const initClarity = () => {
        try {
          const c = (window as any).clarity;
          if (typeof c === 'function') {
            c('consent');
            c('event', 'pageview');
            console.log('Clarity: Auto-initialized with existing consent');
          } else {
            // Retry if clarity isn't ready yet
            setTimeout(initClarity, 100);
          }
        } catch (error) {
          console.warn('Clarity auto-initialization failed:', error);
        }
      };

      // Give the script time to load and initialize
      setTimeout(initClarity, 500);
    } else if (!stored) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    injectClarity();

    // Wait for Clarity to fully initialize before signaling consent
    const initClarity = () => {
      try {
        const c = (window as any).clarity;
        if (typeof c === 'function') {
          c('consent');
          c('event', 'pageview');
          console.log('Clarity: Consent granted and pageview tracked');
        } else {
          // Retry if clarity isn't ready yet
          setTimeout(initClarity, 100);
        }
      } catch (error) {
        console.warn('Clarity initialization failed:', error);
      }
    };

    // Give the script more time to load and initialize
    setTimeout(initClarity, 500);
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  };

  return (
    <Banner>
      <Message>
        By continuing to browse iancheruiyot.work you consent to our use of cookies and similar technologies to improve your experience, analyze site traffic, and tailor content. For more information, please review our <PolicyLink to="/privacy">Privacy Policy</PolicyLink> and <PolicyLink to="/cookies">Cookie Policy</PolicyLink>.
      </Message>
      <ButtonsWrapper>
        <Button onClick={handleAccept}>Accept</Button>
        <Button onClick={handleDecline} $secondary>Reject</Button>
      </ButtonsWrapper>
     </Banner>
  );
};

export default CookieBanner;
