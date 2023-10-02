/*Модуль расчёта движения планет Солнечной системы */

import { SpaceBody } from "./SpaceBody.mjs";
import * as cnst from "./constants.mjs";

let bodyes=[];//Массив небесных тел

const bEarth=new SpaceBody({name:"Земля", m: cnst.mEarth, x:1, y:0, vx:0, vy: cnst.vEarth});
