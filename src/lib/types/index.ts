export interface ITreeNode {
  id: number;
  name: string;
  description: string;
  children: ITreeNode[];
}

export interface IEditingNode {
  id: number;
  name: string;
  description: string;
}