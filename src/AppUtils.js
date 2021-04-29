export const AppTabsEnum = {
    ImageBasedTab: "imageBasedTab",
    ModelBasedTab: "modelBasedTab",
};

export const ModelTabsEnum = {
    Uploader: "uploadTab",
    Editor: "editorTab",
};

export const MaterialsTypes = {
    PBRMaterial: "PBRMaterial",
    StandardMaterial: "StandardMaterial",
};
export const MaterialAttributeTypes = {
    Value: "Value",
    Color: "Color",
};

export const PBRMaterialAttributes  = {
    Metallic:"metallic",
    Roughness:"roughness",
    AlbedoColor:"albedoColor",
}
export const StandardMaterialAttributes  = {
    DiffuseColor:"diffuseColor",
}

export const HDRList = [
    {
      id: "defaultEnvironment",
      name: "Default Environment",
      image: "./Ui/Hdrs/environment.jpg",
      env: "./environments/defaultEnvironment.env",
    },
    {
      id: "tunnel",
      name: "Tunnel",
      image: "./Ui/Hdrs/tunnel.jpg",
      env: "./environments/tunnel.env",
    },
    {
      id: "cityNight",
      name: "City Night",
      image: "./Ui/Hdrs/cityNight.jpg",
      env: "./environments/cityNight.env",
    },
    {
      id: "path",
      name: "Path",
      image: "./Ui/Hdrs/path.jpg",
      env: "./environments/path.env",
    },
];

export const EnvironmentKeys = {
    intensity:"environmentIntensity"
}
  