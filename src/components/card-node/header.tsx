import React from "react";
import { Plus } from "lucide-react";
import Button from "../ui/button/button";
import Flex from "../ui/flex/flex";
import Text from "../ui/text/text";

interface IProps {
  onAddClick: () => void;
}

export const Header: React.FC<IProps> = ({ onAddClick }) => {
  return (
    <Flex as="header" justify="between" align="center" className="header">
      <Text as="h1" weight="semibold">
        Kart əlavə et
      </Text>
      <Button onClick={onAddClick} icon={<Plus />} />
    </Flex>
  );
};

