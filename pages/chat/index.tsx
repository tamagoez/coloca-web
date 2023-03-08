import { Button, Heading } from "@chakra-ui/react";
import { AddRoom } from "../../components/chat/room";
import { UserBox } from "../../components/user";

export default function ChatIndex() {
  return (
    <>
      <Heading fontSize="3xl">Chat</Heading>
      <AddRoom />
      <UserBox width="100%" userintid="3" subtitle="データなんかねえよ" />
    </>
  );
}
