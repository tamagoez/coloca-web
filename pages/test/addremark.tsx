import { Button } from "@chakra-ui/react";
import { AddRemarkDrawerComponent } from "../../components/remark/newremark";

export default function AddRemarkTest() {
  return (
    <>
      <AddRemarkDrawerComponent
        style={{ position: "fixed", bottom: 20, right: 20 }}
      />
    </>
  );
}
