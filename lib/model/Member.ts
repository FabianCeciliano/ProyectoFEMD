
import {Direction} from './Direction';
import { Rol } from './Rol';
import {Person} from './Person';


export class Member extends Person{
    private direction : String;
    private rol: Rol;
    private facilitador: boolean;
    

    constructor(direction : String,rol : Rol,facilitador : boolean,id:number,name:String,email:String,telephone:number){
        super(id,name,email,telephone);
        this.direction=direction;
        this.rol=rol;
        this.facilitador=false;
    }

    public getName(){
        return this.name;
    }
    public getEmail(){
        return this.email;
    }
    public getDirection():String{
        return this.direction;
    }
    public set_Direction(value:String) {
        this.direction = value;
    }
    public getId(){
        return this.id;
    }
    public get_facilitador(): boolean {
        return this.facilitador;
    }
    public set_facilitador(value: boolean) {
        this.facilitador = value;
    }
    public get_rol(): Rol {
        return this.rol;
    }
    public set_rol(value: Rol) {
        this.rol = value;
    }

}