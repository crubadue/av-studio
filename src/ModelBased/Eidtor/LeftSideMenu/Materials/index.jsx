import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Divider, Select, Row, Col } from "antd";

import ListTab from "./ListTab";
import EditTab from "./EditTab";
import LinkTab from "./LinkTab";

const { TabPane } = Tabs;
const { Option } = Select;

export const MaterialTabs = {
  EditTab: "Edit",
  LinkTab: "Link",
};

const MaterialTab = (props) => {
  const [selectedTab, setSeletedTab] = useState(MaterialTabs.EditTab);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSeletedTab(value);
  };

  const callback = (key) => {
    console.log(key);
  };

  console.log("selectedTab", selectedTab);
  return (
    <>
      <div style={{ height: "40%" }}>
        <ListTab selectedMaterial={selectedMaterial} setSelectedMaterial={setSelectedMaterial} />
      </div>
      {selectedMaterial && (
        <div style={{ height: "60%" }}>
          <Divider orientation="left" style={{ color: "#3e90ff" }}>
            {selectedMaterial}
          </Divider>
          <div
            style={{
              padding: "5px",
              overflow: "auto",
              height: "calc(100% - 60px)",
            }}
          >
            <Row
              style={{
                justifyContent: "flex-start",
                overflow: "hidden",
                width: "100%",
                // maxHeight: "100%",
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
                }}
              >
                {selectedTab === MaterialTabs.EditTab ? (
                  <EditTab />
                ) : (
                  <LinkTab />
                )}
              </div>
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

export default MaterialTab;
