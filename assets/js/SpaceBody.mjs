//Класс космического тела


export class SpaceBody{
    name;//Имя космического тела
    m; //Масса
    
    r=[];//Массив координат тела x,y,z
    
    v=[];//Вектор скорости по направлениям x,y,z
    
    constructor({name, m, x,y,z=0, vx, vy, vz=0}){
        this.m=m;
        this.name=name;
        this.r[0]=x;
        this.r[1]=y;
        this.r[2]=z;
        this.v[0]=vx;
        this.v[1]=vy;
        this.v[2]=vz;
    }

}