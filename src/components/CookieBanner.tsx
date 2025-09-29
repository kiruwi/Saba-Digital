// src/components/CookieBanner.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CONSENT_KEY = "cookie_consent";
const CLARITY_ID = "s22e2bgovv";
const CLARITY_SRC = `https://www.clarity.ms/tag/${CLARITY_ID}`;

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.async = true;
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load script"));
    document.head.appendChild(s);
  });
}

async function initClarity(consented: boolean) {
  // MS Clarity bootstrap (minimal)
  (window as any).clarity =
    (window as any).clarity ||
    function (...args: any[]) {
      ((window as any).clarity.q = (window as any).clarity.q || []).push(args);
    };

  await loadScript(CLARITY_SRC);
  const c = (window as any).clarity as (...a: any[]) => void;
  if (consented) c("consent");
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
  background: ${({ $secondary }) => ($secondary ? "rgba(0,0,0,0.05)" : "#00cf95")};
  color: ${({ $secondary }) => ($secondary ? "#6c757d" : "#fff")};
`;

const CookieBanner: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Guard for SSR
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      initClarity(true).catch(() => {});
      return;
    }
    if (!stored) setShow(true);
  }, []);

  const accept = async () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setShow(false);
    initClarity(true).catch(() => {});
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
