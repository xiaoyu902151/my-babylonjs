import { Color4, Mesh, MeshBuilder, ParticleSystem, PointerEventTypes, Scene, Texture, Vector3 } from "@babylonjs/core";
var scene:Scene;
var fountain:Mesh, particleSystem:ParticleSystem, isStart:boolean;
export function buildFoutain(s:Scene){
    scene = s;
    const profile = [
        new Vector3(0, 0, 0),
        new Vector3(10, 0, 0),
        new Vector3(10, 4, 0),
        new Vector3(8, 4, 0),
        new Vector3(8, 1, 0),
        new Vector3(1, 2, 0),
        new Vector3(1, 25, 0),
        new Vector3(3, 27, 0)
    ]
     fountain = MeshBuilder.CreateLathe('fountain', {
        shape: profile, sideOrientation: Mesh.DOUBLESIDE
    });
    fountain.scaling = new Vector3(0.04, 0.04, 0.04);
    fountain.position.x = -3;
    fountain.position.z = -3;
    spray();
    return fountain;
}

function spray(){
     particleSystem = new ParticleSystem('fountainSpray', 5000, scene);
    particleSystem.particleTexture = new Texture('https://playground.babylonjs.com/textures/flare.png')
    //basic define eimit region
    particleSystem.emitter = new Vector3(-3, 0.8, -3);
    particleSystem.minEmitBox = new Vector3(-0.01, 0, -0.01);
    particleSystem.maxEmitBox = new Vector3(0.01, 0, 0.01);
    // define color
    particleSystem.color1 = new Color4(0.7, 0.8, 1, 1);
    particleSystem.color2 = new Color4(0.2, 0.5, 1, 1);
    particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;
    //size and lifetime
    particleSystem.minSize = 0.01;
    particleSystem.maxSize = 0.05;
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 1.5;
    //
    particleSystem.emitRate = 1500;
    //add direction
    particleSystem.direction1 = new Vector3(-1, 8, 1);
    particleSystem.direction2 = new Vector3(1, 8, -1);
    particleSystem.minEmitPower = 0.2;
    particleSystem.maxEmitPower = 0.6;
    particleSystem.updateSpeed = 0.01;
    //gravity
    particleSystem.gravity = new Vector3(0, -10, 0);
   // particleSystem.start();
   registerClickEvent(); 
   
}
function registerClickEvent(){
    scene.onPointerObservable.add((pointerInfo)=>{
        switch(pointerInfo.type){
            case PointerEventTypes.POINTERDOWN:
                if(pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh === fountain){
                    isStart = !isStart;
                    if(isStart){
                        particleSystem.start();
                    }else{
                        particleSystem.stop();
                    }
                }
        }
    })
}