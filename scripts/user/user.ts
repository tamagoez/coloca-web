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
