// src/components/CookieBanner.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Clarity from "@microsoft/clarity";

const CONSENT_KEY = "cookie_consent";
const CLARITY_ID = "s22e2bgovv";
let clarityInitialized = false;

function initClarity(consented: boolean) {
  try {
    // Check if Clarity is available
    if (typeof Clarity === 'undefined') {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('Microsoft Clarity is not available');
      }
      return;
    }

    // Prevent multiple initializations
    if (!clarityInitialized) {
      // Initialize Microsoft Clarity with project ID
      Clarity.init(CLARITY_ID);
      clarityInitialized = true;
      
      // Log initialization in development
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('Microsoft Clarity initialized with ID:', CLARITY_ID);
      }
    }

    if (consented) {
      // Grant consent for data collection
      Clarity.consent();
      
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('Microsoft Clarity consent granted');
      }
    }
  } catch (error) {
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Clarity initialization failed:', error);
    }
  }
}

const Banner = styled.div`
  position: fixed; inset-inline: 0; bottom: 0;
  display: flex; align-items: center; gap: 12px;
  padding: 12px 16px; background: #fff; color: #121212;
  border-top: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 -4px 12px rgba(0,0,0,0.08);
  z-index: 9999;
  @media (max-width: 768px) { flex-direction: column; align-items: stretch; }
`;

const Msg = styled.span`
  flex: 1 1 auto; color: #6c757d;
`;

const Actions = styled.div`
  display: flex; gap: 8px;
  @media (max-width: 768px) { width: 100%; flex-direction: column; }
`;

const Btn = styled.button<{ $secondary?: boolean }>`
  padding: 6px 14px; font-size: 14px; border: 0; cursor: pointer;
  border-radius: 6px;
  background: ${({ $secondary, theme }) => ($secondary ? "rgba(0,0,0,0.05)" : theme.colors.primary)};
  color: ${({ $secondary }) => ($secondary ? "#6c757d" : "#fff")};
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 0.9;
  }
`;

const CookieBanner: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Guard for SSR
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      initClarity(true);
      return;
    }
    if (!stored) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setShow(false);
    initClarity(true);
  };

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setShow(false);
    // No script injection on decline
  };

  if (!show) return null;

  return (
    <Banner role="dialog" aria-label="Cookie consent">
      <Msg>
        By continuing to browse iancheruiyot.work you consent to cookies and similar
        technologies for experience and analytics. Read our{" "}
        <Link to="/privacy">Privacy Policy</Link> and{" "}
        <Link to="/cookies">Cookie Policy</Link>.
      </Msg>
      <Actions>
        <Btn onClick={accept}>Accept</Btn>
        <Btn $secondary onClick={reject}>Reject</Btn>
      </Actions>
    </Banner>
  );
};

export default CookieBanner;
