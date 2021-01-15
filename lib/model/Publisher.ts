import { Contribution } from './Contribution';
import Subscriber from './Subscriber';
import {MyNotification} from './MyNotification';


export class Publisher{

    private subscribers : Subscriber [];
    private ruta : String;

    constructor(){
        
    }

    subscribe(params: Subscriber) : void {}

    unsubscribe(params: Subscriber) : void {}

    notifySubscribers() : void {}

}


