import { Contribution } from './Contribution';
import Subscriber from './Subscriber';
import {MyNotification} from './MyNotification';


export class Publisher{

    private subscribers : Subscriber [];
    private ruta : String;

    constructor(ruta : String){
        this.ruta = ruta;
    }

    subscribe(params: Subscriber) : void {}

    unsubscribe(params: Subscriber) : void {}

    notifySubscribers() : void {}

}


