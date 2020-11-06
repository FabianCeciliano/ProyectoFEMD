
import {Direction} from './Direction';
import { Rol } from './Rol';
import {Person} from './Person';


export class Member extends Person{
    private direction : Direction;
    private rol : Rol;
    private facilitador : boolean;
    //private pertenencia : [number];

    constructor(direction : Direction,rol : Rol,facilitador : boolean,id:number,name:String,email:String,telephone:number){
        super(id,name,email,telephone);
        this.direction=direction;
        this.rol=rol;
        this.facilitador=facilitador;
    }

    getName(){
        return this.name;
    }

}