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

//Mat Attributes

//PBR
export const PBRMaterialAttributes = {
  Metallic: {
    id: "metallic",
    type: MaterialAttributeTypes.Value,
    name: "Metalic",
  },
  Roughness: {
    id: "roughness",
    type: MaterialAttributeTypes.Value,
    name: "Roughness",
  },
  AlbedoColor: {
    id: "albedoColor",
    type: MaterialAttributeTypes.Color,
    name: "Albedo Color",
  },
};

export const PBRChannels = {
  albedoTexture: "Albdeo Texture",
  metallicTexture: "Metallic Texture",
  bumpTexture: "Bum Texture",
};

//STANDARD
export const StandardMaterialAttributes = {
  DiffuseColor: {
    id: "diffuseColor",
    type: MaterialAttributeTypes.Color,
    name: "Diffuse Color",
  },
};

export const StandardChannels = {
  albedoTexture: "Albdeo Texture",
  metallicTexture: "Metallic Texture",
  bumpTexture: "Bump Texture",
};

//Enviorment
export const HDRList = [
  {
    id: "defaultEnvironment",
    name: "Default Environment",
    image: "./Ui/Hdrs/environment.jpg",
    env: "./environments/defaultEnvironment.env",
  },
  {
    id: "whiteEnvironment",
    name: "White Environment",
    image: "./Ui/Hdrs/white.png",
    env: null,
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
  intensity: "environmentIntensity",
};
