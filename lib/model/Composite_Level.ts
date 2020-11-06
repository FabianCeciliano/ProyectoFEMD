import {StructureType} from './StructureType';
import {IComponent} from './IComponent';
import { Member } from './Member';

export class Composite_Level extends IComponent{
    
    groupComposite : IComponent[];

    constructor(id: number, name : String,numG : number,levelType :  StructureType){
        super(id, name, numG, levelType);
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
        throw new Error("Method not implemented.");
    }
    setLevelType(pDato: StructureType) {
        throw new Error("Method not implemented.");
    }
    getName(): String {
        throw new Error("Method not implemented.");
    }
    setName(pDato: String): void {
        throw new Error("Method not implemented.");
    }
    addIntegrants(pDato:Member): void {
        throw new Error("Method not implemented.");
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

}


