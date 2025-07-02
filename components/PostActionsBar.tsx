import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { getLikes, addLike } from "../lib/postLikesApi";

export default function PostActionsBar({
  postSlug,
  bookmark,
  share,
}: {
  postSlug: string;
  bookmark: React.ReactNode;
  share: React.ReactNode;
}) {
  const [likes, setLikes] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getLikes(postSlug).then(setLikes);
  }, [postSlug]);

  const handleLike = async () => {
    setIsLoading(true);
    const newLikes = await addLike(postSlug);
    setLikes(newLikes);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-between w-full py-4 mt-2 mb-8">
      {/* Left: Like button */}
      <div className="flex items-center gap-7">
        <button
          className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition font-semibold group focus:outline-none"
          onClick={handleLike}
          aria-label="Love this post"
          disabled={isLoading}
        >
          <Heart
            className={`w-6 h-6 group-hover:scale-110 transition ${isLoading ? "animate-pulse" : ""}`}
            strokeWidth={2.2}
            fill={likes > 0 ? "#ec4899" : "none"} // Pink fill if likes > 0
          />
          <span className="text-lg tabular-nums">{likes.toLocaleString()}</span>
        </button>
      </div>
      {/* Right: Bookmark & Share */}
      <div className="flex items-center gap-7">
        {bookmark}
        {share}
      </div>
    </div>
  );
}
