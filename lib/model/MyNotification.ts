import { measureMemory } from "vm";

export class MyNotification {

    private nombre : String;            // Este es el asunto o nombre de la noticia
    private nombreEmisor : String;         // Id de la persona que envia la noticia
    private currentDate : Date;     
    private mensaje : String;
    private estado : Boolean;

    constructor(pNombre:String, mensaje:String, nombreEmisor:String){
        this.nombre = pNombre;
        this.mensaje =mensaje;
        this.estado = false;
        this.currentDate = new Date();
        this.nombreEmisor = nombreEmisor;
    }

    public setAll(pNombre:String, pNombreEmisor:String, pMensaje:String, estado:Boolean, date:Date){
        this.nombre = pNombre;
        this.mensaje = pMensaje;
        this.estado = estado;
        this.currentDate = date;
        this.nombreEmisor = pNombreEmisor;
    }


    formatNotification(route : String[]) : void { //[ " ", " ", " "]
        var message = "";
        message += this.nombreEmisor;
        this.nombreEmisor = message;
        if( route.length >= 3 ){
            message+=" del grupo " + route[2];
        }
        if( route.length >= 2 ){
            message+=" de la rama "+ route[1]
        }
        if( route.length >= 1 ){
            message += " de la zona "+ route[0]
        }
        message += " ha publicado : "+this.mensaje;

        this.mensaje=message;

    }

    public getNewName () {
        return this.nombre;
    }

    public getnombreEmisor () {
        return this.nombreEmisor;
    }

    public getDate () {
        return this.currentDate;
    }
    
    public getMessage () {
        return this.mensaje;
    }    
    
    public getEstado () {
        return this.estado;
    }

    public updateEstado( estado: Boolean ){
        this.estado = estado;
    }

    public clone(){
        var clone = new MyNotification(this.nombre, this.mensaje, this.nombreEmisor);
        clone.currentDate=this.currentDate;
        return clone;
    }

}


