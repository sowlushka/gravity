/*Модуль расчёта движения планет Солнечной системы */

import { SpaceBody } from "./SpaceBody.mjs";
import * as cnst from "./constants.mjs";

let bodyes=[];//Массив небесных тел

const bSun=new SpaceBody({name:"Солнце", m: cnst.mSun, x:0, y:0, vx:0, vy:0});
const bEarth=new SpaceBody({name:"Земля", m: cnst.mEarth, x:1, y:0, vx:0, vy: cnst.vEarth});
const bMoon=new SpaceBody({     name: "Луна", 
                                m: cnst.mMoon, 
                                x:1, 
                                y: cnst.rMoon, 
                                vx: cnst.vMoon,
                                vy: 0});


console.log(bSun.m);