import React, { useContext, useMemo } from "react";
import { Button } from "antd";
import { FormatPainterOutlined } from "@ant-design/icons";
import "../../../../../index.css";
import { GmContext } from "../../../components/renderingZone";

const ListTab = (props) => {
  const { material, selectedMaterial, setSelectedMaterial, setIsLoading } =
    props;
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
        setIsLoading(true);
        gameManager.studioSceneManager
          .getMaterialOptions(material.id)
          .then((materialOptions) => {
            setSelectedMaterial({
              ...material,
              options: { ...materialOptions },
            });
            setIsLoading(false);
          });
      }}
    >
      {material.name}
    </Button>
  );
};

export default ListTab;
