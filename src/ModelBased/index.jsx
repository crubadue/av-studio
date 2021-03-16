import React, { useCallback, useEffect, useState } from "react";
import Eidtor from "./Eidtor";
// import Uploader from "./Uploader";
import SandBox from './Uploader2/SandBox';

// import EditTab from "./EditTab";

import '../App.css';

import { ModelTabsEnum } from "../AppUtils";

const ImageBased = (props) => {
  const [selectedTab, setSeletedTab] = useState(ModelTabsEnum.Uploader);
  const [modelFile, setModelFile] = useState(null);

  // const
  console.log("modelUrl", modelFile);
  useEffect(() => {
    if (modelFile) setSeletedTab(ModelTabsEnum.Editor);
  }, [modelFile]);

  const renderTabs = useCallback(() => {
    switch (selectedTab) {
      default:
      case ModelTabsEnum.Uploader:
        return <SandBox/>
      case ModelTabsEnum.Editor:
        return <Eidtor modelFile={modelFile} />;
    }
  }, [selectedTab, modelFile, setModelFile]);
  return <>{renderTabs()}</>;
};

export default ImageBased;

// return <Uploader setModelFile={setModelFile} />;
