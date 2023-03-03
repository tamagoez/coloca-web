import { Button, HStack } from "@chakra-ui/react";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";
import { signInWithOAuth } from "../../scripts/auth/signin";

export function OAuthList() {
  return (
    <HStack>
      <Button
        colorScheme="gray"
        leftIcon={<FaGoogle />}
        size="md"
        onClick={() => signInWithOAuth("google")}
      >
        Google
      </Button>
      <Button
        color="#5865f2"
        leftIcon={<FaDiscord />}
        size="md"
        onClick={() => signInWithOAuth("discord")}
      >
        Discord
      </Button>
      <Button
        color="#2d333b"
        leftIcon={<FaGithub />}
        size="md"
        onClick={() => signInWithOAuth("github")}
      >
        GitHub
      </Button>
    </HStack>
  );
}
