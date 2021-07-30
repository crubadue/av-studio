import React, { useCallback, useEffect, useState, useContext } from "react";
import { Tabs, Divider, Select, Row, Col, Popover, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { GmContext } from "../../../../components/renderingZone";

import "./index.css";

const { Option } = Select;

const Channels = (props) => {
  const { selectedMaterial } = props;
  const { channels } = selectedMaterial.options;
  const gameManager = useContext(GmContext);

  console.log("seeeeee", selectedMaterial);
  const content = (index) => {
    console.log("pp===", index);
    return (
      <div>
        <Button style={{ marginRight: "5px" }} danger>
          Remove
        </Button>
        <Button type="text">Upload</Button>
      </div>
    );
  };

  return (
    <Row
      style={{
        justifyContent: "center",
        overflow: "hidden",
        width: "100%",
        // padding: "1px",
        padding: "0em 1em 0px 0.7em",
      }}
    >
      {Object.values(channels).map((channel, index) => (
        <Row key={channel.id} style={{ width: "100%", padding: "5px 0px" }}>
          <Col span={17} className="channelText">
            {channel.name}
          </Col>
          <Col span={7}>
            <div className="divHolder">
              <div className="channelImg">
                <img
                  style={{ height: "100%", borderRadius: "5px" }}
                  src={channel.img}
                ></img>
              </div>
              <Popover trigger="click" content={content(index)}>
                <EditOutlined style={{ fontSize: "20px", color: "white" }} />
              </Popover>
            </div>
          </Col>
        </Row>
      ))}
    </Row>
  );
};

export default Channels;
