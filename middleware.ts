import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMyHandleid } from "./scripts/user/handleid";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;
  console.log(url);

  const nologin = ["/", "/login", "/signup", "/callback"];
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next();

  if (url.startsWith("/_next") || url.startsWith("/api")) {
    return res;
  }

  // Create authenticated Supabase Client.
  const supabase = createMiddlewareSupabaseClient({ req, res });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check auth condition
  if (session?.user.email) {
    console.log("logined user");
    const handleid = session.user.user_metadata.handleid;
    if (url === `/profile/${handleid}`) {
      return NextResponse.rewrite(new URL("/profile/edit", req.url));
    }
    if (nologin.indexOf(url) === -1) {
      // Authentication successful, forward request to protected route.
      return res;
    } else {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
  if (nologin.indexOf(url) === -1) {
    // Auth condition not met, redirect to home page.
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set(`moveto`, req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  } else {
    return res;
  }
}
