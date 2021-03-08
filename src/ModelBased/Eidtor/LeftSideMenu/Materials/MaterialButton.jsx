import React, { useContext, useMemo } from "react";
import { Button } from "antd";
import { FormatPainterOutlined } from "@ant-design/icons";
import "../../../../index.css";
import { GmContext } from "../../../Eidtor";

const ListTab = (props) => {
  const { material, selectedMaterial, setSelectedMaterial } = props;
  const gameManager = useContext(GmContext);

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
      onClick={() => {
        let materialOptions = gameManager.studioSceneManager.getMaterialOptions(
          material.id
        );
        setSelectedMaterial({ ...material, options: { ...materialOptions } });
      }}
    >
      {material.name}
    </Button>
  );
};

export default ListTab;
