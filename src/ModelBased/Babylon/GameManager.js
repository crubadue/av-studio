import  StudioSceneManager  from './StudioScene/StudioSceneManager';

export default function GameManger (canvas,engine) {
   
    //Define Canvas
    this.canvas= canvas ;
     
    //Define Engine
    this.engine=engine;
    this.engine.enableOfflineSupport=true;

    //Create StudioScene Instacne (StudioScene Manager)
    this.studioSceneManager= new StudioSceneManager(this);

    //Create scene
    this.CurrentScene = this.studioSceneManager.CreateScene();
    
    // The render function
    this.engine.runRenderLoop(
        ()=> {
        this.CurrentScene.render();
    });

    // Resize the babylon engine when the window is resized
    window.addEventListener("resize",  ()=> {
        console.log(" resize From GameManager Babylon", this)
        this.engine.resize();
    },false);
    
};

GameManger.prototype = {

}