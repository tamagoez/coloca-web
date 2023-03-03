import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import {
  Box,
  Heading,
  Highlight,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  Divider,
} from "@chakra-ui/react";

const IndexPage = () => (
  <div>
    <LinkBox as="article" p="5" borderWidth="0px" rounded="md">
      <Heading size="md" my="2" fontSize="5xl" mb="4">
        <LinkOverlay as={NextLink} href="/signup">
          Coloca
        </LinkOverlay>
      </Heading>
      <Text fontSize="xl">
        一般人が、一般人目線で開発した次世代のSNS。
        <br />
        もちろん利用は完全無料。
        <br />
        煩わしい広告も一切なし。
        <br />
        ユーザーのカスタマイズ性、プライバシー性を追求した多機能かつシンプルなSNS。
      </Text>
      <Box my="2" fontSize="xl">
        <Link as={NextLink} color="teal.400" href="#" fontWeight="bold">
          新規登録
        </Link>{" "}
        or{" "}
        <Link as={NextLink} color="teal.400" href="/login" fontWeight="bold">
          ログイン
        </Link>{" "}
        (完全無料!)
      </Box>
    </LinkBox>
    <Divider mb="5" />
    <LinkBox as="article" p="5" borderWidth="1px" rounded="md" mb="1">
      <Heading size="md" my="2">
        <LinkOverlay href="#">機能</LinkOverlay>
      </Heading>
      <Text fontSize="md">
        本音を言ってしまうと、まだ何も完成していません。
        <br />
        <b>Remark</b> テキスト、写真、URLなどを投稿できます!
        <br />
        <b>Session</b> 音声や映像(予定)で配信をすることができる機能です。
        <br />
        <b>Chat</b>{" "}
        その名の通りチャットです。返信機能やメンション機能だけでなく、スタンプ機能や送信取り消し機能なども追加する予定です。
      </Text>
      <Box my="2">
        <Link as={NextLink} color="teal.400" href="#" fontWeight="bold">
          機能について深く見てみる
        </Link>
      </Box>
    </LinkBox>
    <LinkBox as="article" p="5" borderWidth="1px" rounded="md">
      <Heading size="md" my="2">
        <LinkOverlay href="#">特徴</LinkOverlay>
      </Heading>
      <Text fontSize="md">
        数々の大企業が運営しているSNSとは違い、個人運営のため比較的大きなアップデートが多いです。
        <br />
        開発者も一人のSNSユーザーのため、これまでのSNSには無かった機能や、思わず苛立ってしまった機能の改善などを目標としています。
        <br />
        あなたの良いSNS体験のために全力を尽くさせてください。
      </Text>
      <Box my="2">
        <Link as={NextLink} color="teal.400" href="#" fontWeight="bold">
          特徴をもっと見てみる
        </Link>
      </Box>
    </LinkBox>
  </div>
);

export default IndexPage;
