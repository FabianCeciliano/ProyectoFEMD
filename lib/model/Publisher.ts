import { Contribution } from './Contribution';
import Subscriber from './Subscriber';
import {MyNotification} from './MyNotification';
import { Member } from './Member';


export class Publisher{

    private subscribers : Subscriber [];

    constructor(){
    }

    subscribe(params: Member[]){
        this.subscribers = params;
    }

    unsubscribe(params: Subscriber) : void {}

    /*   DEPRECATED
    notifySubscribers(asunto:String,cuerpo:String,emisor:String) : void {
        this.subscribers.forEach(element => {
            element.agregarNoticia(new MyNotification(asunto,cuerpo,emisor));
        });
    }
    */    

    public notifySuscibrers(notification: MyNotification) : void {
        this.subscribers.forEach(element => {
            element.agregarNoticia(notification.clone());
        });
    }
}