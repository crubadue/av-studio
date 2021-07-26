import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Divider, Select, Row, Col } from "antd";

import EditTab from "./EditTab";
import LinkTab from "./LinkTab";

const { Option } = Select;


export const MaterialTabs = {
  EditTab: "Edit",
  LinkTab: "Link",
};

const ColorTab = (props) => {
  const { selectedMaterial } = props;
  const [selectedTab, setSeletedTab] = useState(MaterialTabs.EditTab);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSeletedTab(value);
  };
  return (
    <Row
      style={{
        justifyContent: "center",
        overflow: "hidden",
        width: "100%",
        padding: "1px",
      }}
    >
      <Row style={{ width: "100%" }}>
        <Col offset={2} span={20}>
          <Select
            defaultValue="Edit"
            style={{ width: "100%" }}
            onChange={handleChange}
          >
            {Object.values(MaterialTabs).map((tab) => (
              <Option key={tab} value={tab}>
                {tab}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <div
        style={{
          overflow: "hidden",
          maxHeight: "calc(100% - 23px)",
          width:"100%"
        }}
      >
        {selectedTab === MaterialTabs.EditTab ? (
          <EditTab selectedMaterial={selectedMaterial} />
        ) : (
          <LinkTab />
        )}
      </div>
    </Row>
  );
};

export default ColorTab;
