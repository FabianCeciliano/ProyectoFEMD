import IComponent from "model/IComponent"
import Member from "model/Member"

export class UserController {

    
    public createNewZone () : void {};
    public createNewBranch () : void {};
    public createNewGroup () : void {};
    public insertMember () : void {};
    public deleteMember() : void {};
    public consultMember () : void {};
    public consultGroup() : void {};
    public defineMonitor( pNombreNivel : String , pIdData : String) : any {};
    public authorizeMember() : void {};
    public assignChiefs() : void {};
    public assignChief( pNombreNivel : String , pIdData : number) : void {};
    public moveMember(  pNuevoNivel : String,  pExNivel : String,  pIdData : number ) : void {};
    public configBranch( pNombreRama : String):IComponent {return null};
    public configZone( pNombreZona : String):IComponent {return null};
    public configGroup( pNombreGrupo : String):IComponent {return null};
    //public displayMember( pIdData : String ): Member {return null};
    public displayMember( pIdData : number ): String{return null};
    public showMemberLevel( pIdData : String ):void {};
    public requestMemberMovement( pNuevoNivel : String, pExNivel : String, pIdData : String ):void {};
    public newAffiliation(  pDatol : String, pIdData : number ):void {};
    public getMemberBranch() : [Member] {return null};
    public getMemberZone() : [Member] {return null};
    public getMemberGroup() : [Member] {return null};

}
