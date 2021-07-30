import React, { useCallback, useEffect, useState } from "react";
import { Divider, Collapse, Spin } from "antd";

import ListTab from "./ListTab";
import ColorTab from "./Color";
import Channels from "./Channels";

const { Panel } = Collapse;

const MaterialTab = (props) => {
  const { materialList } = props;
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log("selectedMaterial ===> ", selectedMaterial);
  return (
    <>
      <div style={{ height: "40%" }}>
        <ListTab
          isLoading={isLoading}
          materialList={materialList}
          selectedMaterial={selectedMaterial}
          setSelectedMaterial={setSelectedMaterial}
          setIsLoading={setIsLoading}
        />
      </div>
      {selectedMaterial && ( //Bottom Part
        <div key={selectedMaterial.id} style={{ height: "60%" }}>
          <Divider orientation="left" style={{ color: "#3e90ff" }}>
            {selectedMaterial.name}
          </Divider>
          <div
            style={{
              padding: "5px 2%",
              overflow: "auto",
              height: "calc(100% - 60px)",
            }}
          >
            <Spin spinning={isLoading}>
              <Collapse defaultActiveKey={["1"]}>
                <Panel header="Colors" key="1">
                  <ColorTab selectedMaterial={selectedMaterial} />
                </Panel>
                <Panel header="Channels" key="2">
                  <Channels selectedMaterial={selectedMaterial} />
                </Panel>
              </Collapse>
            </Spin>
          </div>
        </div>
      )}
    </>
  );
};

export default MaterialTab;
