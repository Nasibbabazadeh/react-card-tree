import React from "react";
import { CircleAlert } from "lucide-react";
import Flex from "../ui/flex/flex";
import Text from "../ui/text/text";
import { TreeNodeListComponent } from "./tree-node-list/tree-node-list";
import type { ITreeNode } from "../../lib/types";

interface IProps {
  treeData: ITreeNode[];
  onToggleCollapse: (nodeId: number) => void;
  isNodeCollapsed: (nodeId: number) => boolean;
}

const TreeContainer: React.FC<IProps> = ({
  treeData,
  onToggleCollapse,
  isNodeCollapsed,
}) => {

  return (
    <Flex className="tree-container" justify="center" align="center" direction="column">
      {treeData.length === 0 ? (
        <Flex align="center" gap="lg">
          <CircleAlert size={32} />
          <Text size="lg">Hazırda kart mövcud deyildir</Text>
        </Flex>
      ) : (
        treeData.map((node) => {
          return (
            <TreeNodeListComponent
              key={node.id}
              node={node}
              onToggleCollapse={onToggleCollapse}
              isNodeCollapsed={isNodeCollapsed}
              level={0}
            />
          )
        })
      )}
    </Flex>
  );
};

export default TreeContainer;
