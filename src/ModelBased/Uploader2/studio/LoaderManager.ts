import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { MaterialsTypes } from "../../../AppUtils";
import { createScene, createShadowGenrator } from "./StudioSceneManager";
import {
  Scene,
  Engine,
  ISceneLoaderProgressEvent,
  StandardMaterial,
  PBRMaterial,
} from "babylonjs";
import { Nullable } from "babylonjs/types";
import { MeshData, MaterialData } from "./types/index";

export function LoadAsync(
  rootUrl: string,
  sceneFilename: string | File,
  engine: Nullable<Engine>,
  onProgress: Nullable<(event: ISceneLoaderProgressEvent) => void>
): Promise<{ scene: Scene; meshData: MeshData }> {
  return new Promise((resolve, reject) => {
    let newScene = createScene(engine);
    let shadowGenerator = createShadowGenrator(newScene);
    BABYLON.SceneLoader.ImportMesh(
      "",
      rootUrl,
      sceneFilename,
      newScene,
      (meshes) => {
        //onFinish
        console.log("meshes", meshes);
        var worldExtends = newScene.getWorldExtends((mesh) => {
          return (
            mesh.isVisible && mesh.isEnabled() && mesh.name !== "MainGround"
          );
        });

        const boxHolderSize = new BABYLON.Vector3(
          worldExtends.min.x - worldExtends.max.x,
          worldExtends.min.y - worldExtends.max.y,
          worldExtends.min.z - worldExtends.max.z
        );
        const boxHolderPosition = BABYLON.Vector3.Center(
          worldExtends.min,
          worldExtends.max
        );

        var meshHolder = BABYLON.MeshBuilder.CreateBox(
          "MeshHolder",
          {
            height: boxHolderSize.y,
            width: boxHolderSize.x,
            depth: boxHolderSize.z,
          },
          newScene
        );

        meshHolder.position = boxHolderPosition.clone();
        meshHolder.visibility = 0;

        let rootMesh = meshes.find((mesh) => mesh.id === "__root__");
        if (rootMesh) {
          rootMesh.parent = meshHolder;
          rootMesh.setAbsolutePosition(
            boxHolderPosition.multiplyByFloats(-1, -1, -1)
          );
          meshHolder.position = new BABYLON.Vector3(
            0,
            Math.abs(boxHolderPosition.y - worldExtends.min.y),
            0
          );
        }

        let meshData: MeshData = { nodes: [], materials: [] };
        //get materials
        for (let i = 0; i < meshes.length; i++) {
          if(meshes[i].getTotalVertices() > 0){
            shadowGenerator.getShadowMap()?.renderList?.push(meshes[i]);
            shadowGenerator.addShadowCaster(meshes[i], true);
          }
          if (meshes[i].material) {
            // mesh contains material
            let material = meshes[i].material as StandardMaterial | PBRMaterial;
            if (
              meshData.materials.every(
                (mat: MaterialData) => mat.name !== material.name
              )
            ) {
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
              if (materialObj)
                //exsits material
                meshData.materials.push(materialObj);
            }
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
