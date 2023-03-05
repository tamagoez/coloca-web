import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  Editable,
  EditablePreview,
  EditableTextarea,
  Text,
  Textarea,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaSearch, FaRegImage } from "react-icons/fa";
import { HiOutlineShare } from "react-icons/hi";
import { MyUserBox } from "../my";
import Twemoji from "react-twemoji";

export function AddRemarkDrawerComponent({
  style,
}: {
  style?: React.CSSProperties;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen} style={style}>
        ＋ New
      </Button>
      <AddRemarkDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </>
  );
}

function AddRemarkDrawer({ isOpen, onClose, btnRef }) {
  const [remarktext, setRemarktext] = useState("");
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="xs"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create new Remark</DrawerHeader>

        <DrawerBody>
          <MyUserBox canChangeUser={true} />
          <Textarea
            onChange={(e) => {
              setRemarktext(e.target.value);
            }}
            value={remarktext}
            placeholder="Input your new Remark"
            rows={remarktext.match(/\n/g)?.length + 1}
            mt="2"
          />
          <Box display="flex" alignItems="baseline" gap="0">
            <IconButton
              colorScheme="outline"
              aria-label="Search database"
              icon={<FaRegImage />}
              color="gray.400"
            />
            <IconButton
              colorScheme="outline"
              aria-label="Search database"
              icon={<HiOutlineShare />}
              color="gray.400"
            />
          </Box>
          <Box>
            <Twemoji options={{ className: "twemoji" }}>
              {remarktext.replace(/\n/g, "<br />")}
            </Twemoji>
          </Box>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Create!</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function AddOldRemarkDrawer({ isOpen, onClose, btnRef }) {
  const [remarktext, setRemarktext] = useState("");
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="xs"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create new Remark</DrawerHeader>

        <DrawerBody>
          <MyUserBox canChangeUser={true} />
          <Editable
            border="1px"
            borderColor="gray.200"
            value={remarktext.replace(/\n/g, "\n")}
            placeholder="Input new Remark"
            startWithEditView={true}
          >
            <Text>
              <EditablePreview />
            </Text>
            <EditableTextarea
              rows={remarktext.match(/\n/g)?.length}
              onChange={(e) => setRemarktext(e.target.value)}
            />
          </Editable>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Create!</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
