import supabase from "./supabaseClient";

export interface Comment {
  id: number;
  post_slug: string;
  user_name: string;
  user_email: string;
  user_avatar?: string;
  comment: string;
  parent_id?: number | null;
  created_at: string;
  likes: number;
}

// Fetch all comments for a post
export async function fetchComments(post_slug: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_slug", post_slug)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data || [];
}

// Add a new comment (or reply)
export async function addComment({
  post_slug,
  user_name,
  user_email,
  user_avatar,
  comment,
  parent_id = null,
}: {
  post_slug: string;
  user_name: string;
  user_email: string;
  user_avatar?: string;
  comment: string;
  parent_id?: number | null;
}) {
  const { data, error } = await supabase.from("comments").insert([
    {
      post_slug,
      user_name,
      user_email,
      user_avatar,
      comment,
      parent_id,
      likes: 0, // Default to 0 likes for new comments
    },
  ]);
  if (error) throw error;
  return data;
}

// Like a comment (increment likes by 1)
export async function likeComment(comment_id: number) {
  // 1. Fetch current likes
  const { data, error } = await supabase
    .from("comments")
    .select("likes")
    .eq("id", comment_id)
    .single();

  if (error) throw error;
  const currentLikes = (data?.likes ?? 0) + 1;

  // 2. Update likes
  const { error: updateError } = await supabase
    .from("comments")
    .update({ likes: currentLikes })
    .eq("id", comment_id);

  if (updateError) throw updateError;
  return true;
}
