import React from "react";
import type { ITreeNode } from "../../../lib/types";
import { TreeNodeItemComponent } from "../tree-node-item/tree-node-item";

import styles from './styles.module.css'


interface IProps {
  node: ITreeNode;
  onToggleCollapse: (nodeId: number) => void;
  isNodeCollapsed: (nodeId: number) => boolean;
  level: number;
}

export const TreeNodeListComponent: React.FC<IProps> = ({
  node,
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
