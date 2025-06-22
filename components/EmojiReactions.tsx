import Image from "next/image";
import { useState } from "react";

const emojis = [
  {
    name: "Love",
    src: "/emoji/love.svg",
    alt: "Love",
  },
  {
    name: "Funny",
    src: "/emoji/funny.svg",
    alt: "Funny",
  },
  {
    name: "Surprised",
    src: "/emoji/surprised.svg",
    alt: "Surprised",
  },
  {
    name: "Clap",
    src: "/emoji/clap.svg",
    alt: "Clap",
  },
  {
    name: "Thankful",
    src: "/emoji/thankful.svg",
    alt: "Thankful",
  },
];

export default function EmojiReactions() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="mt-10 mb-8 text-center">
      <div className="text-gray-800 font-semibold mb-2 tracking-tight">
        How did this post make you feel?
      </div>
      <div className="flex gap-5 justify-center mb-3">
        {emojis.map((e) => (
          <button
            key={e.name}
            className={`transition hover:scale-125 active:scale-110 rounded-full bg-white border border-gray-200 shadow-sm p-3 outline-none focus:ring-2 focus:ring-indigo-200 ${
              selected === e.name ? "ring-2 ring-indigo-400 bg-indigo-50" : ""
            }`}
            aria-label={e.alt}
            onClick={() => setSelected(e.name)}
            disabled={!!selected}
            style={{ transition: "all 0.16s cubic-bezier(.68,-0.55,.27,1.55)" }}
          >
            <Image
              src={e.src}
              alt={e.alt}
              width={32}
              height={32}
              className="w-8 h-8"
              priority
            />
          </button>
        ))}
      </div>
      <div className="text-xs text-gray-500 italic mb-1">
        <span>Emoji reactions are in progress. Your click isn’t being saved (yet)!</span>
      </div>
      {selected && (
        <div className="text-green-600 mt-3 text-sm font-medium">
          Thanks for reacting with &quot;{selected}&quot;!
        </div>
      )}
    </div>
  );
}
