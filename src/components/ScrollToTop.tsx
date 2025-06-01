import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component that automatically scrolls to the top of the page
 * when the route changes. Uses a more reliable scroll restoration method
 * with immediate scrolling behavior to prevent initial scroll position issues.
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use a more reliable scroll restoration method
    // The 'auto' behavior ensures immediate scrolling without animation
    // which helps prevent issues with initial scroll position
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  
  return null;
};

export default ScrollToTop;
