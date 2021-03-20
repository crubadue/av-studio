import * as BABYLON from "babylonjs";

export default class StudioSceneHelper {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
  }

  //#region  MainSceneProperties
  createCoordinateAxes(size, scene) {
    // show axi

    var axisX = BABYLON.Mesh.CreateLines(
      "axisX",
      [
        new BABYLON.Vector3(0, 0, size),
        new BABYLON.Vector3(size, 0, size),
      ],
      scene
    );

    var MinaxisX = BABYLON.Mesh.CreateLines(
      "axisX",
      [
        new BABYLON.Vector3(0, 0, size),
        new BABYLON.Vector3(-size, 0, size),
      ],
      scene
    );
    axisX.color = MinaxisX.color = new BABYLON.Color3(1, 0, 0);
    axisX.isPickable = false;
    MinaxisX.isPickable = false;

    var axisZ = BABYLON.Mesh.CreateLines(
      "axisZ",
      [
        new BABYLON.Vector3(size, 0, 0),
        new BABYLON.Vector3(size, 0, size),
      ],
      scene
    );

    var MinaxisZ = BABYLON.Mesh.CreateLines(
      "axisZ",
      [
        new BABYLON.Vector3(size, 0, 0),
        new BABYLON.Vector3(size, 0, -size),
      ],
      scene
    );

    axisZ.color = MinaxisZ.color = new BABYLON.Color3(0, 0, 1);
    axisZ.isPickable = false;
    MinaxisZ.isPickable = false;
  }
}
