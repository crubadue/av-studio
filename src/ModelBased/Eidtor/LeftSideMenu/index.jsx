import React, { useCallback, useEffect, useState } from "react";
import NodesTab from "./Nodes";
import MaterialTab from "./Materials";

export const LeftMenuTabs = {
    Nodes: "NodesTab",
    Materials: "MaterialsTab",
};

const LeftSideMenu = (props) => {
  const [selectedTab, setSeletedTab] = useState(LeftMenuTabs.Materials);

  const renderTabs = useCallback(() => {
    switch (selectedTab) {
      default:
      case LeftMenuTabs.Nodes:
        return <NodesTab />;
      case LeftMenuTabs.Materials:
        return <MaterialTab  />;
    }
  }, [selectedTab]);
  return <>{renderTabs()}</>;
};

export default LeftSideMenu;
