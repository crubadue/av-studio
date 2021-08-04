import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { MaterialsTypes } from "../../../AppUtils";

export default class LoaderManager {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.game = sceneManager.game;
    this.scene = sceneManager.scene;
    this.mirror = sceneManager.mirror;
    this.shadowGenerator = sceneManager.shadowGenerator;
    this.meshData = {
      //all data of loaded mesh
      nodes: [],
      materials: [],
    };
  }

  loadMeshByURL(modelFile, onLoadMesh) {
    const { url, fileExtension } = modelFile;
    // console.log("Sds", modelFile);
    //Create Bts Scene
    // console.log("url", url);
    BABYLON.SceneLoader.ImportMesh(
      "",
      "",
      url,
      this.scene,
      (meshes) => {
        //onFinish
        //get materials
        for (let i = 0; i < meshes.length; i++) {
          if (meshes[i].material) {
            // mesh contains material
            let material = meshes[i].material;
            let materialObj = null;
            // console.log("sd1", material.getClassName());
            switch (material.getClassName()) {
              case "MultiMaterial":
                break;
              case "PBRMaterial":
                materialObj = {
                  id: material.uniqueId,
                  name: material.name,
                  type: MaterialsTypes.PBRMaterial,
                  options: {
                    metallic: material.metallic,
                    roughness: material.roughness,
                    mainColor: material.albedoColor.toHexString(),
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
                    mainColor: material.diffuseColor.toHexString(),
                  },
                };
                break;
            }
            if (materialObj)
              //exsits material
              this.meshData.materials.push(materialObj);
          }
        }
        onLoadMesh(this.meshData);

        //   for (let i = 0; i < this.meshPovit.getChildTransformNodes(false).length; i++) {
        //     if(this.meshPovit.getChildTransformNodes(false)[i].material){//Contains mat
        //         let tmpMaterial=this.meshPovit.getChildTransformNodes(false)[i].material;
        //         let subMats=[];

        //         console.log("NormalMat__i ",tmpMaterial.name)

        //         switch (tmpMaterial.getClassName()) {
        //             case "MultiMaterial":
        //                 console.log(tmpMaterial.getChildren())
        //                 matIndex--;
        //                 for (let j = 0; j < tmpMaterial.getChildren().length; j++) {
        //                     let subMat=tmpMaterial.getChildren()[j];
        //                     subMats.push({
        //                         material:subMat,
        //                         id:++matIndex
        //                     });
        //                 }
        //                 console.log("sub__",subMats)
        //                 break;
        //             default:
        //                 subMats.push({
        //                         material:tmpMaterial,
        //                         id:matIndex
        //                     });
        //                 break;
        //         }
        //         console.log("NormalMat__",subMats)

        //         for (let k = 0; k < subMats.length; k++) {

        //             this.meshCollider.meshdata.childkeys.materials.push(//(Mesh Mat's)
        //             new ObjectSceneUtils.MatClass(
        //                 subMats[k].material.name,
        //                 subMats[k].material,
        //                 subMats[k].id
        //             ));
        //             this.ReactObj.materials.push(//(React)
        //                 {
        //                     buttonName: subMats[k].material.name,
        //                     buttonIndex: subMats[k].id
        //                 }
        //             )
        //         }
        //         console.log("mat arr  ", this.meshCollider.meshdata.childkeys.materials );
        //         matIndex++;
        //     }
        // }
      },
      undefined,
      (error) => {
        console.log("error", error);
      },
      fileExtension
    );
  }

  loadMeshByURL1(url) {
    //Create Bts Scene
    // console.log("url", url);
    let assetsManager = new BABYLON.AssetsManager(this.scene);
    let model_task = assetsManager.addMeshTask("model_task", "", url, ".glb");
    model_task.onSuccess = (task) => {
      // console.log("task", task);
    };

    assetsManager.onProgress = (
      remainingCount,
      totalCount,
      lastFinishedTask
    ) => {
      this.game.engine.loadingUIText =
        "loading Assets " +
        remainingCount +
        " out of " +
        totalCount +
        " items still need to be loaded.";
    };

    assetsManager.onFinish = (tasks) => {};
    // Start loading
    assetsManager.load();
  }
}
