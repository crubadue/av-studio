import React, { useCallback, useContext, useMemo, useState } from "react";
import { Col, Row, Slider, Switch, Typography, Divider, Popover } from "antd";
import { SketchPicker } from "react-color";
import {
  MaterialsTypes,
  MaterialAttributeTypes,
  PBRMaterialAttributes,
  StandardMaterialAttributes,
} from "../../../../../../AppUtils";
import { GmContext } from "../../../../components/renderingZone";

const { Title } = Typography;

const EditTab = (props) => {
  const { selectedMaterial } = props;
  const { attributes } = selectedMaterial.options;

  // console.log("attributes", attributes);

  const isStandardMaterial = useMemo(() => {
    return selectedMaterial.type === MaterialsTypes.StandardMaterial
      ? true
      : false;
  }, [selectedMaterial]);

  const [background, setBackground] = useState(
    !isStandardMaterial
      ? attributes.albedoColor.value
      : attributes.diffuseColor.value
  );
  const gameManager = useContext(GmContext);

  const handleOnOptionChange = useCallback(
    //Slides only
    (attributeId, attributeType, value) => {
      gameManager.studioSceneManager.handleOnChangeMaterialOption(
        selectedMaterial.id,
        {
          id: attributeId,
          type: attributeType,
          value: value,
        }
      );
      if (attributeType === MaterialAttributeTypes.Color) setBackground(value);
    },
    [gameManager, selectedMaterial.id]
  );

  // const handleOnColorChange = useCallback(
  //   (color) => {
  //     console.log(`selected ${color.hex}`);
  //     gameManager.studioSceneManager.handleOnChangeMaterialOption(
  //       selectedMaterial.id,
  //       {
  //         id: isStandardMaterial
  //           ? StandardMaterialAttributes.DiffuseColor
  //           : PBRMaterialAttributes.AlbedoColor,
  //         type: MaterialAttributeTypes.Color,
  //         value: color.hex,
  //       }
  //     );
  //     setBackground(color.hex);
  //   },
  //   [gameManager, selectedMaterial.id, isStandardMaterial]
  // );

  const getAttributeComponentByType = useCallback(
    (attribute) => {
      const { id, type, name, value } = attribute;
      switch (type) {
        case MaterialAttributeTypes.Value:
          return (
            <Col offset={2} span={20} key={id}>
              <Slider
                defaultValue={value}
                min={0}
                max={1}
                step={0.01}
                style={{ width: "100%" }}
                onChange={(value) => {
                  handleOnOptionChange(id, type, value);
                }}
              />
            </Col>
          );
        case MaterialAttributeTypes.Color:
          return (
            <Col offset={4} span={16} key={id}>
              <Popover
                content={
                  <SketchPicker
                    color={background}
                    onChangeComplete={(color) =>
                      handleOnOptionChange(id, type, color.hex)
                    }
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
          );
        default:
          break;
      }
    },
    [background]
  );

  return (
    <Row
      style={{
        overflow: "hidden",
        margin: "2.5em 1em 0px .7em",
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
        {Object.values(attributes).map((attribute) => (
          <div style={{ width: "100%" }} key={attribute.id}>
            <Col span={24}>
              <Title level={5}> {attribute.name} </Title>
            </Col>
            {getAttributeComponentByType(attribute)}
          </div>
        ))}
        {/* {!isStandardMaterial && (
          <>
            // //
            <Col span={24}>
              <Title level={5}> Roughness </Title>
            </Col>
            <Col offset={2} span={20}>
              <Slider
                defaultValue={selectedMaterial.options.colors.roughness}
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
        </Col> */}
      </Row>
    </Row>
  );
};

export default EditTab;
