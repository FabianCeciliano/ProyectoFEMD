import {IProxy} from "./IProxy"
import {AccesDirector} from "./AccesDirector"

export class Proxy implements IProxy{
    
    private director:AccesDirector;

    constructor(facade:AccesDirector){
        this.director=facade;
    }

    async verifyAcces(user: String, password: String): Promise<String> {
        var memberId:String = null;
        await this.director.verifyAcces(user,password).then((value)=>{
            memberId=value;
        });
        return memberId
    }

    async getRol(memberId: String):Promise<String>{
        var memberRol:String = null;
        await this.director.getRol(memberId).then((value)=>{
            memberRol=value;
        })
        return memberRol
    }

}