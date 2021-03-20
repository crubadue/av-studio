import { Nullable } from "babylonjs/types";

export interface MaterialData {
  id: number;
  name: string;
  type: string;
  options: {
    metallic?: Nullable<number>;
    roughness?: Nullable<number>;
    mainColor: string;
  };
}

export interface MeshData {
  nodes: MaterialData[];
  materials: MaterialData[];
}
