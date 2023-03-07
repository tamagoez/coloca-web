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
  if (req.method.toLocaleLowerCase() !== "get") return res.status(501);
  
};
