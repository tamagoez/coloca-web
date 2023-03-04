import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
export default function OtherProfile() {
  const router = useRouter();
  return (
    <>
      <h1>他人のプロフィール</h1>
      <Button
        onClick={() => {
          router.push("/logout");
        }}
      >
        ログアウト
      </Button>
    </>
  );
    }