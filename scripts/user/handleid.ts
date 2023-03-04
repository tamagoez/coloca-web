import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();

export async function getMyHandleid() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session?.user.user_metadata.handleid;
  } catch (error: any) {
    console.error(error.message);
  }
}
