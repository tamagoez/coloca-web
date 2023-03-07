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
} from "@chakra-ui/react";
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
          background: #f5f3f2;
          top: 0;
          z-index: 9999;
          display: flex;
        }
      `}</style>
      <div className="TopNavBar">
        <AvatarMenu />
      </div>
    </>
  );
}

function AvatarMenu() {
  const router = useRouter();
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
        </MenuList>
      </Menu>
    </>
  );
}
