import * as BABYLON from "babylonjs";
import * as BABYLONMaterials from "babylonjs-materials";

import LoaderManager from "./LoaderManager";
import StudioSceneHelper from "./StudioSceneHelper";

// import * as BABYLONMaterials from 'babylonjs-materials';
import "babylonjs-inspector";
import "babylonjs-loaders";

export default class StudioSceneManager {
  constructor(game) {
    this.game = game;
    //Main Props
    this.scene = null;
    this.studioGui = null;
    this.mainCamera = null;
    this.pipline = null;

    //Val's
    this.hdrTexturePath =
      "https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/DDS/Runyon_Canyon_A_2k_cube_specular.dds";
    this.skyboxPath =
      "https://assets.babylonjs.com/environments/environmentSpecular.env";
  }

  //#region  MainSceneProperties
  CreateScene() {
    //Create Bts Scene
    //Create Scene
    this.scene = new BABYLON.Scene(this.game.engine);
    this.scene.clearColor = new BABYLON.Color4(0.09, 0.1, 0.11, 1.0);
    this.scene.imageProcessingConfiguration.contrast = 2.0;
    this.scene.imageProcessingConfiguration.exposure = 0.6;
    // this.scene.imageProcessingConfiguration.toneMappingEnabled = true;

    // this.scene = new BABYLON.Scene(this.game.engine);
    // this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    // this.scene.imageProcessingConfiguration.colorCurvesEnabled = true;
    // this.scene.imageProcessingConfiguration.colorCurves = new BABYLON.ColorCurves();
    // this.scene.imageProcessingConfiguration.colorCurves.globalSaturation = 0;
    // this.scene.imageProcessingConfiguration.contrast = 2.5;
    // this.scene.imageProcessingConfiguration.vignetteEnabled = true;

    this.scene.onPointerObservable.add((pointerInfo) => {
      switch (pointerInfo.type) {
        case BABYLON.PointerEventTypes.POINTERDOWN:
          console.log("POINTER DOWN");
          this.onPointerDown(pointerInfo.event);
          break;
        case BABYLON.PointerEventTypes.POINTERUP:
          console.log("POINTER UP");
          this.onPointerUp(pointerInfo.event);
          break;
        case BABYLON.PointerEventTypes.POINTERMOVE:
          this.onPointerMove(pointerInfo.event);
          break;
        case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
          if (this.InputMg.currentSelectedMesh) {
            //Item Selected Before
            this.InputMg.currentSelectedMesh.showBoundingBox = false;
          }
          break;
        case BABYLON.PointerEventTypes.POINTERWHEEL:
          this.MouseWheelHandler();
          break;
        default:
          break;
      }
    });

    //Create StudioScene instance
    this.studioSceneHelper = new StudioSceneHelper(this);
    this.loaderManager = new LoaderManager(this);

    //Installation
    this.createCamera();
    this.setUpEnvironMent();


    // this.loaderManager.loadMainMesh(); //start load mainBike

    // this.scene.debugLayer.show();
    return this.scene;
  }
  createCamera() {
    this.mainCamera = new BABYLON.ArcRotateCamera(
      "ArcCamera",
      4.8,
      1.35,
      60,
      new BABYLON.Vector3(0, 0, 0),
      this.scene
    );
    this.mainCamera.attachControl(this.game.canvas, true);

    // this.mainCamera.lowerRadiusLimit = 55;
    // this.mainCamera.upperRadiusLimit = 163;

    this.mainCamera.upperBetaLimit = 1.5;

    this.mainCamera.minZ = 0.2;
    this.mainCamera.target = new BABYLON.Vector3(0, 0.5, 0);

    this.mainCamera.wheelPrecision = 10;
    this.mainCamera.useBouncingBehavior = true;
  }
  setUpEnvironMent() {
    let hemiLight = new BABYLON.HemisphericLight(
      "HemiLight",
      new BABYLON.Vector3(0.3, 1, -0.3),
      this.scene
    );
    hemiLight.intensity = 1;
    // hemiLight.groundColor =new BABYLON.Color3(62/255,62/255,62/255);
    // hemiLight.position = new BABYLON.Vector3(1, 50, -2);

    let dirLight = new BABYLON.DirectionalLight(
      "DirectionalLight",
      new BABYLON.Vector3(0.2, -1, -0.3),
      this.scene
    );
    dirLight.position = new BABYLON.Vector3(3, 9, 3);

    this.alphaMaterial = new BABYLON.StandardMaterial("alphaMat", this.scene);
    this.alphaMaterial.alpha = 0;

    //Ground
    this.ground = BABYLON.Mesh.CreateGround(
      "MainGround",
      100,
      100,
      10,
      this.scene
    );
    this.ground.isPickable = false;
    this.ground.position.y -= 0.5;

    //Ground Material
    this.gridMaterial = new BABYLONMaterials.GridMaterial(
      "gridMaterial",
      this.scene
    );
    this.gridMaterial.majorUnitFrequency = 1.5;
    this.gridMaterial.minorUnitVisibility = 0.5;
    this.gridMaterial.gridRatio = 1.5;
    this.gridMaterial.backFaceCulling = false;
    this.gridMaterial.mainColor = new BABYLON.Color3(0.25, 0.27, 0.33);
    this.gridMaterial.lineColor = new BABYLON.Color3(0.33, 0.35, 0.42);
    this.gridMaterial.gridOffset = new BABYLON.Vector3(-0.5, 0, 0);
    this.gridMaterial.opacity = 0.98;

    this.ground.material = this.gridMaterial;

    console.log("Sdsd", this.studioSceneHelper);
    this.studioSceneHelper.createCoordinateAxes(50, this.scene);

    // var box2 = BABYLON.MeshBuilder.CreateBox("box", {height: 1}, this.scene);

    //Create RenderPipline
    this.RenderPipline = new BABYLON.DefaultRenderingPipeline(
      "default", // The name of the pipeline
      true, // Do you want HDR textures ?
      this.scene, // The scene instance
      [this.mainCamera] // The list of cameras to be attached to
    );

    this.RenderPipline.samples = 4;
    this.RenderPipline.imageProcessingEnabled = false;
  }
  //#endregion

  //#region UserInput (Mouse)
  onPointerDown(ev) {
    console.log("Mouse Down");
  }
  onPointerUp(ev) {
    console.log("Up Mouse");
  }
  onPointerMove(ev) {}
  MouseWheelHandler(ev) {}
  //#endregion

  //#region Handlers
  handleLoadMeshByURL(modelFile) {
    this.loaderManager.loadMeshByURL(modelFile);
  }

  //#endregion
}
