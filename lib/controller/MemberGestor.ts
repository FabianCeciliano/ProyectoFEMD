import {Direction} from '../model/Direction';
import {Member} from '../model/Member';
import { StructureType } from '../model/StructureType';


export class MemberGestor{
    //
    private members : Member[];

    constructor(){
        this.members=[];
    }

    public addMember(member:Member){
        this.members.push(member);
    }
    public getRolMembers() : [Member] {return null};
    public setRol(value : StructureType) : void {};
    public setDirection(direction : Direction) : void {};
    public getDirection() : Direction {return null};
    public getMember(pIdData : number): Member {
        for(let index = 0 ; index < this.members.length ; index++){
            if(this.members[index].id==pIdData){
                //Se devuelven estos datos a la vista
                console.log(this.members[index].name);
                console.log(this.members[index].id);
                console.log(this.members[index].email);
                console.log(this.members[index].telephone);
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
    public getPertenencia():[Member] {return null};
    public setPertenecia(Ppostdata : number, pId : number) :void {};

}