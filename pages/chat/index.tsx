import { Heading } from "@chakra-ui/react";
import { UserBox } from "../../components/user";

export default function ChatIndex() {
  return (
    <>
      <Heading fontSize="3xl">Chat</Heading>
      <UserBox width="100%" userintid="3" subtitle="データなんかねえよ" />
    </>
  );
}
