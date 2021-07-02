import React, { useContext, useEffect, useState } from "react";
import { Tabs, Row, Col, Button } from "antd";
import { GmContext } from "../../components/renderingZone";

const CameraViews = (props) => {
  const GManager = useContext(GmContext);

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 1,
        width: "200px",
        height: "120px",
        right: 0,
        top: 0,
        pointerEvents: "all",
        display: "grid",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => {
            GManager?.studioSceneManager.setCameraViewBySide(0);
          }}
          type="primary"
        >
          F
        </Button>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Button
          onClick={() => {
            GManager?.studioSceneManager.setCameraViewBySide(1);
          }}
          type="primary"
        >
          L
        </Button>
        <Button
          onClick={() => {
            GManager?.studioSceneManager.setCameraViewBySide(3);
          }}
          type="primary"
        >
          C
        </Button>
        <Button
          onClick={() => {
            GManager?.studioSceneManager.setCameraViewBySide(2);
          }}
          type="primary"
        >
          R
        </Button>
      </div>
      {/* <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button type="primary">B</Button>
      </div> */}
    </div>
  );
};

export default CameraViews;
