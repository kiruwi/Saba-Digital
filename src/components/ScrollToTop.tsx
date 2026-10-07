import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component that automatically scrolls to the top of the page
 * when the route changes. Uses a more reliable scroll restoration method
 * with immediate scrolling behavior to prevent initial scroll position issues.
 */
const ScrollToTop: React.FC = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const scrollToSection = () => {
        const target = document.getElementById(hash.slice(1));
        if (!target) return false;
        target.scrollIntoView({ behavior: 'instant', block: 'start' });
        return true;
      };
      if (scrollToSection()) return;
      // Home is lazy-loaded; wait for the destination section to mount.
      const observer = new MutationObserver(() => {
        if (scrollToSection()) observer.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });
      return () => observer.disconnect();
    }
    // Bypass the global smooth-scroll style during route restoration.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash, key]);
  
  return null;
};

export default ScrollToTop;
