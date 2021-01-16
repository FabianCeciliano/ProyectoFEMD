import { Publisher } from './Publisher';
import { Member } from '../model/Member';


export class Forum {

    private canal : Publisher; //Zona1, Zona2 - Rama2, Grupo3

    constructor(){
        this.canal = null;
    }

    public createChannel() : Boolean{
        this.canal = new Publisher();
        return true;
    }

    public setSubscribers(members : Member[]){
        this.canal.subscribe(members);
    }

    // Crear movimiento \ Cargar el movimiento desde la bd
        // Con el movimiento hace/carga los publisher
        //
    
    public getPublisher() : Publisher {
        return this.canal;
    }

}