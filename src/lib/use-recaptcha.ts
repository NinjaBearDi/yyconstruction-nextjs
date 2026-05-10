'use client';

import { useEffect, useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';

export function useRecaptcha() {
  useEffect(() => {
    if (!SITE_KEY) return;
    if (document.querySelector('script[data-recaptcha]')) return;

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.dataset.recaptcha = 'true';
    document.head.appendChild(script);
  }, []);

  const executeRecaptcha = useCallback(
    async (action: string): Promise<string | null> => {
      if (!SITE_KEY) return null;
      const grecaptcha = window.grecaptcha;
      if (!grecaptcha) return null;

      return new Promise((resolve) => {
        grecaptcha.ready(async () => {
          try {
            const token = await grecaptcha.execute(SITE_KEY, { action });
            resolve(token);
          } catch {
            resolve(null);
          }
        });
      });
    },
    [],
  );

  return { executeRecaptcha };
}
