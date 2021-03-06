import React, { useCallback, useEffect, useState } from "react";
import { Col, Row, Typography, Divider, Slider, Card } from "antd";
import "../../../../index.css";
import "./mine.css";

const { Title } = Typography;
const { Meta } = Card;

const LinkTab = (props) => {
  const data = [
    { name: "example 1", img: "Africanteakpolished.jpg" },
    { name: "example 2", img: "CarbonFiber.jpg" },
    { name: "example 3", img: "CarpetBlack.jpg" },
    { name: "example 4", img: "DarkBlueGlass.jpg" },
    { name: "example 5", img: "DarkGreenGlass.jpg" },
    { name: "example 6", img: "PlasticAqua.jpg" },
    { name: "example 7", img: "SatinAluminum.jpg" },
  ];

  return (
    <Row
      style={{
        padding: "15px 15px",
        overflow: "hidden",
        border: "1px solid #fff",
        margin: "20px 10px",
        // height: "calc(100% - 30px)",
        // width: "100%",
      }}
    >
      <Col span={24}>
        <h5 style={{ color: "#cacad4" }}>Link Tab</h5>
        <Divider style={{ margin: "10px 0 15px" }} />
      </Col>
      {/* backgroundImage:`url(${component.imagePath})`, */}
      <Row
        style={{
          width: "100%",
          justifyContent: "flex-start",
          overflow: "auto",
          maxHeight: "80%",
        }}
      >
        {data.map((mat, index) => (
          <div
            key={index}
            className="matButton"
            style={{
              backgroundImage: `url(/Ui/${mat.img})`,
            }}
          ></div>
        ))}
      </Row>
    </Row>
  );
};

export default LinkTab;
