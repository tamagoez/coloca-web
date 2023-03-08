import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Wrap,
  WrapItem,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export function TopNavBar() {
  return (
    <>
      <style jsx>{`
        .TopNavBar {
          position: fixed;
          width: 100vw;
          height: 5vh;
          min-height: 50px;
          top: 0;
          z-index: 9999;
          display: flex;
        }
      `}</style>
      <Box backgroundColor="gray.200" className="TopNavBar">
        <AvatarMenu />
      </Box>
    </>
  );
}

function AvatarMenu() {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Menu>
        <MenuButton>
          <Avatar size="sm" />
        </MenuButton>
        <MenuList>
          <MenuGroup title="Account">
            <Wrap ml={3} mt={1}>
              <WrapItem>
                <Avatar size="xs" />
              </WrapItem>
              <WrapItem>
                <Avatar size="xs" />
              </WrapItem>
            </Wrap>
            <MenuItem
              fontSize="sm"
              onClick={() => router.push("/profile/edit")}
            >
              My Profile
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Apps">
            <MenuItem>Dashboard</MenuItem>
            <MenuItem>Remark</MenuItem>
            <MenuItem onClick={() => router.push("/chat")}>Chat</MenuItem>
          </MenuGroup>
          <MenuGroup>
            <IconButton
              // _focus={{_focus: "none"}} //周りの青いアウトラインが気になる場合に消す方法
              mb={10}
              aria-label="DarkMode Switch"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />} //自分の好みでSunアイコンはreact-iconsを使用しています
              onClick={toggleColorMode}
            />
          </MenuGroup>
        </MenuList>
      </Menu>
    </>
  );
}
