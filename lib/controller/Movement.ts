import { Gestor } from './StructureGestor';
import { MemberGestor } from './MemberGestor';

export class Movement{

    private cedJuridica : number;
    private name : String;
    private website :String;
    private country : String;
    private zoneQuantity: number;
    private groupQuantity: number;
    private branchQuantity: number;
    private phoneNumber: number;
    private logo: number;
    private internationalGrowth :boolean;
    private gStructure:Gestor;
    private gMembers:MemberGestor;

    constructor(cedJuridica:number, name:String, website :String, country : String,phoneNumber: number){
        this.cedJuridica = cedJuridica;
        this.name = name;
        this.website = website;
        this.country = country;
        this.phoneNumber = phoneNumber;
        this.gStructure = new Gestor();
        this.gMembers = new MemberGestor();
    }

    getMovementName():String{
        return this.name;
    }

    getMovementId():number{
        return this.cedJuridica;
    }

    getStructure(){
        return this.gStructure;
    }

    getMembers(){
        return this.gMembers;
    }

    getMember(idMember:number){
        return this.gMembers.getMember(idMember);
    }

}