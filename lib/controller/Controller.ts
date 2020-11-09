import {IComponent} from '../model/IComponent';
import {Member} from '../model/Member';
import {Movement} from './Movement';
import { Composite_Level } from '../model/Composite_Level';
import { StructureType } from '../model/StructureType';
import { Direction } from '../model/Direction'
import {Rol} from '../model/Rol'
import { LeafComponent } from '../model/LeafComponent';

export class Controller {

    private movement:Movement;

    public createMovement(cedJuridica:number, name:String, website :String, country : String,phoneNumber: number):boolean{
        if(this.movement==null){
            this.movement = new Movement(cedJuridica, name, website , country ,phoneNumber);
            return true;
        }
        return false;
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

    public addMonitor(zoneName:String, branchId:number, idGroup:number, idMonitor:number){
        var monitor:Member = this.movement.getMember(idMonitor);
        this.movement.getStructure().addMonitor(zoneName, branchId, idGroup,monitor);
    }

    public addMemberToGroup(zoneName:String, branchId:number, groupId:number, idMember:number):Boolean{
        let member = this.movement.getMembers().getMember(idMember);

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
    public deleteMember(pIdData:number){
        this.movement.getMembers().deleteMiembro(pIdData);
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
    public defineMonitor(coachId : number, zoneName:String, ramaId : number) : Boolean {

        console.log("Id:",coachId," Zona:",zoneName,"Rama:",ramaId)
        var coach:Member = this.movement.getMembers().getMember(coachId);

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
        var member:Member = this.movement.getStructure().deleteMemberFromGroup(preceZone,preceBranch,preceGroup,idMember);
        if(member!=null){
            this.movement.getStructure().addMember(member,newZone,newBranch,newGroup);
            return true;
        }
        return false;
        //this.movement.getStructure().swapGroup(precedenceGroup, newGroup, pIdData);
    };
    public consultZoneManagement(zoneName : String) : Number{
        let management = this.movement.getStructure().consultZoneManagement(zoneName);
        return management;
    }
    public consultBranchManagement(branchId : Number) : Number{
        let management = this.movement.getStructure().consultBranchManagement(branchId);
        return management;
    }
    public consultGroupManagement(groupId : Number) : Number{
        let management = this.movement.getStructure().consultGroupManagement(groupId);
        return management; 
    }
    public assignZoneManagement( zoneName : String, idZone : number, firstPersonName : String, idFirstPerson : number, secondPersonName : String, idSecondPerson : number ) :Boolean{
        this.movement.getStructure().assignZoneManagement(zoneName, idZone , firstPersonName, idFirstPerson , secondPersonName, idSecondPerson);
        return true;
    };
    public assignBranchManagement( branchName : String, idBranch : number, firstPersonName : String, idFirstPerson : number, secondPersonName : String, idSecondPerson : number ) :Boolean{
        this.movement.getStructure().assignBranchManagement(branchName, idBranch , firstPersonName, idFirstPerson , secondPersonName, idSecondPerson);
        return true;
    };
    public assignGroupManagement( groupName : String, idGroup : number, firstPersonName : String, idFirstPerson : number, secondPersonName : String, idSecondPerson : number ) :Boolean{
        this.movement.getStructure().assignGroupManagement(groupName, idGroup , firstPersonName, idFirstPerson , secondPersonName, idSecondPerson);
        return true;
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

    public getBranches(zoneName:String):String[]{
        let branches:String[] = this.movement.getStructure().getBranches(zoneName);
        return branches;
    }

    public getMonitors(zoneName:String, ramaId : number):String[]{
        let monitors:String[] = this.movement.getStructure().getMonitors(zoneName,ramaId);
        return monitors;
    }

    public addMember(id:number,name:String,telephone:number,mail:String,direction:String){
        this.movement.getMembers().addMember(id, name,telephone,mail, direction);
    }

    public assignChief( pNombreNivel : String , pIdData : number){

    };
    public authorizeMember(){
        
    };
    public configBranch( pNombreRama : String):IComponent {
        return null
    };
    public configZone( pNombreZona : String):IComponent {
        return null
    };
    public configGroup( pNombreGrupo : String):IComponent {
        return null
    };
    public displayMember( pIdData : number ): String{
        return null
    };
    public showMemberLevel( pIdData : String ){

    };
    public requestMemberMovement( pNuevoNivel : String, pExNivel : String, pIdData : String ){

    };
    public newAffiliation(  pDatol : String, pIdData : number ){

    };

}

export default new Controller();