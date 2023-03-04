import { NextApiHandler } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const ProtectedRoute: NextApiHandler = async (req, res) => {
  if (req.method.toLocaleLowerCase() !== "get") {
    return res.status(405).end();
  }
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient({ req, res });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);

  // Run queries with RLS on the server
  const { data } = await supabase
    .from("public_profile")
    .select("*")
    .eq("handleid", req.query.handleid);
  res.json(data);
};

export default ProtectedRoute;
