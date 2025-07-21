import React from "react";
import type { ITreeNode } from "../../../lib/types";
import { TreeNodeItemComponent } from "../tree-node-item/tree-node-item";

import styles from './styles.module.css'


interface IProps {
  node: ITreeNode;
  onAddChild: (parentId: number) => void;
  onEdit: (node: ITreeNode) => void;
  onDelete: (nodeId: number) => void;
  onToggleCollapse: (nodeId: number) => void;
  isNodeCollapsed: (nodeId: number) => boolean;
  level: number;
}

export const TreeNodeListComponent: React.FC<IProps> = ({
  node,
  onAddChild,
  onEdit,
  onDelete,
  onToggleCollapse,
  isNodeCollapsed,
  level,
}) => {
  const isCollapsed = isNodeCollapsed(node.id);

  return (
    <div className={styles.node}>
      <div className={styles.card}>
        <TreeNodeItemComponent
          node={node}
          onAddChild={onAddChild}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleCollapse={onToggleCollapse}
          isNodeCollapsed={isNodeCollapsed}
          level={level}
        />

        {node.children.length > 0 && !isCollapsed && (
          <div className={styles.children}>
            {node.children.map((child) => (
              <TreeNodeListComponent
                key={child.id}
                node={child}
                onAddChild={onAddChild}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleCollapse={onToggleCollapse}
                isNodeCollapsed={isNodeCollapsed}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
