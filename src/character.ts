import { Axis, Scene, SceneLoader, Tools, Vector3 } from "@babylonjs/core";
import { buildCamera } from "./camera";
import {scene} from './index'
import { shadow } from "./shadow";
export var dude;
export function buildDude(){
    function walk(turn, distance){
        this.turn = turn;
        this.distance = distance;
    }
    const track = [
        new walk(86, 7),
        new walk(-85, 14.8),
        new walk(-93, 16.5),
        new walk(48,25.5),
        new walk(-112, 30),
        new walk(-72, 33),
        new walk(42, 37),
        new walk(-98, 45),
        new walk(0, 47)
    ];
    const step = 0.015;
    let totalDistance = 0;
    let p = 0;

    SceneLoader.ImportMeshAsync('him', 'https://playground.babylonjs.com/scenes/Dude/', 
            'Dude.babylon', scene, (e)=>console.log(e)).then(result=>{
                if(result.meshes.length < 1){
                    return;
                }
                 dude = result.meshes[0];
                dude.scaling = new Vector3(0.025, 0.025, 0.025);
                scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);
                //move
                dude.position = new Vector3(-6, 0, 0);
                dude.rotate(Axis.Y,  Tools.ToRadians(-95));
                const startRotationQuaternion = dude.rotationQuaternion.clone();
                scene.onBeforeRenderObservable.add(()=>{
                    dude.movePOV(0, 0, step);
                    totalDistance += step;
                    if(totalDistance > track[p].distance){
                        dude.rotate(Axis.Y, Tools.ToRadians(track[p].turn));
                        p++;
                        if(p % track.length === 0){
                            p = 0;
                            totalDistance = 0;
                            dude.position = new Vector3(-6, 0, 0);
                            dude.rotationQuaternion= startRotationQuaternion.clone();
                        }
                    }
                })
                shadow(dude);
                buildCamera();
            })
} 
