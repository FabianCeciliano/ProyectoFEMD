import { Gestor } from './StructureGestor';
import { MemberGestor } from './MemberGestor';
import { Cupula } from '../model/Cupula';
import { Contribution } from '../model/Contribution';
import { ContributionType } from 'model/ContributionType';
import { Member } from '../model/Member';
import { Rol } from '../model/Rol';
import { Forum } from '../model/Forum';

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
    private foro : Forum;

    constructor(cedJuridica:number, name:String, website :String, country : String,phoneNumber: number){
        this.cedJuridica = cedJuridica;
        this.name = name;
        this.website = website;
        this.country = country;
        this.phoneNumber = phoneNumber;
        this.gStructure = new Gestor();
        this.gMembers = new MemberGestor();
        this.cupula = new Cupula();
        this.foro = new Forum();
    }

    getForum(){
        return this.foro;
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

    addContribution(emissor:String, type:String, description:String) : Contribution {
        var contribution = new Contribution(emissor, type, description);
        this.cupula.addContribution(contribution);
        return contribution;
    };

    getContribution(){
        return this.cupula.getContributions()
    }

    setAsessorToCupule(idAsesor : number, nombreAsesor : String, celularAsesor : number, correoAsesor : String, direccionAsesor : String) : Boolean{
        
        return this.cupula.addAssessor( new Member (direccionAsesor, Rol.assessor, false, idAsesor, nombreAsesor, correoAsesor, celularAsesor));
    };

    addComitteeMember( member : Member) : Boolean{
        
        return this.cupula.addCommitteeMember(member);
    };

    generateContributionReport( month : String, reportType : String) : String{
        return this.cupula.createReport(reportType, month);
    }

    createNewChannel() : Boolean{
        return this.foro.createChannel();
    }

    assignSubscribers(members:Member[]){
        this.foro.setSubscribers(members);
    }



}