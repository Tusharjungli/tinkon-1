import Link from "next/link";
import Image from "next/image";

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
          <Link href="/terms" className="hover:underline">Terms of Use</Link>
          <Link href="/disclaimer" className="hover:underline">Disclaimer</Link>
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
