import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Row, Col } from "antd";
import MaterialButton from "./MaterialButton";

const { TabPane } = Tabs;

const ListTab = (props) => {
  const { materialList, selectedMaterial, setSelectedMaterial } = props;
  function callback(key) {
    console.log(key);
  }
  return (
    <Tabs onChange={callback} type="card" style={{ height: "100%" }}>
      <TabPane tab="Materials" key="1" style={{ height: "100%" }}>
        <Row
          style={{
            width: "100%",
            padding: "1% 3%",
            justifyContent: "center",
            maxHeight: "100%",
            overflow: "auto",
          }}
        >
          {materialList.map((material, index) => {
            return (
              <Col key={index} span={20} style={{ marginBottom: "10px" }}>
                <MaterialButton
                  material={material}
                  selectedMaterial={selectedMaterial}
                  setSelectedMaterial={setSelectedMaterial}
                ></MaterialButton>
              </Col>
            );
          })}
        </Row>
      </TabPane>
    </Tabs>
  );
};

export default ListTab;
