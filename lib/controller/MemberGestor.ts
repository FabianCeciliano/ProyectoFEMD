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
    public getMember(): Member {return null};
    public deleteMiembro(pIdData : number) : boolean {
        for (let index = 0; index < this.members.length; index++) {
            if(this.members[index].id==pIdData){
                this.members.splice(index,1);
                return true;
            }            
        }
        return false;
    };
    public getFacilitador() : boolean {return null};
    public setFacilitador(pData : boolean) {return null};
    public getPertenencia():[Member] {return null};
    public setPertenecia(Ppostdata : number, pId : number) :void {};

}