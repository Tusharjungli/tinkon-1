import supabase from "./supabaseClient";

// Get total likes for a post (by slug)
export async function getLikes(post_slug: string): Promise<number> {
  const { data, error } = await supabase
    .from("post_likes")
    .select("likes")
    .eq("post_slug", post_slug)
    .single();
  if (error && error.code !== "PGRST116") throw error; // PGRST116 = not found
  return data?.likes ?? 0;
}

// Add a like to a post (upsert)
export async function addLike(post_slug: string): Promise<number> {
  // Try to increment if row exists
  const { data, error } = await supabase.rpc("increment_post_likes", { postslug: post_slug });
  if (error) throw error;
  return data ?? 1;
}

// OPTIONAL: To set a like count manually (not needed for the button)
export async function setLikes(post_slug: string, likes: number) {
  const { data, error } = await supabase
    .from("post_likes")
    .upsert([{ post_slug, likes }]);
  if (error) throw error;
  return data;
}
