import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ITreeNode } from "../types";
import {
  insertNodeRecursive,
  updateNodeRecursive,
  deleteNodeRecursive,
  findMaxIdRecursive,
} from '../utils/index'
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

        set((state) => ({
          treeData:
            parentId === null
              ? [...state.treeData, newNode]
              : insertNodeRecursive(state.treeData, parentId, newNode),
          nextId: state.nextId + 1,
        }));
      },

      updateNode: (nodeId, name, description) => {
        set((state) => ({
          treeData: updateNodeRecursive(state.treeData, nodeId, name, description),
        }));
      },

      deleteNode: (nodeId) => {
        set((state) => {
          const newTree = deleteNodeRecursive(state.treeData, nodeId);
          const maxId = findMaxIdRecursive(newTree);
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

      isNodeCollapsed: (nodeId) => get().collapsedNodes.includes(nodeId),
    }),
    { name: "tree-store" }
  )
);
