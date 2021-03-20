import  StudioSceneManager  from './StudioSceneManager';

export default function GameManger (canvas, engine, scene) {
   
    //Define Canvas
    this.canvas= canvas ;
    this.engine=engine;
    //Create StudioScene Instacne (StudioScene Manager)
    this.studioSceneManager= new StudioSceneManager(this,scene);

    // //Create scene
    // this.CurrentScene = this.studioSceneManager.CreateScene();
    
    // The render function
    // this.engine.runRenderLoop(
    //     ()=> {
    //     this.CurrentScene.render();
    // });

    // Resize the babylon engine when the window is resized
    // window.addEventListener("resize",  ()=> {
    //     console.log(" resize From GameManager Babylon", this)
    //     this.engine.resize();
    // },false);
    
};

GameManger.prototype = {

}