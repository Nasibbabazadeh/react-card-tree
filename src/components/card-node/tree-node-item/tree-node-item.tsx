import React from "react";
import { ChevronRight, Pencil, Plus, Trash2 } from "lucide-react";
import type { ITreeNode } from "../../../lib/types";
import Button from "../../ui/button/button";
import styles from "./styles.module.css";
import Flex from "../../ui/flex/flex";
import Text from "../../ui/text/text";
import { cn } from "../../../lib/utils";

interface IProps {
  node: ITreeNode;
  onAddChild: (parentId: number) => void;
  onEdit: (node: ITreeNode) => void;
  onDelete: (nodeId: number) => void;
  onToggleCollapse: (nodeId: number) => void;
  isNodeCollapsed: (nodeId: number) => boolean;
  level: number;
}

export const TreeNodeItemComponent: React.FC<IProps> = ({
  node,
  onAddChild,
  onEdit,
  onDelete,
  onToggleCollapse,
  isNodeCollapsed,
  level,
}) => {
  const hasChildren = node.children.length > 0;
  const isCollapsed = isNodeCollapsed(node.id);

  return (
    <div className={styles.node} data-level={level}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.info}>
            <div className={styles.titleRow}>
              {hasChildren && (
                <Button
                  onClick={() => onToggleCollapse(node.id)}
                  className={cn(styles.collapse,
                    !isCollapsed && styles.animateCollapse
                  )}
                  aria-expanded={!isCollapsed}
                  icon={<ChevronRight />}
                >
                </Button>
              )}
              <Text size="xl" weight="medium">
                #{node.id} - {node.name}
              </Text>
            </div>
            <Text color="secondary" weight="medium">Ətraflı : {node.description}</Text>
          </div>

          <Flex gap="sm" align="center" className={styles.actions}>
            <Button onClick={() => onAddChild(node.id)} icon={<Plus />} />
            <Button onClick={() => onEdit(node)} variant="outline" icon={<Pencil />} />
            <Button onClick={() => onDelete(node.id)} icon={<Trash2 />} variant="destructive" />
          </Flex>

        </div>
      </div>
    </div>
  );
};
