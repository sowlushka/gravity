/*Класс прорисовки планет в системе координат canvas */
import { SpaceBody } from "./SpaceBody.mjs";
import { dt } from "./constants.mjs";

const scaleFactor=0.95;//Множитель при масштабе. Чтобы при автомасштабировании между краями canvas и самым дальним телом оставались поля.
const startScale=2;//Исходный масштаб системы, равный 1 а.е.

export class SolarSystem{
    canvasHeight;//Высота блока canvas
    canvasWidth;//Ширина блока canvas
    #canvasMinDimention;//Минимальное значение между высотой и шириной

    scale; // Коэффициент масштаба для прорисовки планет на canvas
    autoScale=true;//Разрешить пересчёт масштаба при добавлении/удалении объектов
    #bodies=[];//Массив объектов

    solarTime=0;//Абсолютное время в Солнечной системе от начала моделирования в секундах

    //Координаты центра у canvas
    canvasCenter_x;
    canvasCenter_y;

    constructor(id){
    // id - id для canvas, в котором выполняется прорисовка
        this.canvasHeight=id.height;
        this.canvasWidth=id.width;
        this.#canvasMinDimention=this.canvasWidth>this.canvasHeight?this.canvasHeight:this.canvasWidth;
        this.scale=this.#canvasMinDimention/startScale*scaleFactor;//При старте меньшая размерность равна 2 а.е.

        this.canvasCenter_x=Math.floor(this.canvasWidth/2);
        this.canvasCenter_y=Math.floor(this.canvasHeight/2);
    }

    addBody(spaceBody){
        if(this.#bodies.some(el=>(el.name==spaceBody.name))){
            throw("Телам нельзя давать одинаковые имена");
        }
        this.#bodies.push(spaceBody);
        if(this.autoScale) this.#recalcScale();

        
    }


    #recalcScale(){
    //Пересчитываем масштаб.
        let maxR=0;
        if(this.#bodies.length==0){
            this.scale=this.#canvasMinDimention/startScale*scaleFactor;
        }else if(this.#bodies.length==1){
            maxR=Math.sqrt(this.#bodies[0].r.reduce((sum,r_i)=>sum+r_i**2,0));
            this.scale=maxR>startScale?this.#canvasMinDimention/maxR/2*scaleFactor:this.#canvasMinDimention/startScale*scaleFactor;;
        }else{
        //Перебираем тела в поисках максимального расстояния между ними
            for(let i=0;i<this.#bodies.length-1;++i){//счёт первого сравниваемого тела
                for(let j=i+1;j<this.#bodies.length;++j){//счёт второго сравниваемого тела
                    let r=0;
                    for(let k=0;k<this.#bodies[0].r.length;++k){//k - счётчик оси пространства
                        r+=(this.#bodies[i].r[k]-this.#bodies[j].r[k])**2;
                    }
                    r=Math.sqrt(r);
                    if(maxR<r)maxR=r;
                }
            }
            this.#canvasMinDimention/maxR/2*scaleFactor;
        }
    }

    calcOneTic(){
    //Расчёт нового положения тел в системе за время одного шага, равное dt    
        for(let i=0;i<this.#bodies.length;++i){
            //В метод расчёта положения i-го тела передаём через .filter() массив тел, влияющих на i-e тело
            this.#bodies[i].calcForces(this.#bodies.filter((el,index)=>index!=i));//Выполняем последовательно расчёты новых параметров для каждого тела
        }
        for(let i=0;i<this.#bodies.length;++i){
            this.#bodies[i].setNewCoor();//Делаем расчитанные параметры текущими.
        }
        this.solarTime+=dt;
    }

    calcOnePeriod(time=3600){
    //time - время в секундах, в течении которого выполняется расчёт нового положения тела. По умолчанию - 1 час (3600 с)
    //Функцию целесообразно вызывать через setTimeout
        for(let t=0;t<time;t+=dt){
            this.calcOneTic();
        }
    }
}