/** Schedule optional work after page load and a quiet moment; return its cleanup. */
export const afterPageLoad = (callback: () => void): (() => void) => {
  let timer: number | undefined;
  let idle: number | undefined;
  const schedule = () => {
    timer = window.setTimeout(() => {
      if ('requestIdleCallback' in window) {
        idle = window.requestIdleCallback(callback, { timeout: 2000 });
      } else {
        callback();
      }
    }, 1000);
  };
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
  return () => {
    window.removeEventListener('load', schedule);
    window.clearTimeout(timer);
    if (idle !== undefined) window.cancelIdleCallback(idle);
  };
};
