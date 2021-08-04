import React, { useContext, useCallback, useEffect, useState } from "react";
import { Tabs, Row, Col } from "antd";
import MaterialButton from "./MaterialButton";
import { GmContext } from "../../../components/renderingZone";

const { TabPane } = Tabs;

const ListTab = (props) => {
  const {
    isLoading,
    materialList,
    selectedMaterial,
    setSelectedMaterial,
    setIsLoading,
  } = props;
  // const [clickedMat, setClickedMat] = useState(null);
  const gameManager = useContext(GmContext);

  // console.log("material lit ", materialList);
  function onSelectMaterial(clickedMat) {
    setIsLoading(true);

    const onLoadTextuers = (channelsOpts) => {
      //set init mat options
      console.log("channelsOpts", channelsOpts);
      setSelectedMaterial({
        ...clickedMat,
        options: { ...clickedMat.options, ...channelsOpts },
      });
      setIsLoading(false);
    };

    let initMatOpts = gameManager.studioSceneManager.getMaterialOptions(
      clickedMat.id,
      onLoadTextuers
    );
    //set init mat options
    setSelectedMaterial({
      ...clickedMat,
      options: { ...initMatOpts },
    });

    // setClickedMat(matId);
  }

  // useEffect(() => {
  //   if (isLoading) {
  //     console.log("iiii", isLoading);
  //     const onLoadTextuers = (channelsOpts) => {
  //       //set init mat options
  //       console.log("channelsOpts", channelsOpts);
  //       setSelectedMaterial({
  //         ...clickedMat,
  //         options: { ...clickedMat.options, ...channelsOpts },
  //       });
  //       setIsLoading(false);
  //     };

  //     let initMatOpts = gameManager.studioSceneManager.getMaterialOptions(
  //       clickedMat.id,
  //       onLoadTextuers
  //     );
  //     //set init mat options
  //     setSelectedMaterial({
  //       ...clickedMat,
  //       options: { ...initMatOpts },
  //     });
  //   }
  // }, [isLoading]);

  return (
    <Row
      style={{
        width: "100%",
        padding: "1% 3%",
        justifyContent: "center",
        maxHeight: "100%",
        overflow: "auto",
      }}
    >
      {materialList.map((material, index) => {
        return (
          <Col key={index} span={20} style={{ marginBottom: "10px" }}>
            <MaterialButton
              material={material}
              selectedMaterial={selectedMaterial}
              onSelectMaterial={onSelectMaterial}
            ></MaterialButton>
          </Col>
        );
      })}
    </Row>
  );
};

export default ListTab;
