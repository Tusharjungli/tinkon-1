import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaLinkedin, FaInstagram, FaSnapchatGhost } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import SharePopover from "./SharePopover";

const socials = [
  {
    name: "LinkedIn",
    href: "/get-linkedin",
    icon: <FaLinkedin size={27} />,
    hoverColor: "#2563eb",
    isExternal: false,
  },
  {
    name: "Twitter",
    href: "https://x.com/tushar_tinkon",
    icon: <FaXTwitter size={28} />,
    hoverColor: "#1a1a1a",
    isExternal: true,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/tinkonit/",
    icon: <FaInstagram size={27} />,
    hoverColor: "#d946ef",
    isExternal: true,
  },
  {
    name: "Snapchat",
    href: "https://www.snapchat.com/add/tushar11jungli",
    icon: <FaSnapchatGhost size={28} />,
    hoverColor: "#facc15",
    isExternal: true,
  },
];

export default function PostActionsBar({
  shareUrl = "",
  shareTitle = "",
}: {
  shareUrl?: string;
  shareTitle?: string;
}) {
  return (
    <div className="flex justify-center gap-7 mt-10 mb-10 items-center"> {/* items-center for vertical alignment */}
      {socials.map((s) =>
        s.isExternal ? (
          <SocialIconExternal
            key={s.name}
            href={s.href}
            icon={s.icon}
            ariaLabel={s.name}
            hoverColor={s.hoverColor}
          />
        ) : (
          <SocialIconInternal
            key={s.name}
            href={s.href}
            icon={s.icon}
            ariaLabel={s.name}
            hoverColor={s.hoverColor}
          />
        )
      )}

      {/* SharePopover perfectly aligned and sized */}
      <motion.div
        className="inline-flex items-center" // Ensures vertical alignment
        whileHover={{ scale: 1.17 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 340, damping: 19 }}
        style={{ lineHeight: 0 }} // Remove any shift
      >
        <div className="flex items-center">
          <SharePopover url={shareUrl} title={shareTitle} />
        </div>
      </motion.div>
    </div>
  );
}

function SocialIconExternal({
  href,
  icon,
  ariaLabel,
  hoverColor,
}: {
  href: string;
  icon: React.ReactNode;
  ariaLabel: string;
  hoverColor: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      style={{ color: hover ? hoverColor : undefined, display: "inline-flex", verticalAlign: "middle" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={{ scale: 1.17 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 340, damping: 19 }}
      className="items-center" // Flex and items-center for perfect baseline
    >
      {icon}
    </motion.a>
  );
}

function SocialIconInternal({
  href,
  icon,
  ariaLabel,
  hoverColor,
}: {
  href: string;
  icon: React.ReactNode;
  ariaLabel: string;
  hoverColor: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      style={{ display: "inline-flex", color: hover ? hoverColor : undefined, verticalAlign: "middle" }}
      whileHover={{ scale: 1.17 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 340, damping: 19 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="items-center"
    >
      <Link href={href} aria-label={ariaLabel} className="inline-flex items-center">
        {icon}
      </Link>
    </motion.div>
  );
}
