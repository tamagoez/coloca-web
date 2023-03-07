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

  if (req.method.toLocaleLowerCase() === "post") {
    const { data: internaldata } = await supabaseAdmin
      .from("internal_profile")
      .select("*")
      .eq("useruuid", session.user.id)
      .single();
    if (internaldata) return res.status(500);
    const { data: publicdata } = await supabaseAdmin
      .from("public_profile")
      .select("*")
      .eq("userintid", internaldata?.userintid)
      .single();
    const olddata = { ...internaldata, ...publicdata };
    const data = req.body;
    console.dir(data); // POSTリクエストの中身をコンソールに出力
    const updatedProfile = Object.assign({}, olddata, data);
    console.log(olddata);
    console.log(updatedProfile);
    //
    const publicprofile = {
      handleid: updatedProfile.disp_handleid.toLocaleLowerCase(),
      disp_handleid: updatedProfile.disp_handleid,
      username: updatedProfile.username,
      bio: updatedProfile.bio,
    };
    let internalprofile = {
      handleid: updatedProfile.disp_handleid.toLocaleLowerCase(),
      disp_handleid: updatedProfile.disp_handleid,
      useruuid: session.user.id,
    };

    const { data: publicadded, error: public_error } = await supabaseAdmin
      .from("public_profile")
      .insert([publicprofile])
      .select()
      .single();
    console.log(publicadded);
    console.error(public_error);
    internalprofile = Object.assign({}, internalprofile, {
      userintid: publicadded.userintid,
    });
    const { error: internal_error } = await supabaseAdmin
      .from("internal_profile")
      .insert([internalprofile]);
    console.error(internal_error);
    if (!public_error && !internal_error) {
      return res.status(200);
    } else {
      return res.status(500);
    }
  }
};

export default ProtectedRoute;
