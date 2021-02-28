import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

export default class LoaderManager {
  constructor(sceneManager) {
    this.game = sceneManager.game;
    this.scene = sceneManager.scene;
    this.mirror = sceneManager.mirror;
    this.shadowGenerator = sceneManager.shadowGenerator;
  }

  loadMeshByURL(modelFile) {
    const {url, fileExtension } = modelFile; 

    console.log("Sds", modelFile);
    //Create Bts Scene
    BABYLON.SceneLoader.ImportMesh(
      "",
      "",
      url,
      this.scene,
      () => {
        //onFinish
      },
      undefined,
      undefined,
      fileExtension
    );
  }

  loadMeshByURL1(url) {
    //Create Bts Scene
    console.log("Sds", url);
    let assetsManager = new BABYLON.AssetsManager(this.scene);
    let model_task = assetsManager.addMeshTask("model_task", "", url, ".glb");
    model_task.onSuccess = (task) => {
      console.log("task", task);
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
