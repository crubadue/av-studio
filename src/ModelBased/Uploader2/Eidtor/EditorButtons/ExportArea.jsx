import React, { useContext, useEffect, useState } from "react";
import { Tabs, Row, Col, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { GmContext } from "../../components/renderingZone";

const { TabPane } = Tabs;

const ExportArea = (props) => {
  const GManager = useContext(GmContext);

  return (
    <div
      style={{
        position: "fixed",
        width: "220px",
        height: "75px",
        bottom: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-around",
        margin: "20px",
        pointerEvents:"all"
      }}
    >
      <Button
        type="primary"
        shape="circle"
        icon={<DownloadOutlined />}
        size={"large"}
        style={{
          width: "70px",
          height: "70px",
          fontSize: "30px",
        }}
        onClick={() => {
          GManager?.studioSceneManager.downloadGltfModel(false);
          //
        }}
      />
      <Button
        type="primary"
        shape="circle"
        icon={<DownloadOutlined />}
        size={"large"}
        style={{
          width: "70px",
          height: "70px",
          fontSize: "30px",
        }}
        onClick={() => {
          GManager?.studioSceneManager.downloadGltfModel(true);
          //
        }}
      />
    </div>
  );
};

export default ExportArea;
