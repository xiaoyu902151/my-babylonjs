import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import {ArcRotateCamera} from '@babylonjs/core/Cameras/arcRotateCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { CreateGround } from '@babylonjs/core/Meshes/Builders/groundBuilder';
import { CreateSphere } from '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { Scene } from '@babylonjs/core/scene';

import { GridMaterial } from '@babylonjs/materials/grid/gridMaterial';

import createVillage from './village';
import { car } from './car';
import { buildCamera } from './camera';
// Get the canvas element from the DOM.
export const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

// Associate a Babylon Engine to it.
const engine = new Engine(canvas);

// Create our first scene.
export var scene = new Scene(engine);
//buildCamera();

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
 /* var light = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
 light.intensity = 0.1; */
 var light;

// Default intensity is 1. Let's dim the light a small amount
export function setLight(light_){
  light = light_;
}
// Create a grid material
//var material = new GridMaterial("grid", scene);

// Our built-in 'sphere' shape.
/* var sphere = CreateSphere('sphere1', { segments: 16, diameter: 2 }, scene);

// Move the sphere upward 1/2 its height
sphere.position.y = 2;

// Affect a material
sphere.material = material; */

// Our built-in 'ground' shape.
/* var ground = CreateGround('ground1', { width: 6, height: 6, subdivisions: 2 }, scene);

// Affect a material
ground.material = material; */

createVillage();
car(scene);
//dude(scene);
// Render every frame
export function startRender(){
  engine.runRenderLoop(() => {
    scene.render();
  });

}

//
