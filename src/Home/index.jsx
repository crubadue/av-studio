import React, { useCallback, useState } from "react";
import ImageBased from "../ImageBased";
import ModelBased from "../ModelBased";

import { AppTabsEnum } from "../AppUtils";

const Home = (props) => {
  const [selectedTab, setSeletedTab] = useState(AppTabsEnum.ModelBasedTab);

  const renderTabs = useCallback(() => {
    switch (selectedTab) {
      default:
      case AppTabsEnum.ImageBasedTab:
        return <ImageBased />;
      case AppTabsEnum.ModelBasedTab:
        return <ModelBased />;
    }
  }, [selectedTab]);

  return <>{renderTabs()}</>;
};

export default Home;

