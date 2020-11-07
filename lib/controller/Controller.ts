import {IComponent} from '../model/IComponent';
import {Member} from '../model/Member';
import {Movement} from './Movement';
import { Composite_Level } from '../model/Composite_Level';
import { StructureType } from '../model/StructureType';
import {Direction} from '../model/Direction'
import {Rol} from '../model/Rol'
import { LeafComponent } from '../model/LeafComponent';

export class Controller {

    private movement:Movement;

    public createMovement(cedJuridica:number, name:String, website :String, country : String,phoneNumber: number){
        this.movement = new Movement(cedJuridica, name, website , country ,phoneNumber)
    }
    public createNewZone (id:number, name:String, numG:number) : void {
        this.movement.getStructure().addZone(new Composite_Level(id,name,numG,StructureType.Zone))
    };
    public createNewBranch (zoneName:String, id:number, name:String, numG:number, ) : void {
        this.movement.getStructure().addBranch(new Composite_Level(id,name,numG,StructureType.Branch),zoneName);
    };
    public createNewGroup (zoneName:String, branchName:String, id:number, name:String, numG:number) : void {
        this.movement.getStructure().addGroup(new LeafComponent(id,name,numG,StructureType.Group),zoneName,branchName);
    };
    public addMemberToGroup(zoneName:String, branchName:String, groupName:String, 
        direction : Direction,rol : Rol,facilitador : boolean,id:number,name:String,email:String,telephone:number){
        let member = new Member(direction,rol,facilitador,id,name,email,telephone);
        this.insertMember(member);
        this.movement.getStructure().addMember(member,zoneName,branchName,groupName);
    };
    public insertMember (member:Member){
        this.movement.getMembers().addMember(member);
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
    public consultMember(pIdData:number){
        this.movement.getMembers().getMember(pIdData);
    };
    public consultGroup(pIdData : number ,groupName : String){
        this.movement.getStructure().consultGroup(pIdData,groupName);
    };
    public defineMonitor(pIdData : number) : any {
        this.movement.getMembers().setFacilitador(pIdData);
    };
    public swapGroup(  precedenceGroup : number,  newGroup : number,  pIdData : number ){
        this.movement.getStructure().swapGroup(precedenceGroup, newGroup, pIdData);
    };
    public assignZoneManagement( zoneName : String, idZone : number, firstPersonName : String, idFirstPerson : number, secondPersonName : String, idSecondPerson : number ){
        this.movement.getStructure().assignZoneManagement(zoneName, idZone , firstPersonName, idFirstPerson , secondPersonName, idSecondPerson);
    };
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
    //public displayMember( pIdData : String ): Member {return null};
    public displayMember( pIdData : number ): String{
        return null
    };
    public showMemberLevel( pIdData : String ){

    };
    public requestMemberMovement( pNuevoNivel : String, pExNivel : String, pIdData : String ){

    };
    public newAffiliation(  pDatol : String, pIdData : number ){

    };
    public getMemberBranch() : [Member] {
        return null
    };
    public getMemberZone() : [Member] {
        return null
    };
    public getMemberGroup() : [Member] {
        return null
    };

}

export default new Controller();