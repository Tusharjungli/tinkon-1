// pages/_app.tsx
import type { AppProps } from "next/app";
import Script from "next/script";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Poppins } from "next/font/google";
import FloatingFeedback from "../components/FloatingFeedback";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

// Configure Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div className={`${poppins.className} bg-white dark:bg-gray-950 min-h-screen flex flex-col font-sans transition-colors`}>
      {/* Google Analytics scripts */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-FDQH2BHV5G"
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FDQH2BHV5G', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={router.asPath}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.24, ease: "easeOut" } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.17, ease: "easeIn" } }}
            className="h-full"
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingFeedback />
    </div>
  );
}

export default MyApp;
