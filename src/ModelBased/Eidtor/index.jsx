import React, {
  createRef,
  createContext,
  useEffect,
  useCallback,
  useState,
  useMemo,
} from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { Typography, Spin, Layout, Menu, Button } from "antd";
import LeftSideMenu from "./LeftSideMenu";

//Components
import BabylonManager from "../../BabylonManager";
//
const gmRef = createRef(null);
export const GmContext = createContext(null);
//

const Eidtor = (props) => {
  const { modelFile } = props;
  const [gameManager, setGameManager] = useState(null);
  const [loadedMeshData, setLoadedMeshData] = useState(null); //data of loadedMesh

  const studioSceneHandlers = useMemo(() => {
    return {
      onSelect: (params) => {},
      onDrag: () => {
        console.log("Ui Drag Action !!");
      },
      onDrop: (newDockPoints) => {
        // console.log("Ui Drop Action !!", newDockPoints);
      },
      onDeselect: () => {},
      onLoadMesh: (meshData) => {
        setLoadedMeshData(meshData);
      },
    };
  }, []);

  useEffect(() => {
    const GManger = BabylonManager(gmRef.current).GManger; //Create Babylonjs Ref
    GManger.studioSceneManager.handlers = studioSceneHandlers; //Hnadlers
    GManger.studioSceneManager.handleLoadMeshByURL(
      modelFile,
      studioSceneHandlers.onLoadMesh
    );
    setGameManager(GManger);
  }, [setGameManager, studioSceneHandlers, modelFile]);

  console.log("loadedMeshData", loadedMeshData);
  return (
    <GmContext.Provider value={gameManager}>
      {
        <Row style={{ height: "100%" }} type="flex">
          <Col
            span={5}
            style={{
              height: "100%",
              backgroundColor: "#282c34",
              padding: "5px 3px",
              overflow: "hidden",
            }}
          >
            {loadedMeshData && <LeftSideMenu loadedMeshData={loadedMeshData} />}
          </Col>
          <Col
            span={19}
            style={{
              height: "100%",
            }}
          >
            <canvas {...{}} className="canvas" ref={gmRef} />
          </Col>
        </Row>
      }
    </GmContext.Provider>
  );
};

export default Eidtor;
