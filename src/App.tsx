import { useState } from "react";
import "./App.css";
import { TreeNodeListComponent } from "./components/tree-node-list/tree-node-list";
import type { IEditingNode, ITreeNode } from "./types";
import { NodeForm } from "./components/node-form/node-form";
import { CircleAlert, Plus } from "lucide-react";
import Button from "./components/ui/button/button";
import Flex from "./components/ui/flex/flex";
import Text from "./components/ui/text/text";
import { Dialog } from "./components/dialog/dialog";
import { useTreeStore } from "./store/use-tree-store";



function App() {

  const {
    treeData,
    addChild,
    updateNode,
    deleteNode,
    toggleNodeCollapse,
    isNodeCollapsed,
  } = useTreeStore();

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "add" | "edit";
    parentId: number | null;
    editingNode: IEditingNode | null;
  }>({
    isOpen: false,
    type: "add",
    parentId: null,
    editingNode: null,
  });

  const openAddModal = (parentId: number | null) => {
    setModalState({
      isOpen: true,
      type: "add",
      parentId,
      editingNode: null,
    });
  };

  const openEditModal = (node: ITreeNode) => {
    setModalState({
      isOpen: true,
      type: "edit",
      parentId: null,
      editingNode: {
        id: node.id,
        name: node.name,
        description: node.description,
      },
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: "add",
      parentId: null,
      editingNode: null,
    });
  };

  const handleFormSubmit = (name: string, description: string) => {
    if (modalState.type === "add") {
      addChild(modalState.parentId, name, description);
    } else if (modalState.editingNode) {
      updateNode(modalState.editingNode.id, name, description);
    }
    closeModal();
  };

  const handleDelete = (nodeId: number) => {
    if (
      window.confirm(
        "Are you sure you want to delete this node and all its children?"
      )
    ) {
      deleteNode(nodeId);
    }
  };

  return (
    <div className="app">
      <Flex as="header" justify="between" align="center" className="header" >
        <Text as="h1" weight="semibold">Kart əlavə et</Text>
        <Button
          onClick={() => openAddModal(null)}
          icon={<Plus />}></Button>
      </Flex>

      <Flex className="tree-container" justify="center" align="center">
        {treeData.length === 0 ? (
          <Flex align="center" gap="lg">
            <CircleAlert size={32} />
            <Text size="lg">Hazırda kart mövcud deyildir</Text>
          </Flex>
        ) : (
          treeData.map((node) => (
            <TreeNodeListComponent
              key={node.id}
              node={node}
              onAddChild={openAddModal}
              onEdit={openEditModal}
              onDelete={handleDelete}
              onToggleCollapse={toggleNodeCollapse}
              isNodeCollapsed={isNodeCollapsed}
              level={0}
            />
          ))
        )}
      </Flex>


      <Dialog isOpen={modalState.isOpen} onClose={closeModal}>
        <NodeForm
          initialData={
            modalState.editingNode
              ? {
                name: modalState.editingNode.name,
                description: modalState.editingNode.description,
              }
              : undefined
          }
          onSubmit={handleFormSubmit}
          onCancel={closeModal}
          title={modalState.type === "add" ? "Əlavə et" : "Düzəliş et"}
        />
      </Dialog>
    </div>
  );
}

export default App;
