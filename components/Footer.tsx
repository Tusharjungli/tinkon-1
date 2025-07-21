import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState, ReactNode } from "react";

export default function Footer() {
  return (
    <footer className="border-t dark:border-white py-10 bg-white dark:bg-gray-950 mt-12 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center md:justify-between gap-4">
        {/* Logo and Brand (Logo NOT affected by dark mode) */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="flex items-center gap-3"
        >
          <div className="flex items-center gap-2">
            <Image
              src="/logo.webp"
              alt="Tinkon Logo"
              width={40}
              height={40}
              // Always stays the same, no dark:bg or dark:border!
              className="rounded-full border bg-gray-100"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <Link
              href="/"
              className="font-bold text-xl hover:underline text-black dark:text-gray-100"
              aria-label="Home"
            >
              Tink On It
            </Link>
          </div>
        </motion.div>

        {/* Footer Nav: Required Docs */}
        <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
          <FooterBounceLink href="/contact">Contact</FooterBounceLink>
          <FooterBounceLink href="/privacy-policy">Privacy Policy</FooterBounceLink>
          <FooterBounceLink href="/terms">Terms</FooterBounceLink>
          <FooterBounceLink href="/disclaimer">Disclaimer</FooterBounceLink>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 text-gray-500 dark:text-gray-400">
          <FooterIcon
            href="/get-linkedin"
            ariaLabel="LinkedIn"
            hoverColor="#2563eb"
          >
            <FaLinkedin size={22} />
          </FooterIcon>
          <FooterIcon
            href="https://x.com/tushar_tinkon"
            ariaLabel="Twitter"
            hoverColor="#1a1a1a"
            isExternal
          >
            <FaXTwitter size={23} />
          </FooterIcon>
          <FooterIcon
            href="https://www.instagram.com/tinkonit/"
            ariaLabel="Instagram"
            hoverColor="#d946ef"
            isExternal
          >
            <FaInstagram size={22} />
          </FooterIcon>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Tushar Panchal — For thinkers and introverts.
        <br />
        <span className="italic">
          Built with <span className="font-bold text-black dark:text-white">real stories</span>, imperfect journeys, and lot of chai.
        </span>
      </div>
    </footer>
  );
}

// --- Helper components for DRY, clean animations ---

function FooterBounceLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.08 }}
      transition={{ type: "spring", stiffness: 340, damping: 20 }}
      style={{ display: "inline-block" }}
    >
      <Link
        href={href}
        className="transition-colors duration-150 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
      >
        {children}
      </Link>
    </motion.div>
  );
}

function FooterIcon({
  href,
  ariaLabel,
  hoverColor,
  isExternal,
  children,
}: {
  href: string;
  ariaLabel: string;
  hoverColor: string;
  isExternal?: boolean;
  children: ReactNode;
}) {
  const [hover, setHover] = useState(false);
  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      className="transition-colors"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      style={{
        color: hover ? hoverColor : undefined,
        display: "inline-flex",
      }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 350, damping: 18 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </motion.a>
  );
}
