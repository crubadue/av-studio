import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Row, Col } from "antd";
import MaterialButton from "./MaterialButton";

const { TabPane } = Tabs;
const data = [
  "Material 1",
  "Material 2",
  "Material 3",
  "Material 4",
  "Material 5",
  "Material 6",
  "Material 7",
  "Material 8",
  "Material 9",
  "Material 10",
  "Material 11",
  "Material 12",
  "Material 13",
  "Material 14",
];
const ListTab = (props) => {
  const { selectedMaterial, setSelectedMaterial } = props;
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
          {data.map((ele, index) => {
            return (
              <Col key={index} span={20} style={{ marginBottom: "10px" }}>
                <MaterialButton
                  data={ele}
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
