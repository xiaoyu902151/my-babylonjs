import { CreateGround } from '@babylonjs/core/Meshes/Builders/groundBuilder';
import { CreateBox } from '@babylonjs/core/Meshes/Builders/boxBuilder';

import  '@babylonjs/core/Materials/standardMaterial'

import {Sound} from '@babylonjs/core/Audio/sound'
import '@babylonjs/core/Audio/audioSceneComponent'
import { Color3, CreateLines, CubeTexture, Mesh, MeshBuilder, Sprite, SpriteManager, StandardMaterial, Texture, Vector3, Vector4 } from '@babylonjs/core';
import { CreateCylinder } from '@babylonjs/core';
import { buildFoutain } from './paticleFoutain';
import { buildLamp } from './lamp';
import { buildDude } from './character';
import {scene} from './index'
/**
 * 创建村庄
 */
export default function createVillage(){
    const ground = CreateGround('ground', {width: 14, height: 14});
    //草地添加绿色材质
    const groundMaterial = new StandardMaterial('groundMaterial', scene);
    //
    groundMaterial.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/villagegreen.png");
    //groundMaterial.diffuseColor =  Color3.Green();
    groundMaterial.diffuseTexture.hasAlpha = true;

    ground.material = groundMaterial;
    //add largeGround
    buildLargeGround();
    //
    buildSky();
    //add sound
    const sound = new Sound('sound', 'https://playground.babylonjs.com/sounds/cellolong.wav',
        scene, null, {loop: true, autoplay: false});
    //创建房子
   const semiHouse = buildHouse(2);
   semiHouse.rotation.y = Math.PI / 16;
   semiHouse.position.x = -2.5;
   semiHouse.position.z = 4;

   //
   const detachedHouse = buildHouse(1);
   detachedHouse.rotation.y = -Math.PI / 16;
   detachedHouse.position.x = 3;
   detachedHouse.position.z = 3;
   //
   const places = []; //each entry is an array [house type, rotation, x, z]
    places.push([1, -Math.PI / 16, -6.8, 2.5 ]);
    places.push([2, -Math.PI / 16, -4.5, 3 ]);
    places.push([2, -Math.PI / 16, -1.5, 4 ]);
    places.push([2, -Math.PI / 3, 1.5, 6 ]);
    places.push([2, 15 * Math.PI / 16, -6.4, -1.5 ]);
    places.push([1, 15 * Math.PI / 16, -4.1, -1 ]);
    places.push([2, 15 * Math.PI / 16, -2.1, -0.5 ]);
    places.push([1, 5 * Math.PI / 4, 0, -1 ]);
    places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3 ]);
    places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5 ]);
    places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7 ]);
    places.push([2, Math.PI / 1.9, 4.75, -1 ]);
    places.push([1, Math.PI / 1.95, 4.5, -3 ]);
    places.push([2, Math.PI / 1.9, 4.75, -5 ]);
    places.push([1, Math.PI / 1.9, 4.75, -7 ]);
    places.push([2, -Math.PI / 3, 5.25, 2 ]);
    places.push([1, -Math.PI / 3, 6, 4 ]);
    //遍历生成房子
    places.forEach((place, index)=>{
       const house = place[0] === 2 ? semiHouse.createInstance('semiHouse_' + index) : 
              detachedHouse.createInstance('detachedHouse_' + index);
       house.rotation.y = place[1];
       house.position.x = place[2];
       house.position.z = place[3];
    })
    //build tree
    buildTree();
    addUFO();
    //build fountain
    buildFoutain(scene);
    // build street lights
    //buildLamp();
    //build dude
    buildDude();
    //build shadow
    ground.receiveShadows = true
    
}
//每个面的纹理独立的房子
const buildHouse = (width)=>{
  //房顶材质
  const roofMaterial = new StandardMaterial('roofMaterial');
  roofMaterial.diffuseTexture = new Texture('https://assets.babylonjs.com/environments/roof.jpg');
  //房子材质
  const boxMaterial = new StandardMaterial('boxMaterial');
  const boxTextureUrl = width === 2 ?   'https://assets.babylonjs.com/environments/semihouse.png' : 'https://assets.babylonjs.com/environments/cubehouse.png';
  boxMaterial.diffuseTexture = new Texture(boxTextureUrl);
  //三角柱体 房顶
  const roof =  CreateCylinder('roof', {tessellation: 3, height: 1.2, diameter: 1.4});
  roof.scaling.x = 0.5
  roof.scaling.y = width;
  roof.rotation.z =  Math.PI / 2;
  roof.position.y = 0.17 + 1;//.7 + .35 / = 1
  roof.material = roofMaterial;
  //房身
  //定义四个面纹理uv坐标
  const faceUVs = [];
  if(width === 2){
    faceUVs[0] = new Vector4(0.6, 0, 1, 1);
    faceUVs[1] = new Vector4(0, 0, 0.4, 1);
    faceUVs[2] = new Vector4(0.4, 0, 0.6, 1);
    faceUVs[3] = new Vector4(0.4, 0, 0.6, 1);
  }else{
    faceUVs[0] = new Vector4(0.5, 0, 0.75, 1);
    faceUVs[1] = new Vector4(0, 0, 0.25, 1);
    faceUVs[2] = new Vector4(0.25, 0, 0.5, 1);
    faceUVs[3] = new Vector4(0.75, 0, 1, 1);
  }
  const box = CreateBox('box', {faceUV: faceUVs, wrap: true, width: width})
  box.position.y = 0.5;
  box.material = boxMaterial;
   //combine mesh
 return   Mesh.MergeMeshes([box, roof],true, false, null, false, true);
}

function buildLargeGround(){
  //https://assets.babylonjs.com/environments/villageheightmap.png
  const largeGround = MeshBuilder.CreateGroundFromHeightMap('largeGround', 'https://assets.babylonjs.com/environments/villageheightmap.png',
      {width: 150, height: 150, subdivisions: 20, minHeight: 0, maxHeight: 4})
  largeGround.position.y = -0.01;
  const largeGroundMaterial = new StandardMaterial('largeGroundMaterial');
  largeGroundMaterial.diffuseTexture = new Texture('https://assets.babylonjs.com/environments/valleygrass.png');
  largeGround.material = largeGroundMaterial;
}

function buildSky(){
  const sky = MeshBuilder.CreateBox('sky', {size: 150});
  const skyMaterial = new StandardMaterial('skyMaterial');
  skyMaterial.reflectionTexture = new CubeTexture('https://playground.babylonjs.com/textures/skybox', scene);
  skyMaterial.backFaceCulling = false;
  skyMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  skyMaterial.diffuseColor = new Color3(0, 0, 0);
  skyMaterial.specularColor = new Color3(0, 0, 0)
  sky.material = skyMaterial;


}

function buildTree(){
   const treeSpriteManager = new SpriteManager('treeSprite', 'https://playground.babylonjs.com/textures/palm.png', 
        2000, {width: 512, height: 1024}, scene);

    for(let i = 0; i < 500; i++){
      const sprite = new Sprite('tree', treeSpriteManager);
      sprite.position = new Vector3(Math.random() * -20, 0.5, Math.random() * 20 + 8);
    }
}
function addUFO(){
  const ufoManager = new SpriteManager('ufoManager', 'https://assets.babylonjs.com/environments/ufo.png',
    1, {width: 128, height: 76}, scene);
  const ufo = new Sprite('ufo', ufoManager);
  ufo.position.y = 5;
  ufo.playAnimation(0, 16, true, 125);
  ufo.width =2;
  ufo.height = 1;
}


