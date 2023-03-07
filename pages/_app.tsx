import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import type { AppProps } from "next/app";
// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/twemoji.css";
import { TopNavBar } from "../components/ui/bar";
import { Analytics } from "@vercel/analytics/react";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <>
      <style jsx>{`.AppComponent {
      display: flex;
      flex-flow: column;
      height: 100vh;
      
      }
    }`}</style>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <ChakraProvider>
          <Analytics />
          <div className="AppComponent">
            <TopNavBar />
            <div style={{ marginTop: "max(5vh, 50px)", height: "95vh" }}>
              <Component {...pageProps} />
            </div>
          </div>
        </ChakraProvider>
      </SessionContextProvider>
    </>
  );
}

export default MyApp;
