import { GetServerSideProps } from "next";
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const handleid = ctx.params?.handleid as string;

  if (handleid !== "test") {
    return {
      notFound: true, //redirects to 404 page
    };
  }

  return {
    props: {
      handleid,
    },
  };
};
