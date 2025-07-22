import React from "react";
import { Plus } from "lucide-react";
import Button from "../ui/button/button";
import Flex from "../ui/flex/flex";
import Text from "../ui/text/text";
import { useDialogStore } from "../../lib/store/dialog";
import ActionsDialog from "../dialogs/actions-dialog/dialog";



export const Header: React.FC = () => {


  const open = useDialogStore(state => state.open)



  const openActionsDialog = () => {
    open({
      content: (dialog) => (
        <ActionsDialog
          dialog={dialog}
          node={{ id: null, name: "", description: "" }}
          type="add"
        />
      ),
    });
  };
  return (
    <Flex as="header" justify="between" align="center" className="header">
      <Text as="h1" weight="semibold">
        Kart əlavə et
      </Text>
      <Button onClick={openActionsDialog} icon={<Plus />} />
    </Flex>
  );
};

