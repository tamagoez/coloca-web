import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();

export async function getMyProfile() {
    try {
        const {
            data: { session },
        } = await supabase.auth.getSession();
        const { data: internal_data, error: internal_error } = await supabase.from("internal_profile").select("*").eq("useruuid", session.user.id).single();
        if (internal_error) throw internal_error;
        const { data: public_data, error: public_error } = await supabase.from("public_profile").select("*").eq("useruuid", session.user.id).single();
        if (public_error) throw public_error;
        const resultdata = { ...internal_data, ...public_data }
        console.dir(resultdata)
        return resultdata;
    } catch (error) {
        console.error(error)
    }
}

export async function saveMyPublicProfile(updatedata) {
    try {
        const {
            data: { session },
        } = await supabase.auth.getSession();
        const handleid = (updatedata.disp_handleid as string).toLocaleLowerCase()
        const { data, error } = await supabase.from("public_profile").update({ ...updatedata, handleid: handleid}).eq("useruuid", session.user.id).select("*");
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error)
    }
}