import * as BABYLON from "babylonjs";
import LoaderManager from "./LoaderManager";
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
    this.IsComponentTab = false;

    this.hdrTexturePath="https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/DDS/Runyon_Canyon_A_2k_cube_specular.dds";
    this.skyboxPath="https://assets.babylonjs.com/environments/environmentSpecular.env";

  }

  //#region  MainSceneProperties
  CreateScene() {
    //Create Bts Scene
    //Create Scene
    this.scene = new BABYLON.Scene(this.game.engine);
    this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    this.scene.imageProcessingConfiguration.colorCurvesEnabled = true;
    this.scene.imageProcessingConfiguration.colorCurves = new BABYLON.ColorCurves();
    this.scene.imageProcessingConfiguration.colorCurves.globalSaturation = 0;
    this.scene.imageProcessingConfiguration.contrast = 2.5;
    this.scene.imageProcessingConfiguration.vignetteEnabled = true;

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

    //Installation
    this.createCamera();
    this.setUpEnvironMent();

    //Create LoadManager instance
    this.loaderManager = new LoaderManager(this);
    // this.loaderManager.loadMainMesh(); //start load mainBike

    // this.scene.debugLayer.show();
    //
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

    // ShadowGenerator
    this.shadowGenerator = new BABYLON.ShadowGenerator(512, dirLight);
    this.shadowGenerator.useBlurExponentialShadowMap = true;
    // this.shadowGenerator.forceBackFacesOnly = true;
    // this.shadowGenerator.blurKernel = 32;
    // this.shadowGenerator.depthScale = 150;
    dirLight.intensity = 0.72;
    dirLight.shadowMinZ = 0;
    dirLight.shadowMaxZ = 500;
    this.shadowGenerator.filteringQuality =
      BABYLON.ShadowGenerator.QUALITY_HIGH;

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    this.ground = BABYLON.Mesh.CreateGround(
      "ground1",
      100,
      100,
      150,
      this.scene
    );
    this.ground.receiveShadows = true;

    // Create and tweak the background material.
    var backgroundMaterial = new BABYLON.BackgroundMaterial(
      "backgroundMaterial",
      this.scene
    );
    backgroundMaterial.diffuseTexture = new BABYLON.Texture(
      "./Textuers/Scene/backgroundGround.png",
      this.scene
    );
    backgroundMaterial.diffuseTexture.hasAlpha = true;
    backgroundMaterial.opacityFresnel = false;
    backgroundMaterial.shadowLevel = 0.8;
    backgroundMaterial.alpha = 0.3;

    //Create CubicTexture
    let skyboxCubecTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
      // this.skyboxPath,
      "./environment/empty_warehouse2.env",
      this.scene
    );
    skyboxCubecTexture.gammaSpace = true;
    skyboxCubecTexture.level = 0.75;
    this.scene.environmentTexture = skyboxCubecTexture;

    //Mirror
    this.mirror = new BABYLON.MirrorTexture("mirror", 512, this.scene);
    this.mirror.mirrorPlane = new BABYLON.Plane(0, -1, 0, 0);
    this.mirror.adaptiveBlurKernel = 32;
    // this.Groundmirror.mirrorPlane = new BABYLON.Plane(0, -.69, -0, -1);
    backgroundMaterial.reflectionTexture = this.mirror;
    backgroundMaterial.reflectionFresnel = true;
    backgroundMaterial.reflectionStandardFresnelWeight = 0.9;
    backgroundMaterial.reflectionTexture.level = 0.85;
    this.ground.material = backgroundMaterial;

    // var box2 = BABYLON.MeshBuilder.CreateBox("box", {height: 1}, this.scene);
    // var box2 = BABYLON.MeshBuilder.CreateBox("box1", {height: 1}, this.scene);

    // box2.position.y +=.5;
    // this.mirror.renderList.push(box2);
    // this.shadowGenerator.addShadowCaster(box2);

    //Create RenderPipline
    this.RenderPipline = new BABYLON.DefaultRenderingPipeline(
      "default", // The name of the pipeline
      true, // Do you want HDR textures ?
      this.scene, // The scene instance
      [this.mainCamera] // The list of cameras to be attached to
    );

    this.RenderPipline.samples = 4;
    // this.RenderPipline.bloomEnabled=true;
    // this.RenderPipline.glowLayer.intensity=3.5;
    // this.RenderPipline.glowLayer.blurKernelSize=180;

    // this.RenderPipline.MineglowLayer = new BABYLON.GlowLayer(
    //   "glowww",
    //   this.scene,
    //   {
    //     mainTextureFixedSize: 512,
    //     blurKernelSize: 190,
    //   }
    // );
    // this.RenderPipline.MineglowLayer.intensity = 1.7;


    // var skyBack = new BABYLON.Layer(
    //   "skyBack",
    //   "./Textuers/Scene/skyBack_edit.png",
    //   this.scene,
    //   true,
    //   new BABYLON.Color4(1, 1, 1, 1)
    // );

    // var skyBack = new BABYLON.Layer("skyBack", "./Textuers/Scene/skyBack.png", this.scene,true, new BABYLON.Color4(.55,.55,.55,.65));
    // var vignette = new BABYLON.Layer("vignette", "./Textuers/Scene/vignette.png", this.scene,true, new BABYLON.Color4(1,1,1,.9));
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
  handleLoadMeshByURL(modelFile){
    this.loaderManager.loadMeshByURL(modelFile);
  }

  //#endregion
}
