// https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs#create-an-upload-widget
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();
import { decode } from "base64-arraybuffer";

export async function uploadAvatar(userintid, file) {
  try {
    if (!file) {
      throw new Error("You must select an image to upload.");
    }

    let { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(`${userintid}.png`, decode(file), {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }
  } catch (error) {
    alert("Error uploading avatar!");
    console.log(error);
  } finally {
    return;
  }
}

