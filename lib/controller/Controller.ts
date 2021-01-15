import {IComponent} from '../model/IComponent';
import {Member} from '../model/Member';
import {Movement} from './Movement';
import { Composite_Level } from '../model/Composite_Level';
import { StructureType } from '../model/StructureType';
import { Direction } from '../model/Direction'
import {Rol} from '../model/Rol'
import { LeafComponent } from '../model/LeafComponent';
import { Contribution } from 'model/Contribution';


export class Controller {
    controller(): String[] {
      throw new Error("Method not implemented.");
    }

    private movementList:Movement[]=[];
    private movement:Movement;

    public selectMovement(idMovement:number):boolean{
        for (let index = 0; index < this.movementList.length; index++) {
            if(this.movementList[index].getMovementId()==idMovement){
                this.movement=this.movementList[index];
                return true;
            }            
        }
        return false;
    }

    public movementIsCreated():boolean{
        if(this.movement!=null){
            return true;
        }
        return false;
    }

    public getAllMovements():String[]{
        var movements:String[] = [];
        for (let index = 0; index < this.movementList.length; index++) {
            movements.push(this.movementList[index].getMovementName()+"-"+this.movementList[index].getMovementId());
        }
        return movements;
    }

    public getActualMovementId():number{
        return this.movement.getMovementId();
    }

    public createMovement(cedJuridica:number, name:String, website :String, country : String,
        phoneNumber: number):boolean{
            
        var newMovement:Movement = new Movement(cedJuridica, name, website , country ,phoneNumber);
        this.movementList.push(newMovement);
        this.movement = newMovement;
        
        return true;

    }

    public addAsesor(idAsesor : number){
        
        var assesor:Member = this.movement.getMember(idAsesor).clone();
        this.movement.getStructure().addAssesor(assesor);

        return true;

    }

    public createNewZone (id:number, name:String) : Boolean {
        let result = this.movement.getStructure().addZone(new Composite_Level(id,name,StructureType.Zone))
        return result;
    };
    public createNewBranch (zoneName:String, id:number, name:String) : Boolean {
        return this.movement.getStructure().addBranch(new Composite_Level(id,name,StructureType.Branch),zoneName);
    };
    public createNewGroup (zoneName:String, branchId:number, id:number, name:String) : Boolean {
        return this.movement.getStructure().addGroup(new LeafComponent(id,name,StructureType.Group),zoneName,branchId);
    };
    
    public existZone (name:String) : Boolean {
        let result = this.movement.getStructure().existZone(name);
        return result;
    };

    public addMonitor(zoneName:String, branchId:number, idGroup:number, idMonitor:number){
        var monitor:Member = this.movement.getMember(idMonitor).clone();
        monitor.set_facilitador(true);
        monitor.set_rol(Rol.monitor);
        this.movement.getStructure().addMonitor(zoneName, branchId, idGroup,monitor);
    };

    public addMemberToGroup(zoneName:String, branchId:number, groupId:number, idMember:number):Boolean{
        let member = this.movement.getMembers().getMember(idMember).clone();

        if(member!=null){
            return this.movement.getStructure().addMember(member,zoneName,branchId,groupId);
        }else{
            return false
        }

        //let member = new Member(direction,rol,facilitador,id,name,email,telephone);
        //this.insertMember(member);    
        //this.movement.getStructure().addMember(member,zoneName,branchName,groupName);
    };
    public insertMember (member:Member){
        //this.movement.getMembers().addMember(member);
    };
    public verEstructura(){
        this.movement.getStructure().verEstructura();
    }

    public showEstruc(){
        return this.movement.getStructure().getEst();
    }

    public deleteMember(pIdData:number){
        this.movement.getMembers().deleteMiembro(pIdData);
        this.deleteMemberFromStructure(pIdData);
    };
    public deleteMemberFromStructure(pIdData:number){
        this.movement.getStructure().deleteMember(pIdData);
    };
    public deleteMemberFromGroup(zoneName:String, branchId:number, idGroup:number,pIdData:number){
        this.movement.getStructure().deleteMemberFromGroup(zoneName,branchId,idGroup,pIdData);
    };
    public upDateMember(id:number,name:String, celular:number,mail:String,direccion:String,esMonitor:boolean){
        this.movement.getMembers().updateMember(id,name,celular,mail,direccion,esMonitor)
    }
    public consultMember(pIdData:number){
        this.movement.getMembers().getMember(pIdData);
    };
    public printMembers(){
        this.movement.getMembers().printMembers();
    };
    public consultGroup(pIdData : number ,groupName : String){
        return this.movement.getStructure().consultGroup(pIdData,groupName);
    };
    public consultMemberParticipation(pIdData:number){
        return this.movement.getStructure().consultMemberParticipation(pIdData);
    };
    public consultMemberParticipationEliminar(pIdData:number){
        return this.movement.getStructure().consultMemberParticipationEliminar(pIdData);
    };
    public defineMonitor(coachId : number, zoneName:String, ramaId : number) : Boolean {

        //console.log("Id:",coachId," Zona:",zoneName,"Rama:",ramaId)
        var coach:Member = this.movement.getMembers().getMember(coachId).clone();
        //console.log("Clone Antes de cambiar:", coach);

        //this.movement.getMembers().getMember(coachId).set_rol(Rol.zoneChief);

        //console.log("Original:",this.movement.getMembers().getMember(coachId),"\n\n\n");
        //console.log("Clone despues:", coach);

        if(coach.get_facilitador()==true){
            return this.movement.getStructure().addCoach(coach,zoneName,ramaId);
        }else{
            return false;
        }
        /*let result = this.movement.getStructure().addCoach(coachId, ramaId);
        if(result){
            this.movement.getMembers().setFacilitador(Number(coachId));
            return true;
        }
        return false;*/
    };
    public swapGroup( preceZone:String,preceBranch:number,preceGroup:number,idMember:number,
        newZone:String,newBranch:number,newGroup:number):Boolean{
        var member:Member;
        var groupMember: Member;
        var currentMember = this.movement.getStructure().getMember(idMember);

        if(currentMember.get_rol() == 2){ //Group Chief
            member = this.movement.getStructure().deleteGroupChief(preceZone,preceBranch,preceGroup,idMember);
            groupMember =  this.movement.getStructure().deleteMemberFromGroup(preceZone,preceBranch,preceGroup,idMember);
            member.set_rol(4); //Updates state from GroupChief to GroupMember
        }else{
            member =  this.movement.getStructure().deleteMemberFromGroup(preceZone,preceBranch,preceGroup,idMember);
        }
        
        console.log("Eliminado:",member)
        if(member!=null){
            return this.movement.getStructure().addMember(member,newZone,newBranch,newGroup);
        }
        return false;

    };
    public changeToMonitor(zoneName:String, branchId:number, idGroup:number, idMonitor:number){
        this.movement.getStructure().changeToMonitor(zoneName,branchId,idGroup,idMonitor);
    }
    public consultZoneManagement(zoneName : String) {
        return this.movement.getStructure().consultZoneManagement(zoneName);
    }
    public consultBranchManagement(zoneName : String, branchId : Number){
        return this.movement.getStructure().consultBranchManagement(zoneName,branchId);
    }
    public consultGroupManagement(zoneName : String, branchId : Number, groupId : Number){
        return this.movement.getStructure().consultGroupManagement(zoneName,branchId,groupId); 
    }
    public assignZoneManagement( zoneName : String, idMember:number) :Boolean{
        var member:Member = this.movement.getMembers().getMember(idMember).clone();
        member.set_rol(Rol.zoneChief);
        return this.movement.getStructure().assignZoneManagement(zoneName,idMember,member);

        //this.movement.getStructure().assignZoneManagement(zoneName , firstPersonName, idFirstPerson , secondPersonName, idSecondPerson);
        //return true;
    };
    public getMemberParticipation(pIData: number) : String[]{
        let memberParticipation :String[] = this.movement.getStructure().getMemberParticipation(pIData);
        return memberParticipation;
    }
    public assignBranchManagement( zoneName : String, idBranch : number, idMember:number ) :Boolean{
        var member:Member = this.movement.getMembers().getMember(idMember).clone();
        member.set_rol(Rol.BranchChief);
        
        return this.movement.getStructure().assignBranchManagement(zoneName,idBranch,member);

        //this.movement.getStructure().assignBranchManagement(branchName, idBranch , firstPersonName, idFirstPerson , secondPersonName, idSecondPerson);
        //return true;
    };
    public assignGroupManagement( zoneName : String, idBranch : number, idGroup:number, idMember:number ) :Boolean{
        
        var member:Member = this.movement.getMembers().getMember(idMember).clone();
        member.set_rol(Rol.groupChief);
        
        return this.movement.getStructure().assignGroupManagement(zoneName, idBranch, idGroup, member);
        
        //this.movement.getStructure().assignGroupManagement(groupName, idGroup , firstPersonName, idFirstPerson , secondPersonName, idSecondPerson);
        //return true;
    };
    public getZoneManagement(zoneName:String): String[]{
        return this.movement.getStructure().getZoneManagement(zoneName);
    }
    public getBranchManagement(idBranch:number): String[]{
        return this.movement.getStructure().getBranchManagement(idBranch);
    }
    public getGroupManagement(idGroup:number): String[]{
        return this.movement.getStructure().getGroupManagement(idGroup);
    } 
    
    public getZones(): String[]{
        let zones: String[] = this.movement.getStructure().getZones();
        return zones;
    } 
    public getAllBranches(){
        let branches : String [] =  this.movement.getStructure().getAllBranches();
        return branches;
    }
    public getBranches(zoneName:String):String[]{
        let branches:String[] = this.movement.getStructure().getBranches(zoneName);
        return branches;
    }

    public getMonitors(zoneName:String, ramaId : number):String[]{
        let monitors:String[] = this.movement.getStructure().getMonitors(zoneName,ramaId);
        return monitors;
    }
    
    public getAllMonitors():String[]{
        let monitors:String[] = [];
        monitors = this.movement.getMembers().getMonitors();
        return monitors;
    }

    public getAllMembers():String[]{
        let members:String[] = [];
        members = this.movement.getMembers().getAllMembers();
        return members;
    }

    public getAllBranchesInNeed() : String[]{
        let branchesInNeed = this.movement.getStructure().getBranchesInNeed();
        console.log(branchesInNeed);
        return branchesInNeed;
    }

    
    public getGroups(zoneName : String, branchId : number): String[]{
        let groups: String[] = this.movement.getStructure().getGroups(zoneName, branchId);
        return groups;
    }
    
    public getAllGroups(): String[]{
        let groups: String[] = this.movement.getStructure().getAllGroups();
        return groups;
    } 

    public addMember(id:number,name:String,telephone:number,mail:String,direction:String,esMonitor:boolean){
        if(!this.movement.getMembers().idExist(id)){
            this.movement.getMembers().addMember(id, name,telephone,mail, direction,esMonitor);
            return true;
        }
        return false;
    }

    public assignChief( pNombreNivel : String , pIdData : number){

    };

    public removeZoneChief(zoneName : String, pIdData : number){
        this.movement.getStructure().removeZoneChief(zoneName, pIdData);
        this.movement.getStructure().verEstructura();
    };

    public removeBranchChief(zoneName : String, branchId : number ,pIdData : number){
        this.movement.getStructure().removeBranchChief(zoneName, branchId, pIdData);
        this.movement.getStructure().verEstructura();
    };

    public removeGroupChief(zoneName : String, branchId : number , idGroup : number ,pIdData : number){
        this.movement.getStructure().removeGroupChief(zoneName, branchId, idGroup, pIdData);
        this.movement.getStructure().verEstructura();
    };

    public addNewContribution (emissor:String, type:String, description:String) : Contribution {
         return this.movement.addContribution(emissor, type, description);
    };

    public addAssesorToCupule (idAsesor : number, nombreAsesor : String, celularAsesor : number, correoAsesor : String, direccionAsesor : String ) : Boolean {
  
        return this.movement.setAsessorToCupule(idAsesor, nombreAsesor, celularAsesor, correoAsesor, direccionAsesor);
    };

    public addZoneChiefToCupule(  idMember:number ) : Boolean{

        var member:Member = this.movement.getMembers().getMember(idMember).clone();
        return this.movement.addComitteeMember(member);

    }


    //Funciones de aportes

    public getContributions():Contribution[]{
        return this.movement.getContribution();
    }

    public generateReport(month : String , reportType : String) :String {
        return this.movement.generateContributionReport(month, reportType);
    }

    //Funciones de Noticias
    public sendNewNotifications(cuerpo : String , asunto : String , nivel : String ,ruta : String) :String {
        
        //createChannel
        var newChannel = this.movement.createNewChannel(cuerpo, asunto, nivel, ruta);

        //subscribePublishers //ZONA-RAMA1-GRUPO1
        var subscribers = this.movement.getStructure().getSubscribers(nivel, ruta); // [member, member, member]

        //notifySubscribers
        return this.movement.


    }




}

export default new Controller();