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
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { uploadAvatar } from "../../scripts/user/avatar";
import { getMyProfile, saveMyPublicProfile } from "../../scripts/user/my";
export default function MyProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState<any>();
  const [username, setUsername] = useState("ユーザー名");
  const [handleid, setHandleid] = useState("handleid");
  const [bio, setBio] = useState<string>("");

  // アバター
  // https://nyanblog2222.com/programming/javascript/1132/
  // ChatGPT
  const changeAvatar = (event) => {
    console.dir(event);
    // 2. 画像ファイルの読み込みクラス
    const reader = new FileReader();

    // 3. 準備が終わったら、id=sample1のsrc属性に選択した画像ファイルの情報を設定
    reader.onload = function (e) {
      setAvatar(e.target.result);
      console.log(e.target.result);
    };

    // 4. 読み込んだ画像ファイルをURLに変換
    reader.readAsDataURL(event.target.files[0]);
  };
  async function fetchData(profiledata?) {
    let data = profiledata;
    if (!profiledata) {
      setLoading(true);
      data = await getMyProfile()
      console.dir(data);
    }
    setUsername(data.username);
    setHandleid(data.disp_handleid);
    setAvatar(data.avatar);
    setBio(data.bio);
    setLoading(false);
  }

  async function saveData() {
    setLoading(true);
    const savedataset = {
      username: username,
      disp_handleid: handleid,
      bio: bio,
    };
    try {
      const response = await saveMyPublicProfile({username: username, disp_handleid: handleid, bio: bio})
      console.log(response);
      try {
        // await uploadAvatar(response.userintid, avatar);
        fetchData();
      } catch (error) {
        alert(error);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <input
        style={{
          visibility: "hidden",
          position: "absolute",
        }}
        type="file"
        id="avatarinput"
        accept="image/*"
        onChange={changeAvatar}
        disabled={loading}
      />
      <Box bg="gray.100" mt="2" py="2" w="300px" pl="2" borderRadius="8">
        <Flex>
          <SkeletonCircle size="12" isLoaded={!loading} ml="1">
            <label htmlFor="avatarinput">
              <Avatar src={avatar} />
            </label>
          </SkeletonCircle>
          <Box ml="3">
            <Skeleton isLoaded={!loading}>
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
              <Skeleton isLoaded={!loading}>
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
      <Skeleton isLoaded={!loading}>
        <Textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </Skeleton>
      <Button onClick={() => saveData()}>保存する</Button>
    </>
  );
}
