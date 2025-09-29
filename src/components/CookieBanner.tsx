// src/components/CookieBanner.tsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CONSENT_KEY = "cookie_consent_v2";
const CLARITY_ID = "s22e2bgovv";

// ---- Styles ----
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
  padding: 8px 14px; font-size: 14px; border: 0; cursor: pointer;
  border-radius: 6px;
  background: ${({ $secondary, theme }) =>
    $secondary ? "rgba(0,0,0,0.05)" : (theme?.colors?.primary ?? "#0d6efd")};
  color: ${({ $secondary }) => ($secondary ? "#121212" : "#fff")};
  transition: opacity 0.2s ease;
  &:hover { opacity: 0.9; }
`;

const FloatingSettings = styled.button`
  position: fixed; left: 12px; bottom: 12px; z-index: 9998;
  padding: 6px 10px; font-size: 13px; border: 0; cursor: pointer;
  border-radius: 999px; background: rgba(0,0,0,0.06); color: #121212;
  backdrop-filter: blur(8px);
`;

// ---- Helpers ----
type ConsentStatus = "accepted" | "rejected";
type StoredConsent = { status: ConsentStatus; updatedAt: string; version: number };

function readConsent(): StoredConsent | null {
  try { return JSON.parse(localStorage.getItem(CONSENT_KEY) || "null"); }
  catch { return null; }
}

function writeConsent(status: ConsentStatus) {
  const payload: StoredConsent = { status, updatedAt: new Date().toISOString(), version: 1 };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
}

function clarityAvailable(): boolean {
  return typeof (window as any).clarity === "function";
}

/** Initialize Clarity only after explicit consent (ConsentV2). */
function initClarityAfterConsent() {
  try {
    if (!clarityAvailable()) return;
    (window as any).clarity("consentv2", { analytics_Storage: "granted", ad_Storage: "denied" });
    (window as any).clarity("init", CLARITY_ID);
  } catch { /* no-op */ }
}

/** Deny consent defensively if script is present. */
function setClarityDenied() {
  try {
    if (clarityAvailable()) {
      (window as any).clarity("consentv2", { analytics_Storage: "denied", ad_Storage: "denied" });
    }
  } catch { /* no-op */ }
}

// ---- Component ----
const CookieBanner: React.FC = () => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null); // to restore focus
  const bannerRef = useRef<HTMLDivElement>(null);

  // Show banner only if no stored choice
  useEffect(() => {
    const stored = readConsent();
    if (!stored) setOpen(true);
    if (stored?.status === "accepted") initClarityAfterConsent();
    if (stored?.status === "rejected") setClarityDenied();
  }, []);

  // Focus trap + Esc (kept modal) + restore focus
  useEffect(() => {
    if (!open) return;

    // Save the currently focused element to restore later
    if (document.activeElement instanceof HTMLElement) triggerRef.current = document.activeElement;

    // Move focus to first focusable when the banner mounts/opens
    const rootOnMount = bannerRef.current;
    if (rootOnMount) {
      const firstFocusable = rootOnMount.querySelector<HTMLElement>(
        'button, a[href], [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }

    function onKeydown(e: KeyboardEvent) {
      // Always re-read the ref to satisfy TypeScript and avoid stale references
      const root = bannerRef.current;
      if (!root) return;

      if (e.key === "Escape") {
        // Keep it modal; do not close on Esc
        e.preventDefault();
        return;
      }

      if (e.key === "Tab") {
        const focusables = root.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        const els = Array.from(focusables).filter(el => !el.hasAttribute("disabled"));
        if (els.length === 0) return;

        const first = els[0];
        const last = els[els.length - 1];
        const current = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          if (current === first || !root.contains(current)) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (current === last || !root.contains(current)) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    }

    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("keydown", onKeydown);
      // restore focus
      triggerRef.current?.focus?.();
    };
  }, [open]);

  const accept = () => {
    writeConsent("accepted");
    setOpen(false);
    initClarityAfterConsent();
  };

  const reject = () => {
    writeConsent("rejected");
    setOpen(false);
    setClarityDenied();
  };

  const reopen = () => setOpen(true);

  if (!open) {
    return (
      <FloatingSettings
        type="button"
        onClick={reopen}
        aria-label="Open cookie settings"
        title="Cookie settings"
      >
        Cookie settings
      </FloatingSettings>
    );
  }

  return (
    <Banner
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
      ref={bannerRef}
    >
      <Msg>
        e use cookies to help our site work properly and learn how 
        you use it, so we can give you the best experience.{" "}
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/cookies">Cookie Policy</Link>
      </Msg>
      <Actions>
        <Btn onClick={accept}>Accept all</Btn>
        <Btn $secondary onClick={reject}>Reject all</Btn>
        {/* Add a granular settings panel here if you add categories */}
      </Actions>
    </Banner>
  );
};

export default CookieBanner;
