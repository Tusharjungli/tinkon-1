// lib/loadAds.ts

// extend the Window interface so TS knows about our property
declare global {
  interface Window {
    __tinkon_ads_loaded?: boolean;
  }
}

export function loadAdsense(clientId: string) {
  if (typeof window === "undefined") return;
  // avoid double-loading
  if (window.__tinkon_ads_loaded) return;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
  s.crossOrigin = "anonymous";
  document.head.appendChild(s);

  window.__tinkon_ads_loaded = true;
}
