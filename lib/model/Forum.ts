import { Publisher } from './Publisher';

export class Form {

    private canal : Publisher; //Zona1, Zona2 - Rama2, Grupo3

    constructor(){
        this.canal = null;
    }

    public createNewChannel(cuerpo : String , asunto : String , nivel : String ,ruta : String) : void{
        //validate route
        this.canal = new Publisher(ruta);
    }

    // Crear movimiento \ Cargar el movimiento desde la bd
        // Con el movimiento hace/carga los publisher
        // 
    

}