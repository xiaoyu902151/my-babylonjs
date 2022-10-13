import { Animation, CreateCylinder, CreateLines, ExtrudePolygon, StandardMaterial, Texture, Vector3, Vector4 } from "@babylonjs/core";
import earcut from 'earcut/dist/earcut.min'
import  { Scene } from "@babylonjs/core";

export function car(scene:Scene){
    var outline = [];
    //base
    outline.push(new Vector3(-0.3, 0, -0.1))
    outline.push(new Vector3(0.2, 0, -0.1));
    //curve
    for(let i = 0; i < 40; i++){
        outline.push(new Vector3(0.2 * Math.cos(i * Math.PI/ 80), 0, 
        0.2 * Math.sin(i * Math.PI / 80) - 0.1));
    }
    //top
    outline.push(new Vector3(0, 0, 0.1));
    outline.push(new Vector3(-0.3, 0, 0.1));

    const car  =  ExtrudePolygon('car', {shape: outline, depth: 0.2, faceUV:[
        //top
        new Vector4(0, 0.5, 0.38, 1),
        new Vector4(0, 0, 1, 0.5),
        new Vector4(0.38, 1, 0, 0.5)
    ], wrap: true}, null, earcut);
   const carMaterial = new StandardMaterial('carMaterial');
   carMaterial.diffuseTexture = new Texture('https://assets.babylonjs.com/environments/car.png');
    car.material = carMaterial;
   //wheel
   const rbWheel = CreateCylinder('rbWheel', {diameter: 0.12, height:0.05, faceUV: [
    new Vector4(0, 0, 1, 1),
    new Vector4(0, 0.5, 0, 0.5),
    new Vector4(0, 0, 1, 1)
   ]})
   rbWheel.position.z = -0.1;
   rbWheel.position.x = -0.2;
   rbWheel.position.y = -0.2;    
    rbWheel.parent = car;
    //
    const wheelMaterial = new StandardMaterial('wheelMaterial');
    wheelMaterial.diffuseTexture = new Texture('https://assets.babylonjs.com/environments/wheel.png');
        rbWheel.material = wheelMaterial;
    const lbWheel = rbWheel.clone('lbWheel')
    lbWheel.position.y = 0;
    const rfWheel = rbWheel.clone('rfWheel');
    rfWheel.position.x = 0.1;
    const lfWheel = lbWheel.clone('lfWheel');
    lfWheel.position.x = 0.1;
    //旋转动画
    const wheelAnimation = createWheelAnimation()
    rbWheel.animations = [wheelAnimation];
    lbWheel.animations = [wheelAnimation];
    rfWheel.animations = [wheelAnimation];
    lfWheel.animations = [wheelAnimation];
    //car animation
    car.animations = [createCarAnimation()];
    car.rotation.x = -Math.PI / 2;
    car.rotation.y = Math.PI /2;
    car.position.z = 8;
    car.position.y = 0.06;
    car.position.x = 3;
    scene.beginAnimation(rbWheel, 0, 30, true);
    scene.beginAnimation(lbWheel, 0, 30, true);
    scene.beginAnimation(lfWheel, 0, 30, true);
    scene.beginAnimation(rfWheel, 0, 30, true);
    scene.beginAnimation(car, 0, 210, true);
    return car;
}
function createWheelAnimation(){
    //创建动画
   const wheelAnimation = new Animation('wheelAnimation', 'rotation.y', 30, 
                Animation.ANIMATIONTYPE_FLOAT,
                Animation.ANIMATIONLOOPMODE_CYCLE);
   //创建动画的帧数据
   const animationKeys = [];
   animationKeys.push({frame: 0, value: 0})
   animationKeys.push({frame: 30, value: Math.PI * 2});
   //
   wheelAnimation.setKeys(animationKeys);
  return wheelAnimation;
}

function createCarAnimation(){
    const carAnimation = new Animation('carAnimation', 'position.z', 30, Animation.ANIMATIONTYPE_FLOAT,
                                Animation.ANIMATIONLOOPMODE_CYCLE);
    carAnimation.setKeys([
        {frame: 0, value: 8},
        {frame: 5 * 30, value: -7},
        {frame: 7 * 30, value: -7}
    ])
    return carAnimation;
}