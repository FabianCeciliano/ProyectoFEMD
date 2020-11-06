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
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                console.log("\tRama: ",this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name);
                for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    console.log("\t\tGrupo: ",this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].name);
                    console.log("\t\t\tMiembros:")
                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                        console.log("\t\t\t\t-> ",this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].name);
                    }
                }
            }
        }
    }

    public deleteMember(pIdData:number){
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                        if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id==pIdData){
                            this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.splice(mindex,1);
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