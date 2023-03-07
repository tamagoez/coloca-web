import {
  Avatar,
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchPublicProfile } from "../scripts/user/user";

export function UserBox({ width, userintid, subtitle }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [handleid, setHandleid] = useState("");
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await fetchPublicProfile(userintid);
      setUsername(data.username);
      setHandleid(data.disp_handleid);
      setLoading(false);
    }
    fetchData();
  }, [userintid]);
  return (
    <>
      <Link href="/profile/edit">
        <Box bg="gray.100" mt="2" py="2" w={width} pl="2" borderRadius="8">
          <Flex>
            <SkeletonCircle size="12" isLoaded={!loading} ml="1">
              <label htmlFor="avatarinput">
                <Avatar src={null} />
              </label>
            </SkeletonCircle>
            <Box ml="3">
              <Skeleton isLoaded={!loading}>
                <Flex>
                  <Text fontWeight="bold" mt="0.5">
                    {username}
                  </Text>
                  <Text fontSize="sm" ml={1} mt={1}>
                    @{handleid}
                  </Text>
                </Flex>
              </Skeleton>
              <Text mt="-0.5" fontSize="sm">
                {subtitle}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Link>
    </>
  );
}
