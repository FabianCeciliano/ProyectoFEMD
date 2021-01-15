import { MyNotification } from './MyNotification';
export default interface Subscriber {
    
    agregarNoticia( notification : MyNotification): Boolean
}