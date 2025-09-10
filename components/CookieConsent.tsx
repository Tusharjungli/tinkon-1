// components/CookieConsent.tsx
import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "tinkon_cookie_consent_v1";

export type ConsentValue = "accepted" | "rejected" | null;

// global typing so we don't use `any`
declare global {
  interface Window {
    __TINKON_COOKIE_CONSENT?: {
      get: () => ConsentValue;
      open?: () => void;
    };
    __tinkon_ads_loaded?: boolean;
  }
}

function readConsent(): ConsentValue {
  try {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.consent ?? null;
  } catch  {
    return null;
  }
}

function writeConsent(value: ConsentValue) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ consent: value, ts: new Date().toISOString() }));
  } catch  {
    // ignore
  }
}

function exposeGlobalHelper() {
  try {
    window.__TINKON_COOKIE_CONSENT = {
      get: () => readConsent(),
      open: undefined, // we'll set this below if needed
    };
  } catch  {
    // ignore
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const c = readConsent();
    // show banner only if no prior consent
    if (!c) setVisible(true);

    // expose helper on window so other code can call it
    exposeGlobalHelper();

    // allow external re-open (optional)
    try {
      window.__TINKON_COOKIE_CONSENT!.open = () => {
        setVisible(true);
      };
    } catch  {}
  }, []);

  function accept() {
    writeConsent("accepted");
    setVisible(false);
    exposeGlobalHelper();
    window.dispatchEvent(new CustomEvent("tinkon:cookie-consent", { detail: { consent: "accepted" } }));
  }

  function reject() {
    writeConsent("rejected");
    setVisible(false);
    exposeGlobalHelper();
    window.dispatchEvent(new CustomEvent("tinkon:cookie-consent", { detail: { consent: "rejected" } }));
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 left-6 md:left-auto md:right-6 z-50">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-950 border rounded-2xl p-4 shadow-lg flex flex-col md:flex-row items-start md:items-center gap-3">
        <div className="flex-1">
          <div className="text-sm font-semibold">We use cookies to improve your experience</div>
          <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
            We use essential cookies and optional cookies for analytics and ads. You can accept to enable personalized features, or reject to keep only essential cookies.
            {" "}
            <Link href="/privacy-policy" className="ml-2 text-blue-600 hover:underline">Privacy Policy</Link>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <button
            className="px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-sm"
            onClick={reject}
            aria-label="Reject optional cookies"
          >
            Reject
          </button>
          <button
            className="px-3 py-1.5 rounded-md bg-pink-600 text-white text-sm font-semibold"
            onClick={accept}
            aria-label="Accept cookies"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

// export helpers
export { readConsent, writeConsent, STORAGE_KEY };
