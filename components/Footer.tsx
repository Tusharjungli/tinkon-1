import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa"; // Install: npm i react-icons

export default function Footer() {
  return (
    <footer className="border-t py-10 bg-white mt-12">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center md:justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          {/* Replace with your logo path */}
          <Image
            src="/logo.png" // update to your actual logo path (public/logo.png)
            alt="Tinkon Logo"
            width={40}
            height={40}
            className="rounded-full border"
          />
          <span className="font-bold text-xl">Tink On It</span>
        </div>

        {/* Footer Nav: Required Docs */}
        <div className="flex gap-6 text-sm text-gray-600">
          <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/disclaimer" className="hover:underline">Disclaimer</Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 text-gray-500">
          <a href="https://www.linkedin.com/in/tushar-p-bb6466122/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
            <FaLinkedin size={22} />
          </a>
          <a href="https://github.com/Tusharjungli11" target="_blank" rel="noopener noreferrer" className="hover:text-black">
            <FaGithub size={22} />
          </a>
          <a href="https://instagram.com/your-insta" target="_blank" rel="noopener noreferrer" className="hover:text-black">
            <FaTwitter size={22} />
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
