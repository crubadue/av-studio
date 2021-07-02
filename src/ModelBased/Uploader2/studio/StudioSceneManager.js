import * as BABYLON from "babylonjs";
import * as BABYLONMaterials from "babylonjs-materials";
import { MaterialsTypes, MaterialAttributeTypes } from "../../../AppUtils";
import { GLTF2Export } from "babylonjs-serializers";

import LoaderManager from "./LoaderManager";
import StudioSceneHelper from "./StudioSceneHelper";
import { HDRList } from "../../../AppUtils";

// import * as BABYLONMaterials from 'babylonjs-materials';
import "babylonjs-inspector";
import "babylonjs-loaders";

export function createScene(engine) {
  //Create Scene
  let scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0.09, 0.1, 0.11, 1.0);
  // scene.imageProcessingConfiguration.contrast = 2.0;
  // scene.imageProcessingConfiguration.exposure = 0.6;
  // this.scene.imageProcessingConfiguration.toneMappingEnabled = true;

  // this.scene = new BABYLON.Scene(this.game.engine);
  // this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
  // this.scene.imageProcessingConfiguration.colorCurvesEnabled = true;
  // this.scene.imageProcessingConfiguration.colorCurves = new BABYLON.ColorCurves();
  // this.scene.imageProcessingConfiguration.colorCurves.globalSaturation = 0;
  // this.scene.imageProcessingConfiguration.contrast = 2.5;
  // this.scene.imageProcessingConfiguration.vignetteEnabled = true;

  return scene;
}

export function createShadowGenrator(scene){
  // let dirLight = new BABYLON.DirectionalLight(
  //   "DirectionalLight",
  //   new BABYLON.Vector3(.3, -1, 0.2),
  //   scene
  // );
  // dirLight.position = new BABYLON.Vector3(3, 9, 3);

  // light1
	var dirLight = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
	dirLight.position = new BABYLON.Vector3(20, 40, 20);
	dirLight.intensity = 0.5;


  // ShadowGenerator
  let shadowGenerator = new BABYLON.ShadowGenerator(512, dirLight);
  shadowGenerator.useBlurExponentialShadowMap = true;
  shadowGenerator.filteringQuality = BABYLON.ShadowGenerator.QUALITY_HIGH;
  // this.shadowGenerator.forceBackFacesOnly = true;
  // this.shadowGenerator.blurKernel = 32;
  // this.shadowGenerator.depthScale = 150;
  dirLight.intensity = 1;
  dirLight.shadowMinZ = 0;
  dirLight.shadowMaxZ = 700;

  return shadowGenerator;
}

export default class StudioSceneManager {
  constructor(gameManager, scene) {
    const { canvas, engine } = gameManager;
    this.engine = engine;

    this.canvas = canvas;
    this.scene = scene;
    this.handlers = null;

    //Main Props
    this.studioGui = null;
    this.mainCamera = null;
    this.pipline = null;
    //Val's
    this.hdrTexturePath =
      "https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/DDS/Runyon_Canyon_A_2k_cube_specular.dds";
    this.skyboxPath =
      "https://assets.babylonjs.com/environments/environmentSpecular.env";

    //
    this.initCamValues = {
      alpha: 0,
      beta: 0,
      raduis: 0,
      target: new BABYLON.Vector3.Zero(),
    }

    this.adjustTheScene();
  }

  //#region  MainSceneProperties
  adjustTheScene() {
    //Create Bts Scene
    //Adjust Scene
    this.scene.clearColor = new BABYLON.Color4(1, 1, 1, 1.0);
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
          // console.log("POINTER DOWN");
          this.onPointerDown(pointerInfo.event);
          break;
        case BABYLON.PointerEventTypes.POINTERUP:
          // console.log("POINTER UP");
          this.onPointerUp(pointerInfo.event);
          break;
        case BABYLON.PointerEventTypes.POINTERMOVE:
          this.onPointerMove(pointerInfo.event);
          break;
        case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
          // if (this.InputMg.currentSelectedMesh) {
          //   //Item Selected Before
          //   this.InputMg.currentSelectedMesh.showBoundingBox = false;
          // }
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

    // var box2 = BABYLON.MeshBuilder.CreateBox("box", {size: 1}, this.scene);

    //Installation
    this.createCamera();
    this.createGround();
    this.prepareLighting();

    // this.loaderManager.loadMainMesh(); //start load mainBike
    console.log("All OK !!");
    // this.sc
    // this.scene.debugLayer.show();
  }
  createCamera() {
    if (this.scene.activeCamera) {
      this.scene.activeCamera.dispose();
    }

    this.scene.createDefaultCamera(true);
    this.mainCamera = this.scene.activeCamera;
    this.mainCamera.name = "ArcCamera";

    this.initCamValues ={
      alpha : this.mainCamera.alpha,
      beta : this.mainCamera.beta,
      radius: this.mainCamera.radius,
      target: this.mainCamera.target.clone(),
    }

    console.log("this.initCamValues 1", this.initCamValues)

    // this.mainCamera.useAutoRotationBehavior = true;
    this.mainCamera.useFramingBehavior = true;
    // this.mainCamera.useBouncingBehavior = true;

    //FrameBehavior
    var framingBehavior = this.mainCamera.getBehaviorByName("Framing");
    framingBehavior.framingTime = 0;
    framingBehavior.elevationReturnTime = -1;

    //WordExtends
    this.mainCamera.lowerRadiusLimit = null;
    var worldExtends = this.scene.getWorldExtends((mesh) => {
      return mesh.isVisible && mesh.isEnabled() && mesh.name !== "MainGround";
    });
    // var box2 = BABYLON.MeshBuilder.CreateBox("box", { size: 0.2 }, this.scene);

    this.worldExtends = worldExtends;
    framingBehavior.zoomOnBoundingInfo(worldExtends.min, worldExtends.max);

    this.mainCamera.upperBetaLimit = 1.5;

    this.mainCamera.minZ = 0.2;
    this.mainCamera.target = new BABYLON.Vector3(0, 0.5, 0);
    this.mainCamera.wheelPrecision = 10;
    this.mainCamera.wheelDeltaPercentage = 0.015;

    this.mainCamera.pinchPrecision = 200 / this.mainCamera.radius;
    this.mainCamera.upperRadiusLimit = 8 * this.mainCamera.radius;
    // this.mainCamera.lowerRadiusLimit = 55;

    this.mainCamera.lowerRadiusLimit = 0;
    this.mainCamera.upperRadiusLimit = 500;

    // this.mainCamera.wheelDeltaPercentage = 0.15;
    // this.mainCamera.pinchDeltaPercentage = 0.15;

    this.mainCamera.attachControl(this.canvas, true);
  }

  createGround() {
    let groundSize = 50;
    if (this.worldExtends) {
      groundSize = Math.max(
        ...this.worldExtends.max
          .asArray()
          .filter((value, index) => index !== 1)
          .concat(
            this.worldExtends.min
              .asArray()
              .filter((value, index) => index !== 1)
          )
          .map((value) => Math.abs(value))
      );
      groundSize = groundSize < 2.5 ? 2.5 : groundSize;
      groundSize *= 7;
    }
    console.log("groundSize", groundSize);

    //Ground
    this.ground = BABYLON.Mesh.CreateGround(
      "MainGround",
      groundSize,
      groundSize,
      10,
      this.scene
    );
    this.ground.isPickable = false;
    // this.ground.position.y -= 0.3;

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


    //Create MirrorGround
    let mirrorGround = BABYLON.Mesh.CreateGround(
      "MirrorGround",
      groundSize * 1,
      groundSize * 1,
      10,
      this.scene
    );
    mirrorGround.position.y = -0.15;
    mirrorGround.isPickable = false;
    mirrorGround.receiveShadows = true;

    //background material.
     var backgroundMaterial = new BABYLON.BackgroundMaterial(
      "backgroundMaterial",
      this.scene
    );
    backgroundMaterial.opacityFresnel = false;
    backgroundMaterial.shadowLevel = .9;
    backgroundMaterial.alpha = 0.2;

    var groundMaterial = new BABYLON.StandardMaterial("backgroundMaterial 1", this.scene);
    groundMaterial.alpha = 0.2;
    groundMaterial.diffuseColor = new BABYLON.Color3(65/255,65/255,65/255);
    mirrorGround.material = groundMaterial;

    //Mirror
    // this.mirror = new BABYLON.MirrorTexture("mirror", 512, this.scene);
    // this.mirror.mirrorPlane = new BABYLON.Plane(0, -1, 0, 0);
    // this.mirror.adaptiveBlurKernel = 32;
    // backgroundMaterial.reflectionTexture = this.mirror;
    // backgroundMaterial.reflectionFresnel = true;
    // backgroundMaterial.reflectionStandardFresnelWeight = 0.9;
    // backgroundMaterial.reflectionTexture.level = 0.8;
    // mirrorGround.material = backgroundMaterial;

    console.log("Sdsd", this.studioSceneHelper);
    this.studioSceneHelper.createCoordinateAxes(this.ground, groundSize / 2, this.scene);
  }
  prepareLighting() {
    let hemiLight = new BABYLON.HemisphericLight(
      "HemiLight",
      new BABYLON.Vector3(0, 0, 0),
      this.scene
    );
    hemiLight.intensity = 1;
    // hemiLight.groundColor =new BABYLON.Color3(62/255,62/255,62/255);

    // let dirLight = new BABYLON.DirectionalLight(
    //   "DirectionalLight",
    //   new BABYLON.Vector3(0.2, -1, -0.3),
    //   this.scene
    // );
    // dirLight.position = new BABYLON.Vector3(3, 9, 3);

    this.alphaMaterial = new BABYLON.StandardMaterial("alphaMat", this.scene);
    this.alphaMaterial.alpha = 0;

    //Create RenderPipline
    this.RenderPipline = new BABYLON.DefaultRenderingPipeline(
      "default", // The name of the pipeline
      true, // Do you want HDR textures ?
      this.scene, // The scene instance
      [this.mainCamera] // The list of cameras to be attached to
    );
    this.RenderPipline.samples = 4;
    this.RenderPipline.imageProcessingEnabled = false;

    //Apply Default Scene Environment
    this.applySceneEnvironment(HDRList[0].id);
  }
  //#endregion

  //#region UserInp1ut (Mouse)
  onPointerDown(ev) {
    // console.log("Mouse Down");
  }
  onPointerUp(ev) {
    // console.log("Up Mouse");
  }
  onPointerMove(ev) {}
  MouseWheelHandler(ev) {}
  //#endregion

  //#region Getters
  getMaterialOptions(materialId) {
    let selectedMaterial = this.scene.getMaterialByUniqueID(materialId);
    if (selectedMaterial.getClassName() === "PBRMaterial")
      return {
        metallic: selectedMaterial.metallic,
        roughness: selectedMaterial.roughness,
        mainColor: selectedMaterial.albedoColor.toHexString(),
      };
    else
      return {
        mainColor: selectedMaterial.diffuseColor.toHexString(),
      };
  }
  //#endregion
  //#region Handlers
  handleLoadMeshByURL(modelFile, onLoadMesh) {
    this.loaderManager.loadMeshByURL(modelFile, onLoadMesh);
  }
  handleOnChangeMaterialOption(selectedMatId, attribute) {
    const { id, type, value } = attribute;
    let selectedMaterial = this.scene.getMaterialByUniqueID(selectedMatId);
    let newTargetValue = value;
    if (type === MaterialAttributeTypes.Color) {
      newTargetValue = BABYLON.Color3.FromHexString(value);
    }
    selectedMaterial[id] = newTargetValue;
  }

  downloadGltfModel(isGltf=true) {
    console.log("downloadGltfModel");
    let selectedIds = [
      "MainGround",
      "axisX",
      "axisZ",
      "HemiLight",
      "DirectionalLight",
      "MeshHolder",
      "hdrSkyBox",
    ];

    let parentMesh = this.scene.getMeshesByID("MeshHolder")[0];
    let exportMesh = new BABYLON.Mesh("exportMesh", this.scene);
    parentMesh.getChildMeshes(true).forEach((mesh) => {
      mesh.parent = exportMesh;
    });

    console.log("selectedIds", selectedIds);
    let options = {
      shouldExportNode: (mesh) => {
        return !selectedIds.includes(mesh.name);
      },
    };

    if (isGltf) {
      GLTF2Export.GLTFAsync(this.scene, "exportedModel", options).then(
        (gltf) => {
          gltf.downloadFiles();

          exportMesh.getChildMeshes(true).forEach((mesh) => {
            mesh.parent = parentMesh;
          });
          exportMesh.dispose();

        }
      );
    } else {
      GLTF2Export.GLBAsync(this.scene, "exportedModel", options).then((glb) => {
        glb.downloadFiles();

        exportMesh.getChildMeshes(true).forEach((mesh) => {
          mesh.parent = parentMesh;
        });
        exportMesh.dispose();
      });
    }
  }
  applySceneEnvironment(environmentId) {
    //Create CubicTexture
    // let skyboxCubecTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
    //   "https://playground.babylonjs.com/textures/environment.env",
    //   this.scene
    // );
    // skyboxCubecTexture.level = 1;
    // this.scene.environmentTexture = skyboxCubecTexture;

    let selectedEnvironment = HDRList.find((hdr) => hdr.id === environmentId);
    if (selectedEnvironment) {
      console.log("selectedEnvironment", selectedEnvironment);     
      let hdrSkyBox = this.scene.getMeshByID("hdrSkyBox");

      if(!selectedEnvironment.env){
        hdrSkyBox.visibility = 0;
        return;
      }
      if (this.scene.environmentTexture)
        this.scene.environmentTexture.dispose();

        this.scene.environmentTexture = new BABYLON.CubeTexture(
          selectedEnvironment.env,
          this.scene
        );
        this.scene.environmentIntensity = 1;
  
        if (hdrSkyBox) {
          console.log("Ssssssssss", hdrSkyBox);
          if (hdrSkyBox.material) hdrSkyBox.material.dispose();
          hdrSkyBox.dispose();
        }
        if(selectedEnvironment.env){
          var hdrTexture = new BABYLON.CubeTexture(
          selectedEnvironment.env,
          this.scene
          );
          this.scene.createDefaultSkybox(hdrTexture, true, 1000, 0.5);
        }
    }
  }
  customizeSceneEnvironment(environmentKey, value) {
    if (this.scene[environmentKey]) {
      //doableKey
      this.scene[environmentKey] = value;
    }
  }
  toggleSkyBoxBackground(checked) {
    let hdrSkyBox = this.scene.getMeshByID("hdrSkyBox");
    if (hdrSkyBox) {
      hdrSkyBox.setEnabled(checked);
      if (checked) this.controlSkyBoxBlur(0.5);
    }
  }
  controlSkyBoxBlur (value) {
    let skyboxMat = this.scene.getMaterialByID("skyBox");
    if (skyboxMat) {
      //doableKey
      skyboxMat.microSurface = 1 - value;

    }
  }
  toggleGridGround (checked) {
    console.log("checked", checked)
    this.ground.setEnabled(checked);
  }
  resetCameraView () {
    this.mainCamera.target = this.initCamValues.target.clone();
    this.mainCamera.alpha = this.initCamValues.alpha;
    this.mainCamera.beta = this.initCamValues.beta;
    this.mainCamera.radius = this.initCamValues.radius;
  }
  setCameraViewBySide(sideKey){
    switch (sideKey) {
      default:
      case 0: //top
        this.mainCamera.alpha = 1.6;
        this.mainCamera.beta = 0.0;
        break;
      case 1: //Left
        this.mainCamera.alpha = 0.0;
        this.mainCamera.beta = 1.45;
        break;
      case 2: //Right
        this.mainCamera.alpha = 3.14;
        this.mainCamera.beta = 1.45;
        break;
      case 3: //Center
        this.mainCamera.alpha = 1.60;
        this.mainCamera.beta = 1.50;
        break;
    }
  }
  //#endregion
}
// environmentIntensity
