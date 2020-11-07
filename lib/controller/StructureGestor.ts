import {IComponent} from '../model/IComponent';
import {Composite_Level} from '../model/Composite_Level';
import { StructureType } from '../model/StructureType';
import { Member } from '../model/Member';


export class Gestor{
    
    private structure : Composite_Level;

    constructor(){
        this.structure = new Composite_Level(1,"Coordinacion",1,StructureType.Coordination);
    }
    
    public addZone(pDato : IComponent){
        this.structure.addComposite(pDato);
    }

    public addBranch(pDato : IComponent, zoneName : String){
        for (let index = 0; index < this.structure.groupComposite.length; index++) {
            if(this.structure.groupComposite[index].name==zoneName){
                this.structure.groupComposite[index].addComposite(pDato);
            }
        }
    }

    public addGroup(pDato : IComponent, zoneName : String, branchName : String){
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if(this.structure.groupComposite[zindex].name==zoneName){
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name==branchName){
                        this.structure.groupComposite[zindex].getCompositeGroup()[bindex].addComposite(pDato);
                    }
                }
            }
        }
    }

    public addMember(pDato:Member,zoneName : String, branchName : String, groupName : String){
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if(this.structure.groupComposite[zindex].name==zoneName){
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name==branchName){
                        for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                            if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].name==groupName){
                                this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.push(pDato);
                            }
                        }
                    }
                }
            }
        }
    }

    public verEstructura(){
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            console.log("Zona: ",this.structure.groupComposite[zindex].name);
            for(let jindex = 0 ; jindex <this.structure.groupComposite[zindex].members.length;jindex++){
                console.log("\tJefe: ",this.structure.groupComposite[zindex].members[jindex].name);
                console.log("\t  Edad: : ",this.structure.groupComposite[zindex].members[jindex].name);
                console.log("\t  Id    : ",this.structure.groupComposite[zindex].members[jindex].id);
                console.log("\t  Email : ",this.structure.groupComposite[zindex].members[jindex].email);
            }
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                console.log("\t\tRama: ",this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name);
                for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    console.log("\t\t\tGrupo: ",this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].name);
                    console.log("\t\t\t\tMiembros:")
                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                        console.log("\t\t\t\t\t-> ",this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].name);
                    }
                }
            }
        }
    }

    public deleteMember(pIdData:number) : Member{
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                        if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id==pIdData){
                            let member = this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex];
                            this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.splice(mindex,1);
                            return member;
                        }
                    }
                }
            }
        }
        return null;
    }

    public consultGroup(pIdData : number, groupName : String){
        let ZoneName;
        let BranchName;
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) { 
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                        if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].name==groupName && this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id == pIdData){ 
                            //Devuelve los datos a vista "Consulta de Grupo"
                            BranchName = this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name;
                            ZoneName = this.structure.groupComposite[zindex].name;
                            console.log(ZoneName);
                            console.log(BranchName);
                            console.log(groupName);
                        }
                }
            }
        }
    }

    public swapGroup( precedenceGroup : number,  newGroup : number,  pIdData : number ){
        let member = this.deleteMember(pIdData);
        if(member!=null){
            let ZoneName;
            let BranchName;
            let groupName;
            for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) { 
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                        for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                            if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id ==newGroup){ 
                                BranchName = this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name;
                                ZoneName = this.structure.groupComposite[zindex].name;
                                groupName = this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].name;
                                this.addMember(member, ZoneName, BranchName, groupName);
                        }
                    }
                }
            }
        }else{
            console.log("No se pudo eliminar. Usuario no encontrado");
        }
    };

    public assignZoneManagement( zoneName : String, idZone : number, firstPersonName : String, idFirstPerson : number, secondPersonName : String, idSecondPerson : number ){
        //Validar que no hay jefes ya existentes
        //insertar en el nivel
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) { 
            if(this.structure.groupComposite[zindex].name == zoneName && this.structure.groupComposite[zindex].id == idZone){
                if(this.structure.groupComposite[zindex].members.length != 0){
                    console.log("Esta zona ya cuenta con jefatura.");
                }else{
                    console.log("Insertando jefatura");
                    let firstManager = this.getMember(idFirstPerson);
                    let secondManager = this.getMember(idSecondPerson);
                    this.structure.groupComposite[zindex].members.push(firstManager);
                    this.structure.groupComposite[zindex].members.push(secondManager);
                }
            }
        }
    };

    public getMember(idMember : number) : Member {
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                        if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id==idMember){
                            return Object.assign({}, this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex]);//Clones object
                        }
                    }
                }
            }
        }
    }

    public add( pDato : IComponent) : void {};
    public delete( pDato: IComponent): void {};
    public search( pDato : IComponent ):void {};
    public getStructure() : [IComponent] {return null};
    public setStructure ( pData: [IComponent]):void {};

}