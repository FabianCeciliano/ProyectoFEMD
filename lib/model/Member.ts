
import { Direction } from './Direction';
import { Rol } from './Rol';
import { Person } from './Person';
import Subscriber from './Subscriber';
import { MyNotification } from './MyNotification';


export class Member extends Person implements Subscriber{
    private direction : String;
    private rol: Rol;
    private facilitador: boolean;
    private _gruposMentoria: String[]; //deprecated
    private notificacionesUsuario : MyNotification[];

    public getgruposMentoria(): String[] {
        return this._gruposMentoria;
    }
    public addGrupoMentoria(value: String ) {
        this._gruposMentoria.push(value);
    }
    

    constructor(direction : String,rol : Rol,facilitador : boolean,id:number,name:String,email:String,telephone:number){
        super(id,name,email,telephone);
        this.direction=direction;
        this.rol=rol;
        this.facilitador=facilitador;
        this.notificacionesUsuario=[];
    }
    
    agregarNoticia(notification: MyNotification): Boolean {
        this.notificacionesUsuario.push(notification);
        return true;
    }

    public clone() : Member {
        return new Member(this.direction,this.rol,this.facilitador,this.id,this.name,this.email,this.telephone);
    }

    public getName(){
        return this.name;
    }
    public getEmail(){
        return this.email;
    }

    public getNotifications():MyNotification[]{

        return this.notificacionesUsuario;
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