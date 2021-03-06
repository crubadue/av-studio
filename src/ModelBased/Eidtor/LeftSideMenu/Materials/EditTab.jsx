import React, { useCallback, useEffect, useState } from "react";
import { Col, Row, Slider, Switch, Typography, Divider, Popover } from "antd";
import { SketchPicker } from "react-color";

const { Title } = Typography;

const EditTab = (props) => {
  const [background, setBackground] = useState("#3e90ff");

  const handleChangeComplete = (color) => {
    console.log(`selected ${color.hex}`);
    setBackground(color.hex);
  };

  return (
    <Row
      style={{
        padding: "15px 15px",
        overflow: "hidden",
        border: "1px solid #fff",
        margin: "20px 10px",
        maxHeight: "calc(100% - 52px)",
        // height: "calc(100% - 30px)",
      }}
    >
      <Col span={24}>
        <h5 style={{ color: "#cacad4" }}>Edit Tab</h5>
        <Divider style={{ margin: "10px 0 15px" }} />
      </Col>
      <Row
        style={{
          width: "100%",
          maxHeight: "85%",
          overflow: "auto",
          margin: "0px 0px 15px",
        }}
      >
        <Col span={24}>
          <Title level={5}> Metallic </Title>
        </Col>
        <Col offset={2} span={20}>
          <Slider defaultValue={30} style={{ width: "100%" }} />
        </Col>
        <Col span={24}>
          <Title level={5}> Roughness </Title>
        </Col>
        <Col offset={2} span={20}>
          <Slider defaultValue={30} style={{ width: "100%" }} />
        </Col>
        <Col span={24}>
          <Title level={5}> Albedo Color </Title>
        </Col>
        <Col offset={4} span={16}>
          <Popover
            content={
              <SketchPicker
                color={background}
                onChangeComplete={handleChangeComplete}
              />
            }
            trigger="click"
          >
            <div
              title="#0693E3"
              style={{
                background: background,
                height: "30px",
                width: "100%",
                cursor: "pointer",
                outline: "none",
                float: "left",
                borderRadius: "4px",
                margin: "0px 6px 6px 0px",
                border: "5px solid #fff",
              }}
            ></div>
          </Popover>
        </Col>
      </Row>
    </Row>
  );
};

export default EditTab;
