import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();
import {
  Center,
  Heading,
  Text,
  Spinner,
  useToast,
  CircularProgress,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { signOut } from "../scripts/auth/signout";

export default function LogoutPage() {
  const router = useRouter();
  const toast = useToast();
  let redirecturl = "/dashboard";
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("moveto") != "null"
    ) {
      redirecturl = sessionStorage.getItem("moveto");
    }
    sessionStorage.removeItem("moveto");
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_IN") location.replace(redirecturl);
    });
  }, []);
  return (
    <>
      <Center mt="5">
        <Heading fontSize="2xl" ml="2">
          Signing...
        </Heading>
        <CircularProgress ml="3" isIndeterminate />
      </Center>
      <Center mt="3">
        <Text>After finishing login process, you will be redirected</Text>
      </Center>
    </>
  );
}
