import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('consent-gated analytics', () => {
  const appendChild = vi.fn();
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
    appendChild.mockClear();
    vi.stubGlobal('window', {
      location: { hostname: 'example.com', origin: 'https://example.com', pathname: '/work', search: '' },
      setTimeout, clearTimeout, addEventListener: vi.fn(), removeEventListener: vi.fn(),
    });
    vi.stubGlobal('document', {
      readyState: 'complete', title: 'Work',
      createElement: () => ({}), head: { appendChild },
    });
  });
  afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

  it('does not load analytics or queue events without consent', async () => {
    const { updateGoogleConsent, trackEvent } = await import('./analytics');
    updateGoogleConsent(false);
    trackEvent('interaction');
    vi.runAllTimers();
    expect(appendChild).not.toHaveBeenCalled();
    expect(window.gtag).toBeUndefined();
  });

  it('cancels a pending script load when consent is revoked', async () => {
    const { updateGoogleConsent } = await import('./analytics');
    updateGoogleConsent(true);
    updateGoogleConsent(false);
    vi.runAllTimers();
    expect(appendChild).not.toHaveBeenCalled();
  });

  it('loads once after consent, tracks the current page, and stops events on rejection', async () => {
    const { updateGoogleConsent, trackEvent } = await import('./analytics');
    updateGoogleConsent(true);
    expect(appendChild).not.toHaveBeenCalled();
    vi.runAllTimers();
    expect(appendChild).toHaveBeenCalledTimes(1);
    expect(appendChild.mock.calls[0][0].src).toContain('googletagmanager.com/gtag/js');
    const commands = () => window.dataLayer?.map(command => Array.from(command as IArguments));
    expect(commands()?.some(command => command[0] === 'event' && command[1] === 'page_view')).toBe(true);
    updateGoogleConsent(true);
    vi.runAllTimers();
    expect(appendChild).toHaveBeenCalledTimes(1);
    updateGoogleConsent(false);
    const count = window.dataLayer?.length;
    trackEvent('interaction');
    expect(window.dataLayer?.length).toBe(count);
    expect(window['ga-disable-G-YQ8LPFFP43']).toBe(true);
  });
});
