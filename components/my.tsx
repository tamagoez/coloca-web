import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getMyProfile } from "../scripts/user/my";
export function MyUserBox({ canChangeUser }: { canChangeUser: boolean }) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("Loading");
  const [handleid, setHandleid] = useState("loading");
  useEffect(() => {async function getMyData() {
    setLoading(true);
    const mydata = await getMyProfile()
    setUsername(mydata.username)
    setHandleid(mydata.handleid)
    setLoading(false)
  };getMyProfile()}, [])
  return (
    <Box bg="gray.100" mt="2" py="2" w="100%" pl="2" borderRadius="8">
      <Flex>
        <SkeletonCircle size="12" isLoaded={loading} ml="1">
          <Avatar src="https://example.com/broken-url" />
        </SkeletonCircle>
        <Box ml="3">
          <Skeleton isLoaded={loading}>
            <Text fontWeight="bold" mt="0.5">
              {username}
              <Badge ml="1" colorScheme="green">
                Beta
              </Badge>
            </Text>
          </Skeleton>

          <Flex>
            <Text fontSize="sm">@</Text>
            <Skeleton isLoaded={loading}>
              <Text fontSize="sm">{handleid}</Text>
            </Skeleton>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
