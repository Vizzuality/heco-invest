/**
 * Log an event in Google Analytics
 */
export const logEvent = (
  name: string,
  params?: Record<string, string | number | boolean>
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, params);
  }
};
