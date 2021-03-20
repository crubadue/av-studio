import React, { useCallback, useContext, useMemo, useState } from "react";
import { Col, Row, Slider, Switch, Typography, Divider, Popover } from "antd";
import { SketchPicker } from "react-color";
import {
  MaterialsTypes,
  MaterialAttributeTypes,
  PBRMaterialAttributes,
  StandardMaterialAttributes,
} from "../../../../../AppUtils";
import { GmContext } from "../../../components/renderingZone";

const { Title } = Typography;

const EditTab = (props) => {
  const { selectedMaterial } = props;
  const [background, setBackground] = useState(selectedMaterial.options.mainColor);
  const gameManager = useContext(GmContext);

  // console.log("sds", selectedMaterial);

  const isStandardMaterial = useMemo(() => {
    return selectedMaterial === MaterialsTypes.StandardMaterial ? true : false;
  }, [selectedMaterial]);

  const handleOnOptionChange = useCallback(
    //Slides only
    (attributeId, value) => {
      console.log("gg", gameManager, "---", attributeId, "---->", value);
      gameManager.studioSceneManager.handleOnChangeMaterialOption(
        selectedMaterial.id,
        {
          id: attributeId,
          type: MaterialAttributeTypes.Value,
          value: value,
        }
      );
    },
    [gameManager, selectedMaterial.id]
  );

  const handleOnColorChange = useCallback(
    (color) => {
      console.log(`selected ${color.hex}`);
      gameManager.studioSceneManager.handleOnChangeMaterialOption(
        selectedMaterial.id,
        {
          id: isStandardMaterial
            ? StandardMaterialAttributes.DiffuseColor
            : PBRMaterialAttributes.AlbedoColor,
          type: MaterialAttributeTypes.Color,
          value: color.hex,
        }
      );
      setBackground(color.hex);
    },
    [gameManager, selectedMaterial.id, isStandardMaterial]
  );

  return (
    <Row
      style={{
        padding: "15px 15px",
        overflow: "hidden",
        border: "1px solid #fff",
        margin:"20px 10px",
        marginTop:"20px"
        // maxHeight: "calc(100% - 52px)",
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
        {!isStandardMaterial && (
          <>
            <Col span={24}>
              <Title level={5}> Metallic </Title>
            </Col>
            <Col offset={2} span={20}>
              <Slider
                defaultValue={selectedMaterial.options.metallic}
                min={0}
                max={1}
                step={0.01}
                style={{ width: "100%" }}
                onChange={(value) => {
                  handleOnOptionChange(PBRMaterialAttributes.Metallic, value);
                }}
              />
            </Col>
            <Col span={24}>
              <Title level={5}> Roughness </Title>
            </Col>
            <Col offset={2} span={20}>
              <Slider
                defaultValue={selectedMaterial.options.roughness}
                min={0}
                max={1}
                step={0.01}
                style={{ width: "100%" }}
                onChange={(value) => {
                  handleOnOptionChange(PBRMaterialAttributes.Roughness, value);
                }}
              />
            </Col>
          </>
        )}
        <Col span={24}>
          <Title level={5}>
            {" "}
            {isStandardMaterial ? "Diffuse Color" : "Albedo Color"}{" "}
          </Title>
        </Col>
        <Col offset={4} span={16}>
          <Popover
            content={
              <SketchPicker
                color={background}
                onChangeComplete={handleOnColorChange}
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
