import { NextApiHandler } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";

const RoomList: NextApiHandler = async (req, res) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient({ req, res });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);
  if (!session)
    return res.status(401).json({
      error: "not_authenticated",
      description:
        "The user does not have an active session or is not authenticated",
    });

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  // ここからメイン処理
  if (req.method.toLocaleLowerCase() !== "post") return res.status(501);
  const postdata = req.body;

  try {
    const { data: data1, error: error1 } = await supabaseAdmin
      .from("chat_room")
      .insert([{ type: postdata.type }])
      .select()
      .single();
    if (error1) throw error1;
    const { data: data2, error: error2 } = await supabaseAdmin
      .from("chat_member")
      .insert([{ roomid: data1.id }])
      .select()
      .single();
    if (error2) throw error2;
  } catch (err) {
    return res.status(500).json({
      error: "database_error",
      description: err.message,
    });
  }
};
