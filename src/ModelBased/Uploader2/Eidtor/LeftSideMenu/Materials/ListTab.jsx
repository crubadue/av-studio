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
  );
};

export default ListTab;
