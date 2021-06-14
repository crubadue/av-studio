import React, { useCallback, useEffect, useState } from "react";
import NodesTab from "./Nodes";
import { Tabs, Row, Col } from "antd";
import MaterialTab from "./Materials";
import SettingsTab from "./Settings";
import PropertiesTab from "./Properties";

const { TabPane } = Tabs;

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

  function onChange(key) {
    console.log(key);
    
  }

  return (
    <>
      <Tabs onChange={onChange} type="card" style={{ height: "100%" }}>
        <TabPane tab="Materials" key="1" style={{ height: "100%" }}>
          <MaterialTab materialList={loadedMeshData.materials} />
        </TabPane>
        <TabPane tab="Settings" key="2" style={{ height: "100%" }}>
          <SettingsTab materialList={loadedMeshData.materials} />
        </TabPane>
        <TabPane tab="Properties" key="3" style={{ height: "100%" }}>
          <PropertiesTab materialList={loadedMeshData.materials} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default LeftSideMenu;
