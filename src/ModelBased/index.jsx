import React, { useCallback, useState } from "react";
import Eidtor from "../ModelBased/Eidtor";
import Uploader from "../ModelBased/Uploader";

import { ModelTabsEnum } from "../AppUtils";

const ImageBased = (props) => {
  const [selectedTab, setSeletedTab] = useState(ModelTabsEnum.Uploader);

  const renderTabs = useCallback(() => {
    switch (selectedTab) {
      default:
      case ModelTabsEnum.Uploader:
        return <Uploader />;
      case ModelTabsEnum.Editor :
        return <Eidtor />;
    }
  }, [selectedTab]);
  return <>{renderTabs()}</>;
};

export default ImageBased;
