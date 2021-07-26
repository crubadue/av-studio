import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Divider, Select, Row, Col, Popover, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

import "./index.css";

const { Option } = Select;

const Channels = (props) => {
  const { selectedMaterial } = props;
  const { channels } = selectedMaterial.options;

  console.log("seeeeee", selectedMaterial);
  const content = (
    <div>
      <Button style={{ marginRight: "5px" }} danger>
        Remove
      </Button>
      <Button type="text">Upload</Button>
    </div>
  );

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
      <Row style={{ width: "100%", padding: "5px 0px" }}>
        <Col span={17} className="channelText">
          Albdeo Texture
        </Col>
        <Col span={7}>
          <div className="divHolder">
            <div className="channelImg">
              <img
                style={{ width: "100%", height: "100%", borderRadius: "5px" }}
                src={channels.albdeoTexture.img}
              ></img>
            </div>
            <Popover trigger="click" content={content}>
              <EditOutlined style={{ fontSize: "20px", color: "white" }} />
            </Popover>
          </div>
        </Col>
      </Row>
      <Row style={{ width: "100%", padding: "5px 0px" }}>
        <Col span={17} className="channelText">
          Metallic Texture
        </Col>
        <Col span={7}>
          <div className="divHolder">
            <div className="channelImg">
              <img
                style={{ width: "100%", height: "100%", borderRadius: "5px" }}
                src={channels.metallicTexture.img}
              ></img>
            </div>
            <Popover trigger="click" content={content}>
              <EditOutlined style={{ fontSize: "20px", color: "white" }} />
            </Popover>
          </div>
        </Col>
      </Row>
    </Row>
  );
};

export default Channels;
