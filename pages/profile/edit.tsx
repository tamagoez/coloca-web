import {
  Avatar,
  Badge,
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
export default function MyProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("ユーザー名");
  const [handleid, setHandleid] = useState("handleid");
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
      <Box bg="gray.100" mt="2" py="2" w="300px" pl="2" borderRadius="8">
        <Flex>
          <SkeletonCircle size="12" isLoaded={loading} ml="1">
            <Avatar src="https://example.com/broken-url" />
          </SkeletonCircle>
          <Box ml="3">
            <Skeleton isLoaded={loading}>
              <Text fontWeight="bold" mt="0.5">
                <Editable value={username}>
                  <EditablePreview py="0" />
                  <EditableInput
                    py="0"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Badge ml="1" colorScheme="green">
                    New
                  </Badge>
                </Editable>
              </Text>
            </Skeleton>

            <Flex>
              <Text fontSize="sm">@</Text>
              <Skeleton isLoaded={loading}>
                <Text fontSize="sm">
                  <Editable value={handleid}>
                    <EditablePreview py="0" />
                    <EditableInput
                      py="0"
                      onChange={(e) => setHandleid(e.target.value)}
                    />
                  </Editable>
                </Text>
              </Skeleton>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Button onClick={() => {}}>保存する</Button>
      <Button onClick={() => setLoading(!loading)}>*表示切替</Button>
    </>
  );
}
