import { Gestor } from './StructureGestor';
import { MemberGestor } from './MemberGestor';
import { Cupula } from '../model/Cupula';
import { Contribution } from '../model/Contribution';
import { ContributionType } from 'model/ContributionType';

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
    private cupula : Cupula;

    constructor(cedJuridica:number, name:String, website :String, country : String,phoneNumber: number){
        this.cedJuridica = cedJuridica;
        this.name = name;
        this.website = website;
        this.country = country;
        this.phoneNumber = phoneNumber;
        this.gStructure = new Gestor();
        this.gMembers = new MemberGestor();
        this.cupula = new Cupula();
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

    addContribution(emissor:String, type:String, description:String) : Boolean{
    let contribution = new Contribution(emissor, type, description);
    return this.cupula.addContribution(contribution);
    }

}