import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "antd";
import { FormatPainterOutlined } from "@ant-design/icons";
import "../../../../index.css";

const ListTab = (props) => {
  const { data, selectedMaterial, setSelectedMaterial } = props;

  const isSelected = useMemo(() => {
    return selectedMaterial === data ? true : false;
  }, [data, selectedMaterial]);

  console.log("Sds", isSelected);
  return (
    <Button
      type={isSelected ? "primary" : "text"}
      icon={<FormatPainterOutlined />}
      style={{
        width: "100%",
        height: "48px",
      }}
      onClick={() => {
        setSelectedMaterial(data);
      }}
    >
      {data}
    </Button>
  );
};

export default ListTab;
