import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();

export async function getUserUUID() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (user.id) return user.id;
    throw error;
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function fetchPublicProfile(userintid: string) {
  try {
    const { data, error } = await supabase
      .from("public_profile")
      .select("*")
      .eq("userintid", userintid)
      .single();
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
}
