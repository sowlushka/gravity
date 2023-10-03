//Класс космического тела
import {G, dt} from "./constants.mjs";

export class SpaceBody{
    name;//Имя космического тела
    #m; //Масса
    
    
    r=[];//Массив координат тела x,y,z
    #newR=[];//Массив новых расчётных координат тела через время дифференцирования dt

    
    #v=[];//Вектор скорости по направлениям x,y,z
    #newV=[];//Массив новых расчётных значений скорости через время дифференцирования dt
    
    constructor({name, m, x,y,z=0, vx, vy, vz=0}){
        this.#m=m;
        this.name=name;
        this.r[0]=x;
        this.r[1]=y;
        this.r[2]=z;
        this.#v[0]=vx;
        this.#v[1]=vy;
        this.#v[2]=vz;
    }

    get m(){
        return this.#m;
    }

    calcForces(...bodies){
    //Расчёт влияния космических тел из массива bodies на данное тело

        this.#newV=[...this.#v];//Копируем начальные значения скорости
        this.#newR=[...this.r];//Копируем начальные значения пространственных координат

        for(let i=0;i<bodies.length;++i){//Перебираем космичесчкие тела
            //Расчёт расстояния между телами по их координатам
            let r=0;
            for(let j=0;j<this.#r.length;++j){
                r+=(bodies[i].r[j]-this.r(j))**2;
            }
            r=Math.sqrt(r);//Расстояние до тела

            for(let j=0;j<this.#r.length;++j){//Вычисление суммарного изменения скорости по всем координатам с учётом каждой планеты
                this.#newV[j]+=G*this.#m*bodies[i].m/(r**3)*(bodies[i].r[j]-this.r[j])*dt;//Добавляем приращение скорости за время dt по оси j. v=G*m*M/r3*(x-x0)*dt+v0
            }
        }

        //Вычисляем новые координаты тела через время dt
        for(let j=0;j<this.#r.length;++j){
            this.#newR+=this.#newV[j]*dt;
        }
    }

    setNewCoor(){
    //Присвоить текущим координатам тела расчётные значения
        this.r=[...this.#newR];
        this.#v=[...this.#newV];
    }

}