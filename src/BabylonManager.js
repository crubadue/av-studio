import * as BABYLON from 'babylonjs';
import GameManger from './Babylon/GameManager';

export default function BabylonManager(canvasRef, sockType) {
  console.log("canvasRef",canvasRef)
    if (!canvasRef) {
      throw new Error("Canvas is not provided!");
    }
    const engine = new BABYLON.Engine(
      canvasRef,
      true,
      // this.props.engineOptions,
      // this.props.adaptToDeviceRatio
    );

    const GManger = new GameManger(canvasRef, engine, sockType);

    return {
      GManger,
    };
}