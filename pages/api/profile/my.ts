import { NextApiHandler } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";

const ProtectedRoute: NextApiHandler = async (req, res) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient({ req, res });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);

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

  const adminAuthClient = supabase.auth.admin;

  if (!session)
    return res.status(401).json({
      error: "not_authenticated",
      description:
        "The user does not have an active session or is not authenticated",
    });
  // Run queries with RLS on the server
  const { data: internaldata } = await supabaseAdmin
    .from("internal_profile")
    .select("*")
    .eq("useruuid", session.user.id)
    .single();
  const { data: publicdata, error } = await supabase
    .from("public_profile")
    .select("*")
    .eq("userintid", internaldata.userintid)
    .limit(1)
    .single();

  if (req.method.toLocaleLowerCase() === "get") {
    if (!internaldata)
      return res.status(404).json({
        error: "not_found",
        description:
          "Your profile may not be dound as it has not been set up yet.",
      });
    return res.status(200).json({ ...internaldata, ...publicdata });
  } else {
    if (req.method.toLocaleLowerCase() === "post") {
      if (!internaldata) return res.status(500);
      // データの準備
      const olddata = { ...internaldata, ...publicdata };
      const data = req.body;
      const handleid = internaldata.disp_handleid;
      // 古いやつに新しいやつを合成
      const updatedProfile = Object.assign({}, olddata, data);
      // 追加するよ～～
      const { data: new_internaldata, error: internal_error } =
        await supabaseAdmin
          .from("internal_profile")
          .update({
            handleid: updatedProfile.disp_handleid.toLocaleLowerCase(),
            disp_handleid: updatedProfile.disp_handleid,
          })
          .eq("useruuid", session.user.id)
          .select()
          .single();
      const { data: new_publicdata, error: public_error } = await supabaseAdmin
        .from("public_profile")
        .update({
          userintid: olddata.userintid,
          handleid: updatedProfile.disp_handleid.toLocaleLowerCase(),
          disp_handleid: updatedProfile.disp_handleid,
          username: updatedProfile.username,
          bio: updatedProfile.bio,
        })
        .eq("userintid", new_internaldata.userintid)
        .select()
        .single();
      console.log(updatedProfile);
      console.error(internal_error);
      console.error(public_error);
      return res.status(200).json({ ...new_internaldata, ...new_publicdata });
    }
  }
};

export default ProtectedRoute;
