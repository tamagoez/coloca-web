import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Provider } from "@supabase/supabase-js";
const supabase = createBrowserSupabaseClient();

export async function signInWithEmailPass(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) throw error;
    return true;
  } catch (error: any) {
    console.error(error.message);
    // alert(error.message);
    throw new Error(error.message);
  }
}

export async function signInWithOAuth(provider: Provider) {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: "http://localhost:3000/callback",
      },
    });

    if (error) throw error;
    return true;
  } catch (error: any) {
    console.error(error.message);
    // alert(error.message);
    throw new Error(error.message);
  }
}
