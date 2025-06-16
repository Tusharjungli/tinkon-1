import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // X (Twitter) icon

export default function Footer() {
  return (
    <footer className="border-t py-10 bg-white mt-12">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center md:justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Tinkon Logo"
              width={40}
              height={40}
              className="rounded-full border bg-gray-100"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <Link href="/" className="font-bold text-xl hover:underline" aria-label="Home">Tink On It</Link>

          </div>
        </div>

        {/* Footer Nav: Required Docs */}
        <div className="flex gap-6 text-sm text-gray-600">
          <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/disclaimer" className="hover:underline">Disclaimer</Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 text-gray-500">
          <Link
            href="/get-linkedin"
            aria-label="LinkedIn"
            className="hover:text-blue-700"
          >
            <FaLinkedin size={22} />
          </Link>

          <a
            href="https://x.com/tushar_tinkon" 
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-black"
          >
            <FaXTwitter size={23} />
          </a>
          <a
            href="https://instagram.com/panchal_tusharr/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-pink-500"
          >
            <FaInstagram size={22} />
          </a>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Tushar Panchal — Made in India for thinkers and introverts.
        <br />
        <span className="italic">
          Built with <span className="font-bold text-black">real stories</span>, imperfect journeys, and a lot of chai.
        </span>
      </div>
    </footer>
  );
}
