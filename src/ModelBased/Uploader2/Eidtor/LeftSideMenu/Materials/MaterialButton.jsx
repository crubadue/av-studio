import React, { useEffect, useContext, useMemo } from "react";
import { Button } from "antd";
import { FormatPainterOutlined } from "@ant-design/icons";
import "../../../../../index.css";
import { GmContext } from "../../../components/renderingZone";

const ListTab = (props) => {
  const { material, selectedMaterial, onSelectMaterial } =
    props;

  const isSelected = useMemo(() => {
    return selectedMaterial?.id === material.id ? true : false;
  }, [material, selectedMaterial]);

  return (
    <Button
      type={isSelected ? "primary" : "text"}
      icon={<FormatPainterOutlined />}
      style={{
        width: "100%",
        height: "48px",
      }}
      onClick={() => onSelectMaterial(material)}
    >
      {material.name}
    </Button>
  );
};

export default ListTab;
