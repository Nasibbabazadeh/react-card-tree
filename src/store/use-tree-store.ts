import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ITreeNode } from "../types";

interface ITreeState {
  treeData: ITreeNode[];
  nextId: number;
  collapsedNodes: number[];

  addChild: (parentId: number | null, name: string, description: string) => void;
  updateNode: (nodeId: number, name: string, description: string) => void;
  deleteNode: (nodeId: number) => void;
  toggleNodeCollapse: (nodeId: number) => void;
  isNodeCollapsed: (nodeId: number) => boolean;
}

export const useTreeStore = create<ITreeState>()(
  persist(
    (set, get) => ({
      treeData: [],
      nextId: 1,
      collapsedNodes: [],

      addChild: (parentId, name, description) => {
        const newNode: ITreeNode = {
          id: get().nextId,
          name,
          description,
          children: [],
        };

        const insertNode = (nodes: ITreeNode[]): ITreeNode[] =>
          nodes.map((node) =>
            node.id === parentId
              ? { ...node, children: [...node.children, newNode] }
              : { ...node, children: insertNode(node.children) }
          );

        set((state) => ({
          treeData:
            parentId === null
              ? [...state.treeData, newNode]
              : insertNode(state.treeData),
          nextId: state.nextId + 1,
        }));
      },

      updateNode: (nodeId, name, description) => {
        const updateRecursive = (nodes: ITreeNode[]): ITreeNode[] =>
          nodes.map((node) =>
            node.id === nodeId
              ? { ...node, name, description }
              : { ...node, children: updateRecursive(node.children) }
          );

        set((state) => ({
          treeData: updateRecursive(state.treeData),
        }));
      },

      deleteNode: (nodeId) => {
        const deleteRecursive = (nodes: ITreeNode[]): ITreeNode[] =>
          nodes
            .filter((node) => node.id !== nodeId)
            .map((node) => ({
              ...node,
              children: deleteRecursive(node.children),
            }));

        const findMaxId = (nodes: ITreeNode[]): number => {
          let max = 0;
          const traverse = (list: ITreeNode[]) => {
            for (const node of list) {
              if (node.id > max) max = node.id;
              traverse(node.children);
            }
          };
          traverse(nodes);
          return max;
        };

        set((state) => {
          const newTree = deleteRecursive(state.treeData);
          const maxId = findMaxId(newTree);

          return {
            treeData: newTree,
            collapsedNodes: state.collapsedNodes.filter((id) => id !== nodeId),
            nextId: maxId + 1 || 1,
          };
        });
      },


      toggleNodeCollapse: (nodeId) => {
        const isCollapsed = get().collapsedNodes.includes(nodeId);
        set((state) => ({
          collapsedNodes: isCollapsed
            ? state.collapsedNodes.filter((id) => id !== nodeId)
            : [...state.collapsedNodes, nodeId],
        }));
      },

      isNodeCollapsed: (nodeId) => {
        return get().collapsedNodes.includes(nodeId);
      },
    }),

    {
      name: "tree-store",
    }
  )
);
