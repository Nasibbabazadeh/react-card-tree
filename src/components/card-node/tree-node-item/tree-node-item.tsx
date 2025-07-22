import React from "react";
import { ChevronRight, Pencil, Plus, Trash2 } from "lucide-react";
import type { ITreeNode } from "../../../lib/types";
import Button from "../../ui/button/button";
import styles from "./styles.module.css";
import Flex from "../../ui/flex/flex";
import Text from "../../ui/text/text";
import { cn } from "../../../lib/utils";
import { useDialogStore } from "../../../lib/store/dialog";
import DeleteDialog from "../../dialogs/delete-dialog/dialog";
import ActionsDialog from "../../dialogs/actions-dialog/dialog";

interface IProps {
  node: ITreeNode;
  onToggleCollapse: (nodeId: number) => void;
  isNodeCollapsed: (nodeId: number) => boolean;
  level: number;
}

export const TreeNodeItemComponent: React.FC<IProps> = ({
  node,
  onToggleCollapse,
  isNodeCollapsed,
  level,
}) => {
  const hasChildren = node.children.length > 0;
  const isCollapsed = isNodeCollapsed(node.id);
  const open = useDialogStore(state => state.open)

  const openDeleteDialog = (nodeId: number) => {
    open({
      content: (dialog) => (
        <DeleteDialog
          dialog={dialog}
          nodeId={nodeId}
        />
      ),
    });
  };


  const openActionsDialog = (type: "add" | "edit", credentials: any) => {
    open({
      content: (dialog) => (
        <ActionsDialog
          dialog={dialog}
          node={credentials}
          type={type}
        />
      ),
    });
  };

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
            <Button
              onClick={() => openActionsDialog("add", {
                id: node.id,
                name: "",
                description: "",
              })}
              icon={<Plus />}
            />
            <Button onClick={() =>
              openActionsDialog("edit", node)
            } variant="outline"
              icon={<Pencil />} />
            <Button
              onClick={() => openDeleteDialog(node.id)}
              icon={<Trash2 />}
              variant="destructive" />
          </Flex>

        </div>
      </div>
    </div>
  );
};
