import React, { useContext, useCallback, useEffect, useState } from "react";
import { Divider, Collapse, Spin } from "antd";
import { GmContext } from "../../../components/renderingZone";

import ListTab from "./ListTab";
import ColorTab from "./Color";
import Channels from "./Channels";

const { Panel } = Collapse;

const MaterialTab = (props) => {
  const { materialList } = props;
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const gameManager = useContext(GmContext);

  console.log("selectedMaterial ===> ", selectedMaterial);

  const removeMaterialChannel = (channelId) => {
    //remove texture from channel (3d)
    gameManager.studioSceneManager.removeChannelTexture(
      selectedMaterial.id,
      channelId
    );
    //remove texture from channel (react)
    let selectedChannel = selectedMaterial.options.channels[channelId];
    selectedChannel.img = "";
    setSelectedMaterial((prevMat) => {
      return {
        ...prevMat,
        options: {
          ...prevMat.options,
          channels: {
            ...prevMat.options.channels,
            [channelId]: selectedChannel,
          },
        },
      };
    });
  };

  const updateMaterialChannels = (channelId, imgSrc) => {
    //update channel texture (3d)
    gameManager.studioSceneManager.updateChannelTexture(
      selectedMaterial.id,
      channelId,
      imgSrc
    );

    //update texture from channel (react)
    let selectedChannel = selectedMaterial.options.channels[channelId];
    selectedChannel.img = imgSrc;

    setSelectedMaterial((prevMat) => {
      return {
        ...prevMat,
        options: {
          ...prevMat.options,
          channels: {
            ...prevMat.options.channels,
            [channelId]: selectedChannel,
          },
        },
      };
    });
  };

  return (
    <>
      <div style={{ height: "40%" }}>
        <ListTab
          isLoading={isLoading}
          materialList={materialList}
          selectedMaterial={selectedMaterial}
          setSelectedMaterial={setSelectedMaterial}
          setIsLoading={setIsLoading}
        />
      </div>
      {selectedMaterial && ( //Bottom Part
        <div key={selectedMaterial.id} style={{ height: "60%" }}>
          <Divider orientation="left" style={{ color: "#3e90ff" }}>
            {selectedMaterial.name}
          </Divider>
          <div
            style={{
              padding: "5px 2%",
              overflow: "auto",
              height: "calc(100% - 60px)",
            }}
          >
            <Spin spinning={isLoading}>
              <Collapse defaultActiveKey={["1"]}>
                <Panel header="Colors" key="1">
                  <ColorTab selectedMaterial={selectedMaterial} />
                </Panel>
                <Panel header="Channels" key="2">
                  <Channels
                    updateMaterialChannels={updateMaterialChannels}
                    removeMaterialChannel={removeMaterialChannel}
                    selectedMaterial={selectedMaterial}
                  />
                </Panel>
              </Collapse>
            </Spin>
          </div>
        </div>
      )}
    </>
  );
};

export default MaterialTab;
