/*Модуль расчёта движения планет Солнечной системы */

import { SpaceBody } from "./SpaceBody.mjs";
import * as cnst from "./constants.mjs";

const bSun=new SpaceBody({name:"Солнце", m: cnst.mSun, x:0, y:0, vx:0, vy:0});
const bEarth=new SpaceBody({name:"Земля", m: cnst.mEarth, x:1, y:0, vx:0, vy: cnst.vEarth});
const bMoon=new SpaceBody({     name: "Луна", 
                                m: cnst.mMoon, 
                                x:1, 
                                y: cnst.rMoon, 
                                vx: cnst.vMoon,
                                vy: 0});

let bodies=[bSun, bEarth, bMoon];
for(let time=0;time<3600*24*180;time+=cnst.dt){//Время - 180 суток
    for(let i=0;i<bodies.length;++i){
        bodies[i].calcForces(bodies.filter((el,index)=>index!=i));//Выполняем последовательно расчёты новых параметров для каждого тела
    }
    for(let i=0;i<bodies.length;++i){
        bodies[i].setNewCoor();
    }
}

console.log(bEarth);