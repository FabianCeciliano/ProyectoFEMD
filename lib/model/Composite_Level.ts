import {StructureType} from './StructureType';
import {IComponent} from './IComponent';
import { Member } from './Member';

export class Composite_Level extends IComponent{
       
    groupComposite : IComponent[];

    constructor(id: number, name : String,levelType :  StructureType){
        super(id, name, levelType);
        this.groupComposite=[];
    }

    public composite_level(pNombre: String,pNumG : number, pTipoNodo:  StructureType) : void {};
    
    public setCompositeGroup ( pDato: [IComponent]) : void {};

    getCompositeGroup () : IComponent[] { 
        return this.groupComposite;
    };
    IComponente_Nivel(pNombre: String, pNumG: number, pTipoNodo: StructureType) {
        throw new Error("Method not implemented.");
    }
    addComposite(pDato: IComponent): void {
        this.groupComposite.push(pDato);
    }
    deleteCompuesto(pDato: IComponent): void {
        throw new Error("Method not implemented.");
    }
    searchComposite(pDato: IComponent): IComponent {
        throw new Error("Method not implemented.");
    }
    getLevelType(): StructureType {
        return this.levelType;
    }
    setLevelType(pDato: StructureType) {
        this.levelType=pDato;
    }
    getName(): String {
        return this.name;
    }
    setName(pDato: String): void {
        this.name=pDato;
    }
    addIntegrants(pDato:Member): void {
        this.members.push(pDato);
    }
    deleteIntegrants(pDato:Member): void {
        throw new Error("Method not implemented.");
    }
    searchIntegrants(pDato:Member): void {
        throw new Error("Method not implemented.");
    }
    getIntegrants(): Member[] {
        return this.members;
    }
    addMonitor(monitor: Member): void {
    }

}


