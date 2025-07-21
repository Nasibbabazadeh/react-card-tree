import { useCallback, useEffect, useState } from "react";
import type { ITreeNode } from "../types";

export const useTreeOperations = (initialData?: ITreeNode[]) => {
  const [treeData, setTreeData] = useState<ITreeNode[]>(initialData ?? []);
  const [nextId, setNextId] = useState<number>(1);
  const [collapsedNodes, setCollapsedNodes] = useState<Set<number>>(new Set());

  const findMaxId = (nodes: ITreeNode[]): number => {
    let maxId = 0;
    const traverse = (nodeList: ITreeNode[]) => {
      nodeList.forEach((node) => {
        if (node.id > maxId) maxId = node.id;
        traverse(node.children);
      });
    };
    traverse(nodes);
    return maxId;
  };

  useEffect(() => {
    const maxId = findMaxId(treeData);
    setNextId(maxId + 1);
  }, [treeData]);

  const addChild = useCallback(
    (parentId: number | null, name: string, description: string) => {
      const newNode: ITreeNode = {
        id: nextId,
        name,
        description,
        children: [],
      };

      if (parentId === null) {
        setTreeData((prev) => [...prev, newNode]);
      } else {
        const updateChildren = (nodes: ITreeNode[]): ITreeNode[] => {
          return nodes.map((node) => {
            if (node.id === parentId) {
              return {
                ...node,
                children: [...node.children, newNode],
              };
            }
            return {
              ...node,
              children: updateChildren(node.children),
            };
          });
        };
        setTreeData((prev) => updateChildren(prev));
      }
      setNextId((prev) => prev + 1);
    },
    [nextId]
  );

  const updateNode = useCallback(
    (nodeId: number, name: string, description: string) => {
      const updateNodeRecursive = (nodes: ITreeNode[]): ITreeNode[] => {
        return nodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              name,
              description,
            };
          }
          return {
            ...node,
            children: updateNodeRecursive(node.children),
          };
        });
      };
      setTreeData((prev) => updateNodeRecursive(prev));
    },
    []
  );

  const deleteNode = useCallback((nodeId: number) => {
    const deleteNodeRecursive = (nodes: ITreeNode[]): ITreeNode[] => {
      return nodes
        .filter((node) => node.id !== nodeId)
        .map((node) => ({
          ...node,
          children: deleteNodeRecursive(node.children),
        }));
    };

    setTreeData((prev) => deleteNodeRecursive(prev));

    setCollapsedNodes((prev) => {
      const newSet = new Set(prev);
      newSet.delete(nodeId);
      return newSet;
    });
  }, []);

  const toggleNodeCollapse = useCallback((nodeId: number) => {
    setCollapsedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  const isNodeCollapsed = useCallback((nodeId: number) => {
    return collapsedNodes.has(nodeId);
  }, [collapsedNodes]);

  return {
    treeData,
    addChild,
    updateNode,
    deleteNode,
    toggleNodeCollapse,
    isNodeCollapsed,
  };
};