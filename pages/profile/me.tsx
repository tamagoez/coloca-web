import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
export default function MyProfile() {
  const router = useRouter();
  return (
    <>
      <h1>自分のプロフィール</h1>
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