import { cx, type CxOptions } from "class-variance-authority";
import type { ITreeNode } from "../types";

export const insertNodeRecursive = (
  nodes: ITreeNode[],
  parentId: number,
  newNode: ITreeNode
): ITreeNode[] =>
  nodes.map((node) =>
    node.id === parentId
      ? { ...node, children: [...node.children, newNode] }
      : { ...node, children: insertNodeRecursive(node.children, parentId, newNode) }
  );

export const updateNodeRecursive = (
  nodes: ITreeNode[],
  nodeId: number,
  name: string,
  description: string
): ITreeNode[] =>
  nodes.map((node) =>
    node.id === nodeId
      ? { ...node, name, description }
      : { ...node, children: updateNodeRecursive(node.children, nodeId, name, description) }
  );

export const deleteNodeRecursive = (nodes: ITreeNode[], nodeId: number): ITreeNode[] =>
  nodes
    .filter((node) => node.id !== nodeId)
    .map((node) => ({
      ...node,
      children: deleteNodeRecursive(node.children, nodeId),
    }));

export const findMaxIdRecursive = (nodes: ITreeNode[]): number => {
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


export function cn(...inputs: CxOptions) {
  return cx(inputs);
}