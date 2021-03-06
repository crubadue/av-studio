import * as React from "react";
import { GlobalState } from '../globalState';
import { FooterButton } from './footerButton';
import { DropUpButton } from './dropUpButton';
import { EnvironmentTools } from '../tools/environmentTools';
import { FooterFileButton } from './footerFileButton';
import { AnimationBar } from './animationBar';
import { Nullable } from "babylonjs/types";
import { KHR_materials_variants } from "babylonjs-loaders/glTF/2.0/Extensions/KHR_materials_variants";
import { Mesh } from "babylonjs/Meshes/mesh";

require("../scss/footer.scss");
var babylonIdentity = "../img/ArchVision-FullLogo.svg";
var iconEdit = "../img/icon-edit.svg";
var iconOpen = "../img/icon-open.svg";
var iconIBL = "../img/icon-ibl.svg";
var iconCameras = "../img/icon-cameras.svg";
var iconVariants = "../img/icon-variants.svg";

interface IFooterProps {
    globalState: GlobalState;
}

export class Footer extends React.Component<IFooterProps> {
            
    public constructor(props: IFooterProps) {    
        super(props);
        props.globalState.onSceneLoaded.add(info => {
            this.forceUpdate();
        });
    }

    showInspector() {
        if (this.props.globalState.currentScene) {
            if (this.props.globalState.currentScene.debugLayer.isVisible()) {
                this.props.globalState.hideDebugLayer();
            }
            else {
                this.props.globalState.showDebugLayer();
            }
        }
    }

    switchCamera(name: string) {
        let camera = this.props.globalState.currentScene!.getCameraByName(name);

        if (camera) {
            if (this.props.globalState.currentScene!.activeCamera) {
                this.props.globalState.currentScene!.activeCamera.detachControl();
            }
            this.props.globalState.currentScene!.activeCamera = camera;
            camera.attachControl();
        }
    }
    
    private _getVariantsExtension(): Nullable<KHR_materials_variants> {
        return this.props.globalState?.glTFLoaderExtensions["KHR_materials_variants"] as KHR_materials_variants;
    }

    render() {
        let cameraNames: string[] = [];
        let variantNames: string[] = [];

        // Cameras
        if (!!this.props.globalState.currentScene && this.props.globalState.currentScene.cameras.length > 1) {
            cameraNames = this.props.globalState.currentScene.cameras.map(c => c.name);

            cameraNames.push("default camera");
        }

        // Variants
        let hasVariants = false;
        let activeEntry = () => "";
        let switchVariant = (name: string) => {};
        const variantExtension = this._getVariantsExtension();
        if (variantExtension && this.props.globalState.currentScene) {
            let scene = this.props.globalState.currentScene;
            let rootNode = scene.getMeshByName("__root__") as Mesh;

            if (rootNode) {
                let variants: string[] = variantExtension.getAvailableVariants(rootNode);

                if (variants && variants.length > 1) {
                    hasVariants = true;
                    variantNames = variants;
                    
                    activeEntry = () => { 
                        let lastPickedVariant = variantExtension!.getLastSelectedVariant(rootNode) || 0;
                        if (lastPickedVariant && Object.prototype.toString.call(lastPickedVariant) === '[object String]') {
                            return lastPickedVariant as string;
                        }

                        return variantNames[0];
                    }

                    switchVariant = (name) => {
                        variantExtension.selectVariant(rootNode, name);
                    }
                }
            }
        }

        return (            
            <div id="footer" className="footer">
                <div className="footerLeft">
                    <img id="logoImg" src={babylonIdentity}/>
                </div>
                <AnimationBar globalState={this.props.globalState} 
                                enabled={!!this.props.globalState.currentScene}/>
                <div className="footerRight">
                    <FooterFileButton globalState={this.props.globalState} 
                                enabled={true}
                                icon={iconOpen}
                                onFilesPicked={(evt, files) => {
                                    this.props.globalState.filesInput.loadFiles(evt);
                                }}
                                label="Open your scene from your hard drive (.babylon, .gltf, .glb, .obj)"/>
                    <DropUpButton globalState={this.props.globalState} 
                                    icon={iconIBL}
                                    label="Select environment"
                                    options={EnvironmentTools.SkyboxesNames}
                                    activeEntry={() => EnvironmentTools.GetActiveSkyboxName()}
                                    onOptionPicked={option => this.props.globalState.onEnvironmentChanged.notifyObservers(option)}
                                    enabled={!!this.props.globalState.currentScene}/>
                    <FooterButton globalState={this.props.globalState} 
                                    icon={iconEdit}
                                    label="Display inspector"
                                    onClick={() => this.showInspector()}
                                    enabled={!!this.props.globalState.currentScene}/>
                    <DropUpButton globalState={this.props.globalState} 
                                icon={iconCameras}
                                label="Select camera"
                                options={cameraNames}
                                activeEntry={() => this.props.globalState.currentScene?.activeCamera?.name || ""}
                                onOptionPicked={option => this.switchCamera(option)}
                                enabled={cameraNames.length > 1}/>
                    <DropUpButton globalState={this.props.globalState} 
                                icon={iconVariants}
                                label="Select variant"
                                options={variantNames}
                                activeEntry={() => activeEntry()}
                                onOptionPicked={option => switchVariant(option)}
                                enabled={hasVariants}/>
                </div>
            </div>
        )
    }
}