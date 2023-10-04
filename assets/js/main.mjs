/*Модуль расчёта движения планет Солнечной системы */

import { SpaceBody } from "./SpaceBody.mjs";
import {SolarSystem} from "./SolarSystem.mjs";
import * as cnst from "./constants.mjs";


const canvas = document.getElementById("solar-system");
const solarSys=new SolarSystem(canvas);//Создаём объект для прорисовки тел солнечной системы
const ctx = canvas.getContext("2d");


const bSun=new SpaceBody({name:"Солнце", m: cnst.mSun, x:0, y:0, vx:0, vy:0});
const bEarth=new SpaceBody({name:"Земля", m: cnst.mEarth, x:1, y:0, vx:0, vy: cnst.vEarth});
const bMoon=new SpaceBody({     name: "Луна", 
                                m: cnst.mMoon, 
                                x:1, 
                                y: cnst.rMoon, 
                                vx: cnst.vMoon,
                                vy: 0});

solarSys.addBody(bSun);
solarSys.addBody(bEarth);
solarSys.addBody(bMoon);


//solarSys.calcOnePeriod(24*3600*180);//Это корректно работает, но пока закоменчено, чтобы проверить вызов через setTimeout
setTimeout(solarSys.calcOnePeriod,0, 24*3600*180);//Это работает только в таком варианте setTimeout(solarSys.calcOnePeriod.bind(solarSys),0,24*3600*180);
console.log(solarSys);