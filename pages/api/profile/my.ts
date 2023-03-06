import { NextApiHandler } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const ProtectedRoute: NextApiHandler = async (req, res) => {
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

  if (req.method.toLocaleLowerCase() === "get") {
    // Run queries with RLS on the server
    const { data: internaldata } = await supabase
      .from("internal_profile")
      .select("*")
      .eq("useruuid", session.user.id)
      .single();
    if (!internaldata)
      return res.status(404).json({
        error: "not_found",
        description:
          "Your profile may not be dound as it has not been set up yet.",
      });
    const { data: publicdata } = await supabase
      .from("public_profile")
      .select("*")
      .eq("userintid", internaldata.userintid)
      .single();

    res.json({ internal_data: internaldata, public_data: publicdata });
  } else {
    if (req.method.toLocaleLowerCase() === "post") {
      const { data: internaldata } = await supabase
        .from("internal_profile")
        .select("*")
        .eq("useruuid", session.user.id)
        .single();
      const { data: publicdata } = await supabase
        .from("public_profile")
        .select("*")
        .eq("userintid", internaldata?.userintid)
        .single();
      const olddata = { ...internaldata, ...publicdata };
      const data = req.body;
      console.dir(data); // POSTリクエストの中身をコンソールに出力
      const updatedUser = Object.assign({}, olddata, data);
      console.log(olddata);
      console.log(updatedUser);
      return res.status(500);
    }
  }
};

export default ProtectedRoute;
