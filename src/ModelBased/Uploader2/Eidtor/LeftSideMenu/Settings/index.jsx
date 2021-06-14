import React, { useCallback, useContext, useMemo, useState } from "react";
import { Col, Row, Select, Typography, Slider, Switch, Popover } from "antd";
import "./index.css";
import { HDRList, EnvironmentKeys } from "../../../../../AppUtils";
import { GmContext } from "../../../components/renderingZone";

const { Title, Text } = Typography;
const { Option } = Select;


const imagePlaceHolder = "./hdri/imagePlaceHolder.png";

const SettingsTab = (props) => {
  const { selectedMaterial } = props;
  const [selectedOpt, setSelectedOpt] = useState(
    HDRList.length ? HDRList[0].id : ""
  );
  const [isBackground, setIsBackground] = useState(true);

  const gameManager = useContext(GmContext);

  function handleEnvChange(value) {
    setSelectedOpt(value);
    gameManager.studioSceneManager.applySceneEnvironment(value);
  }
  function handleSliderChange(key, value) {
    gameManager.studioSceneManager.customizeSceneEnvironment(key, value);
  }

  const onToggleBackground = useCallback((checked) => {
    setIsBackground(checked);
    gameManager.studioSceneManager.toggleSkyBoxBackground(checked);
  }, []);

  function handleBlurSliderChange(value) {
    gameManager.studioSceneManager.controlSkyBoxBlur(value);
  }

  return (
    <Row style={{ padding: "8%", width: "100%" }}>
      <Col span={24}>
        <Select
          defaultValue={HDRList.length ? HDRList[0].id : ""}
          style={{ width: "100%" }}
          onChange={handleEnvChange}
          listHeight={window.innerHeight / 1.3}
          // open={true}
        >
          {HDRList.map((hdrObj) => (
            <Option
              key={hdrObj.id}
              value={hdrObj.id}
              style={{
                height: "25vh",
                maxHeight: "240px",
                padding: "10px",
              }}
              className="optbb"
            >
              <div
                style={{
                  backgroundImage: `url(${hdrObj.image})`,
                  backgroundRepeat: "round",
                  width: "100%",
                  height: "100%",
                }}
              >
                <div style={{ backgroundColor: "#3a3f4b", padding: "0.2px" }}>
                  <p>{hdrObj.name}</p>
                </div>
              </div>
            </Option>
          ))}
        </Select>
        <img
          style={{
            marginTop: "2vh",
            width: "100%",
            border: "2px solid #949494",
          }}
          src={
            HDRList.find((hdr) => hdr.id === selectedOpt).image ||
            imagePlaceHolder
          }
          alt="Paris"
        ></img>
      </Col>
      <Col span={24}>
        <div key={selectedOpt} style={{ width: "100%", marginTop: "5vh" }}>
          <Text type="secondary" className="slideText">
            Intensity :
          </Text>
          <Slider
            defaultValue={1}
            min={0.1}
            max={3}
            step={0.1}
            onChange={(value) =>
              handleSliderChange(EnvironmentKeys.intensity, value)
            }
          />
        </div>
      </Col>
      <Col span={24}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            marginTop: "3vh",
          }}
        >
          <Text type="secondary" className="slideText">
            Show as Background :
          </Text>
          <Switch
            style={{ marginTop: "5px" }}
            defaultChecked
            checked={isBackground}
            onChange={onToggleBackground}
          />
          {/* <Checkbox style={{ marginTop: "5px" }} defaultChecked /> */}
        </div>
      </Col>
      {isBackground && (
        <Col span={24}>
          <div
            style={{
              width: "100%",
              marginTop: "3vh",
            }}
          >
            <Text type="secondary" className="slideText">
              Blur :
            </Text>
            <Slider
              defaultValue={0.5}
              min={0}
              max={1}
              step={0.1}
              onChange={handleBlurSliderChange}
            />
          </div>
        </Col>
      )}
    </Row>
  );
};

export default SettingsTab;
