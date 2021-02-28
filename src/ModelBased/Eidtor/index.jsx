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

//Components
import BabylonManager from "../../BabylonManager";
//
const gmRef = createRef(null);
export const GmContext = createContext(null);
//

const Eidtor = (props) => {
  const {modelFile} = props;
  const [gameManager, setGameManager] = useState(null);

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
    };
  }, []);

  useEffect(() => {
    const GManger = BabylonManager(gmRef.current).GManger; //Create Babylonjs Ref
    GManger.studioSceneManager.handlers = studioSceneHandlers; //Hnadlers
    GManger.studioSceneManager.handleLoadMeshByURL(modelFile);
    setGameManager(GManger);
  }, [setGameManager, studioSceneHandlers]);

  return (
    <GmContext.Provider value={gameManager}>
      {
        <Row style={{ height: "100%" }} type="flex">
          <Col
            span={24}
            style={{
              height: "100%",
              // background:
              //   "radial-gradient(at top, #0c71c3 0%, #074a81 100%) top",
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
