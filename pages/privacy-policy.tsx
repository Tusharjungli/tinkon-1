import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <section className="max-w-2xl mx-auto py-24 px-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-6">Privacy Policy</h2>
      <p className="mb-3"><b>Last updated:</b> June 2025</p>
      <p className="mb-3">
        Your privacy matters to me. This page explains how <b>Tink On It</b> (“us”, “we”, or “our”) collects, uses, and protects your information.
      </p>
      <h3 className="text-xl font-semibold mt-8 mb-2">What We Collect</h3>
      <ul className="mb-3 list-disc list-inside">
        <li>
          Basic info such as browser type, device, approximate country, and usage data. This helps improve the site for everyone.
        </li>
        <li>
          If you use feedback or contact forms, your email and message. <b>We do not sell, rent, or share your personal info</b> with third parties, except as required by law.
        </li>
      </ul>
      <h3 className="text-xl font-semibold mt-8 mb-2">How We Use Your Info</h3>
      <ul className="mb-3 list-disc list-inside">
        <li>To improve your experience on the site.</li>
        <li>To respond to your feedback or questions.</li>
        <li>For analytics, using Google Analytics (which collects anonymous usage data).</li>
      </ul>
      <h3 className="text-xl font-semibold mt-8 mb-2">Cookies & Tracking</h3>
      <p className="mb-3">
        <b>Tink On It</b> uses cookies or similar technology to personalize your experience and remember your preferences. You can turn off cookies in your browser at any time.
      </p>
      <h3 className="text-xl font-semibold mt-8 mb-2">Ads & Google AdSense</h3>
      <p className="mb-3">
        This site may use Google AdSense to display ads. Google may use cookies to personalize ads based on your activity. You can manage your ad settings via Google’s Ad Settings.
      </p>
      <h3 className="text-xl font-semibold mt-8 mb-2">Links to Other Sites</h3>
      <p className="mb-3">
        Sometimes we link to other websites. Their privacy practices are their own—please review their privacy policies if you visit.
      </p>
      <h3 className="text-xl font-semibold mt-8 mb-2">Your Choices</h3>
      <ul className="mb-3 list-disc list-inside">
        <li>You can refuse cookies or withdraw consent at any time.</li>
        <li>You may request deletion of your feedback or contact info by emailing me.</li>
      </ul>
      <h3 className="text-xl font-semibold mt-8 mb-2">Contact</h3>
      <p>
        Got questions or concerns? Email me at{" "}
        <a
          href="mailto:jungli0beast@gmail.com"
          className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
        >
          tushar@tinkon.in
        </a>
        .
      </p>
      <p className="mt-4">
        By using <b>Tink On It</b>, you agree to this Privacy Policy. This policy may change without notice, so please check back occasionally.
      </p>
      <div className="flex gap-4 mt-8">
        <Link href="/" className="text-indigo-600 underline hover:text-indigo-800">Home</Link>
        <Link href="/blog" className="text-indigo-600 underline hover:text-indigo-800">Blog</Link>
      </div>
    </section>
  );
}