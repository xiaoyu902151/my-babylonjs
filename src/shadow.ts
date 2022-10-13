import { AbstractMesh, DirectionalLight, Mesh, ShadowGenerator, Vector3 } from "@babylonjs/core";
import {scene, setLight} from './index'
export function shadow(castMesh: AbstractMesh){
    //create directional light
    const light  = new DirectionalLight('directional', new Vector3(0, -1, 1), scene);
    light.position = new Vector3(0, 50, -100);
    setLight(light);
    //shadow generator
    const shadowGenerator = new ShadowGenerator(1024, light);
    shadowGenerator.addShadowCaster(castMesh, true);
}