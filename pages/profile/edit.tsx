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
import { useEffect, useState } from "react";
import { uploadAvatar } from "../../scripts/user/avatar";
export default function MyProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState<any>();
  const [username, setUsername] = useState("ユーザー名");
  const [handleid, setHandleid] = useState("handleid");

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
  async function fetchData() {
    setLoading(true);
    const response = await fetch("/api/profile/my");
    const data = await response.json();
    console.dir(data);
    setUsername(data.username);
    setHandleid(data.disp_handleid);
    setAvatar(null);
    setLoading(false);
  }

  async function saveData() {
    setLoading(true);
    const savedataset = {
      username: username,
      disp_handleid: handleid,
    };
    try {
      const data = await fetch("/api/profile/my", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(savedataset),
      });
      const response = await data.json();
      console.log(response);
      try {
        uploadAvatar(response.userintid, avatar);
      } catch (error) {
        alert(error);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }

    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>自分のプロフィール</h1>
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
      <Button
        onClick={() => {
          router.push("/logout");
        }}
      >
        ログアウト
      </Button>
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
      <Button onClick={() => saveData()}>保存する</Button>
      <Button onClick={() => setLoading(!loading)}>*表示切替</Button>
    </>
  );
}
