import { useState } from "react";
import "./App.css";
import { useTreeStore } from "./lib/store/use-tree-store";

import TreeContainer from "./components/card-node/container";
import { Header } from "./components/card-node/header";
import { NodeForm } from "./components/card-node/node-form/node-form";
import DeleteDialog from "./components/dialogs/delete-dialog/dialog";
import { Dialog } from "./components/dialogs/form-dialog/dialog";
import { DialogProvider } from "./components/ui/dialog";
import { useDialogStore } from "./lib/store/dialog";
import type { IEditingNode, ITreeNode } from "./lib/types";

function App() {
  const {
    treeData,
    addChild,
    updateNode,
    toggleNodeCollapse,
    isNodeCollapsed,
  } = useTreeStore();

  const open = useDialogStore(state => state.open)

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

  return (
    <div className="app">
      <DialogProvider />
      <Header onAddClick={() => openAddModal(null)} />
      <TreeContainer
        treeData={treeData}
        onAddChild={openAddModal}
        onEdit={openEditModal}
        onDelete={openDeleteDialog}
        onToggleCollapse={toggleNodeCollapse}
        isNodeCollapsed={isNodeCollapsed}
      />

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
