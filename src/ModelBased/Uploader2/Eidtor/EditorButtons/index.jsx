import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Row, Col, Button } from "antd";
import ExportArea from "./ExportArea";
import CameraViews from "./CameraViews";

const { TabPane } = Tabs;

export const LeftMenuTabs = {
  Nodes: "NodesTab",
  Materials: "MaterialsTab",
};

const EditorButtons = (props) => {
  const { loadedMeshData } = props;

  return (
    <div
      style={{ position: "fixed", zIndex: 1, width: "100%", height: "100%", pointerEvents:"none" }}
    >
      <ExportArea />
      <CameraViews />
    </div>
  );
};

export default EditorButtons;
