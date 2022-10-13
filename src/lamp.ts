import { Color3, Mesh, MeshBuilder, SpotLight, StandardMaterial, Vector3 } from "@babylonjs/core";
import {scene} from './index'
export function buildLamp(){
  //lamp shape
  const lampShape = [];
  for(let i = 0; i < 20; i++){
        lampShape.push(new Vector3(Math.cos(i * Math.PI / 10), 
            Math.sin(i * Math.PI / 10), 0));
  }
  lampShape.push(lampShape[0]);
  //lamp path
  const lampPath = [];
  lampPath.push(new Vector3(0, 0, 0));
  lampPath.push(new Vector3(0, 10, 0));
  for(let i = 0; i < 20; i++){
    lampPath.push(new Vector3(1 + Math.cos(Math.PI - i * Math.PI / 40), 
        10 + Math.sin(Math.PI - i * Math.PI / 40), 0));
  }
  lampPath.push(new Vector3(3, 11, 0));
  //extrude
  const lamp = MeshBuilder.ExtrudeShape('lamp', {
    shape: lampShape, path: lampPath, scale: 0.5, cap: Mesh.CAP_END});
  //bulb
  const bulb = MeshBuilder.CreateSphere('bulb', {diameterX: 1.6, diameterZ: 0.8});
  const yellowMaterial = new StandardMaterial('yellowMaterial');
  yellowMaterial.emissiveColor = Color3.Yellow();
  bulb.material = yellowMaterial;
  bulb.position.y = 10.5;
  bulb.position.x = 2;
  bulb.parent = lamp;
  //spot light
  const lampLight = new SpotLight('lampLight', Vector3.Zero(), new Vector3(0, -1, 0),
    Math.PI, 1, scene);
    lampLight.diffuse = Color3.Yellow();
    lampLight.parent = bulb;
    lamp.scaling = new Vector3(0.2, 0.2, 0.2);
    lamp.position = new Vector3(1, 0, -2);
    const lamp2 = lamp.clone('lamp2');
    lamp2.position = new Vector3(1, 0, 4);
    const lamp3 = lamp.clone('lamp3');
    lamp3.position.x = -2;
    lamp3.position.z = 2;
    lamp3.rotation.y =  Math.PI / 2;
  //return lamp;

}