import {Direction} from '../model/Direction';
import {Member} from '../model/Member';
import { StructureType } from '../model/StructureType';
import { Rol } from '../model/Rol';


export class MemberGestor{
    //
    private members : Member[];

    constructor(){
        this.members=[];
    }
    
    public getAllMembers() : String[] {
        let values : String [] = [];
        for(let index = 0 ; index < this.members.length ; index++){
            let member = this.members[index].name + "-" + this.members[index].id;
            values.push(member);
        }
        return values;
    };
    public setRol(value : StructureType) : void {};
    public setDirection(direction : Direction) : void {};
    public getDirection() : Direction {return null};

    public idExist(id:number){
        for(let index = 0 ; index < this.members.length ; index++){
            if(this.members[index].id==id){
                return true;
            } 
        }
        return false;
    }

    public addMember(id:number, name:String, telephone:number, mail:String, direction:String,esMonitor:boolean){
        var member:Member = new Member(direction,Rol.groupMember,false,id,name,mail,telephone)
        member.set_facilitador(esMonitor);
        if(esMonitor){
            member.set_rol(Rol.monitor);
        }
        this.members.push(member);
    }
    public updateMember (id:number,name:String,celular:number,mail:String,direccion:String,esMonitor:boolean) :Boolean {
        for(let index = 0 ; index < this.members.length ; index++){
            if(this.members[index].id==id){
                this.members[index].telephone=celular;
                this.members[index].email=mail;
                this.members[index].name=name;
                this.members[index].set_facilitador(esMonitor);
                this.members[index].set_Direction(direccion);
            } 
        }
        return false;
    }
    public getMember(pIdData : number): Member {
        for(let index = 0 ; index < this.members.length ; index++){
            if(this.members[index].id==pIdData){
                //Se devuelven estos datos a la vista
                //console.log(this.members[index].name);
                //console.log(this.members[index].id);
                //console.log(this.members[index].email);
                //console.log(this.members[index].telephone);
                return this.members[index];
            } 
        }
    };
    public deleteMiembro(pIdData : number) : boolean {
        for (let index = 0; index < this.members.length; index++) {
            if(this.members[index].id==pIdData){
                this.members.splice(index,1);
                return true;
            }            
        }
        return false;
    };
    public setFacilitador(pIdData : number) {
        for (let index = 0; index < this.members.length; index++) {
            if(this.members[index].id==pIdData){
                this.members[index].set_facilitador(true);
            }            
        }
    };

    public getMonitors() : String[]{
        let monitors : String[] = [];
        for (let index = 0; index < this.members.length; index++) {
            if(this.members[index].get_facilitador()==true){
                monitors.push(this.members[index].name +"-"+ this.members[index].id);
            }
        }
        return monitors;
    }
    public getPertenencia():[Member] {return null};
    public setPertenecia(Ppostdata : number, pId : number) :void {};

    public printMembers(){
        console.log(this.members);
    }

}