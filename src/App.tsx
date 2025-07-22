import "./App.css";
import { useTreeStore } from "./lib/store/use-tree-store";

import TreeContainer from "./components/card-node/container";
import { Header } from "./components/card-node/header";
import { DialogProvider } from "./components/ui/dialog";

function App() {
  const {
    treeData,
    toggleNodeCollapse,
    isNodeCollapsed,
  } = useTreeStore();


  return (
    <div className="app">
      <DialogProvider />
      <Header />
      <TreeContainer
        treeData={treeData}
        onToggleCollapse={toggleNodeCollapse}
        isNodeCollapsed={isNodeCollapsed}
      />
    </div>
  );
}

export default App;
