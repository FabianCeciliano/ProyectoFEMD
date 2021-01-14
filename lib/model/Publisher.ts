import { Contribution } from './Contribution';
import Subscriber from './Subscriber';
import {Notification} from './Notification';


export class Publisher implements Subscriber{

    private subscribers : Subscriber [];
    private notifications : Notification [];

    constructor(){
        
    }

    
    subscribe() : void {}

    unsubscribe() : void {}

    notifySubscriber() : void {}

    agregarNoticia(id: Number): Boolean {
        throw new Error('Method not implemented.');
    }

}


