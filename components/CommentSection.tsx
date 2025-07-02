import { useEffect, useState } from "react";
import { fetchComments, addComment } from "../lib/commentsApi";

interface Comment {
  id: number;
  post_slug: string;
  user_name: string;
  user_email: string;
  user_avatar?: string;
  comment: string;
  parent_id?: number | null;
  created_at: string;
  likes: number;
  replies?: Comment[];
}

interface CommentListProps {
  comments: Comment[];
  onReply: (id: number) => void;
  replyTo: number | null;
  replyInput: string;
  setReplyInput: React.Dispatch<React.SetStateAction<string>>;
  handleReply: (parent_id: number) => void;
  // handleLike: (comment_id: number) => void;
  depth?: number;
}

export default function CommentSection({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyInput, setReplyInput] = useState("");

  useEffect(() => {
    fetchComments(postSlug).then(setComments);
  }, [postSlug]);

  const handlePost = async () => {
    if (!input.trim() || !name.trim() || !email.trim()) return;
    await addComment({
      post_slug: postSlug,
      user_name: name.trim(),
      user_email: email.trim(),
      comment: input.trim(),
      parent_id: null,
    });
    setInput("");
    fetchComments(postSlug).then(setComments);
  };

  const handleReply = async (parent_id: number) => {
    if (!replyInput.trim() || !name.trim() || !email.trim()) return;
    await addComment({
      post_slug: postSlug,
      user_name: name.trim(),
      user_email: email.trim(),
      comment: replyInput.trim(),
      parent_id,
    });
    setReplyInput("");
    setReplyTo(null);
    fetchComments(postSlug).then(setComments);
  };

  // Organize comments into nested structure
  const nestComments = (comments: Comment[]): Comment[] => {
    const map: { [id: number]: Comment & { replies: Comment[] } } = {};
    const roots: Comment[] = [];
    comments.forEach(c => (map[c.id] = { ...c, replies: [] }));
    comments.forEach(c => {
      if (c.parent_id && map[c.parent_id]) {
        map[c.parent_id].replies.push(map[c.id]);
      } else if (!c.parent_id) {
        roots.push(map[c.id]);
      }
    });
    return roots;
  };

  return (
    <section className="my-12">
      <h3 className="text-2xl font-semibold mb-4">
        Responses <span className="text-gray-400">({comments.length})</span>
      </h3>
      {/* Add Comment Form */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 select-none self-center sm:self-auto">
          {name ? name[0].toUpperCase() : "T"}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <input
            className="w-full sm:w-32 p-2 rounded-xl border bg-gray-50 text-gray-700"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className="w-full sm:w-40 p-2 rounded-xl border bg-gray-50 text-gray-700"
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="flex-1 p-3 rounded-xl border outline-none focus:ring-2 ring-indigo-200 bg-gray-50 text-gray-700"
            placeholder="What are your thoughts?"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handlePost(); }}
          />
        </div>
        <button
          onClick={handlePost}
          className="ml-0 sm:ml-2 px-4 py-2 rounded-xl bg-black text-white font-medium hover:bg-gray-900 transition mt-2 sm:mt-0"
          style={{ minWidth: "68px" }}
        >
          Post
        </button>
      </div>
      {/* Comment List */}
      <CommentList
        comments={nestComments(comments)}
        onReply={(id: number) => setReplyTo(id)}
        replyTo={replyTo}
        replyInput={replyInput}
        setReplyInput={setReplyInput}
        handleReply={handleReply}
        // handleLike={handleLike}
      />
    </section>
  );
}

function CommentList({
  comments,
  onReply,
  replyTo,
  replyInput,
  setReplyInput,
  handleReply,
  // handleLike,
  depth = 0
}: CommentListProps) {
  return (
    <div>
      {comments.map((c) => (
        <div
          key={c.id}
          className={`mb-8 pb-6 ${depth > 0 ? "sm:ml-8 border-l pl-4 border-gray-200" : ""}`}
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 select-none">
              {c.user_name[0]}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{c.user_name}</span>
                <span className="text-xs text-gray-400">{formatDate(c.created_at)}</span>
              </div>
              <div className="text-base mb-2">{c.comment}</div>
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                {/* <button onClick={() => handleLike(c.id)} className="flex items-center gap-1 hover:text-red-500 transition">
                  ❤️ {c.likes}
                </button> */}
                <button onClick={() => onReply(c.id)} className="hover:underline">Reply</button>
              </div>
              {/* Reply box */}
              {replyTo === c.id && (
                <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    className="flex-1 p-2 rounded-xl border bg-gray-50"
                    placeholder="Write a reply…"
                    value={replyInput}
                    onChange={e => setReplyInput(e.target.value)}
                  />
                  <button
                    onClick={() => handleReply(c.id)}
                    className="px-3 py-1 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
                  >
                    Post
                  </button>
                </div>
              )}
              {/* Nested replies */}
              {c.replies && c.replies.length > 0 && (
                <CommentList
                  comments={c.replies}
                  onReply={onReply}
                  replyTo={replyTo}
                  replyInput={replyInput}
                  setReplyInput={setReplyInput}
                  handleReply={handleReply}
                  // handleLike={handleLike}
                  depth={depth + 1}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
