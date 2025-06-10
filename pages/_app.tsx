// _app.tsx
import type { AppProps } from "next/app";
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
  weight: ["400", "500", "600", "700"],
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <div className={`${poppins.className} bg-white min-h-screen flex flex-col font-sans`}>
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
