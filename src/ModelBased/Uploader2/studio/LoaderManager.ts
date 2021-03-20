import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { MaterialsTypes } from "../../../AppUtils";
import { createScene } from "./StudioSceneManager";
import {
  Scene,
  Engine,
  ISceneLoaderProgressEvent,
  StandardMaterial,
  PBRMaterial,
} from "babylonjs";
import { Nullable } from "babylonjs/types";
import { MeshData, MaterialData } from "../studio/types/index";

export function LoadAsync(
  rootUrl: string,
  sceneFilename: string | File,
  engine: Nullable<Engine>,
  onProgress: Nullable<(event: ISceneLoaderProgressEvent) => void>
): Promise<{ scene: Scene; meshData: MeshData }> {
  return new Promise((resolve, reject) => {
    let newScene = createScene(engine);
    BABYLON.SceneLoader.ImportMesh(
      "",
      rootUrl,
      sceneFilename,
      newScene,
      (meshes) => {
        //onFinish
        console.log("meshes", meshes);
        let meshData: MeshData = { nodes: [], materials: [] };
        //get materials
        for (let i = 0; i < meshes.length; i++) {
          if (meshes[i].material) {
            // mesh contains material
            let material = meshes[i].material as StandardMaterial | PBRMaterial;
            let materialObj: Nullable<MaterialData> = null;
            console.log("sd1", material.getClassName());
            switch (material.getClassName()) {
              case "MultiMaterial":
                break;
              case "PBRMaterial":
                materialObj = {
                  id: material.uniqueId,
                  name: material.name,
                  type: MaterialsTypes.PBRMaterial,
                  options: {
                    metallic: (material as PBRMaterial).metallic,
                    roughness: material.roughness,
                    mainColor: (material as PBRMaterial).albedoColor.toHexString(),
                  },
                };
                break;
              default:
              case "StandardMaterial":
                materialObj = {
                  id: material.uniqueId,
                  name: material.name,
                  type: MaterialsTypes.StandardMaterial,
                  options: {
                    mainColor: (material as StandardMaterial).diffuseColor.toHexString(),
                  },
                };
                break;
            }
            if (materialObj) //exsits material
              meshData.materials.push(materialObj);
          }
        }
        resolve({ scene: newScene, meshData: meshData });
      },
      onProgress,
      (scene, message, exception) => {
        reject(exception || new Error(message));
      }
    );
  });
}
