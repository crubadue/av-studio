import React, { useCallback, useEffect, useState } from "react";
import NodesTab from "./Nodes";
import MaterialTab from "./Materials";

export const LeftMenuTabs = {
  Nodes: "NodesTab",
  Materials: "MaterialsTab",
};

const LeftSideMenu = (props) => {
  const { loadedMeshData } = props;
  const [selectedTab, setSeletedTab] = useState(LeftMenuTabs.Materials);

  const renderTabs = useCallback(() => {
    switch (selectedTab) {
      default:
      case LeftMenuTabs.Nodes:
        return <NodesTab nodesList={loadedMeshData.nodes} />;
      case LeftMenuTabs.Materials:
        return <MaterialTab materialList={loadedMeshData.materials} />;
    }
  }, [selectedTab, loadedMeshData.nodes, loadedMeshData.materials]);

  return <>{renderTabs()}</>;
};

export default LeftSideMenu;
