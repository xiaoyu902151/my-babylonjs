import { FollowCamera, Vector3 } from "@babylonjs/core";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { canvas, scene, startRender } from ".";
import { dude } from "./character";
export function buildCamera(){
    // This creates and positions a free camera (non-mesh)
    //var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
   
    // This targets the camera to scene origin
    //camera.setTarget(Vector3.Zero());

    // This attaches the camera to the canvas
   // arcRotateCamera();
   // dudeShoulderCamera();
 //  followCamera();
     scene.createDefaultXRExperienceAsync();
     
    startRender();
}   

function arcRotateCamera(){
    var  camera = new ArcRotateCamera('cameral', -Math.PI /2, Math.PI/2.5, 30, new  Vector3(0, 0, 0));
    camera.upperBetaLimit = Math.PI / 2.2;
    camera.attachControl(canvas, true);
}
function dudeShoulderCamera(){
    const camera = new ArcRotateCamera('dudeShoulder', Math.PI / 2, Math.PI / 2.5, 
        150, new Vector3(0, 60, 0));
    camera.parent = dude;
    camera.attachControl(true);
}
function followCamera(){
    // new followCamera
    const followCamera = new FollowCamera('followCamera', new Vector3(10, 0, 0));
    //target
    followCamera.lockedTarget = dude;
    //offset height
    followCamera.heightOffset = 3
    followCamera.radius = 5;
    followCamera.rotationOffset = 0;
    followCamera.cameraAcceleration = 0.05;
    followCamera.maxCameraSpeed = 10;
    //user control
    followCamera.attachControl(true);
}