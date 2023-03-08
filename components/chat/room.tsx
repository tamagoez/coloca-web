import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";

export function AddRoom() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        + Add
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant="soft-rounded" colorScheme="green">
              <TabList>
                <Tab>Personal</Tab>
                <Tab isDisabled>Group</Tab>
                <Tab isDisabled>Room</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <p>Create a room to chat privately.</p>
                  <FormControl isInvalid={false} mt="4">
                    <FormLabel>HandleID</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                        children="@"
                      />
                      <Input placeholder="Enter handleID" />
                    </InputGroup>
                  </FormControl>
                </TabPanel>
                <TabPanel>
                  <p>Create a room for a group of several people to chat.</p>
                </TabPanel>
                <TabPanel>
                  <p>Create a room for chatting with unspecified users.</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal">Add</Button>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
