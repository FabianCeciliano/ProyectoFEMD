import { StructureType } from "./StructureType";
import {IComponent} from "./IComponent";
import { Member } from "./Member";


export class LeafComponent extends IComponent{
        
    private quantity: number;

    constructor(id: number, name : String,numG : number,levelType :  StructureType){
        super(id, name, numG, levelType);
        this.quantity=0;
    }

    public Componente_nivel_hoja( pNombre: String,pNumG : number, pTipoNodo:  StructureType) : void {}
    public getStructureType():StructureType {return null};
    public setStructureType( pDato : StructureType): void {};
    public getQuantity() : number {return null};
    public setQuantity( pDato : number) : void {};

    getCompositeGroup(): IComponent[] {
        throw new Error("Method not implemented.");
    }   

    IComponente_Nivel(pNombre: String, pNumG: number, pTipoNodo: StructureType) {
        throw new Error("Method not implemented.");
    }
    addComposite(pDato: IComponent): void {
        throw new Error("Method not implemented.");
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
    addIntegrants(pDato: Member): void {
        throw new Error("Method not implemented.");
    }
    deleteIntegrants(pDato: Member): void {
        throw new Error("Method not implemented.");
    }
    searchIntegrants(pDato: Member): void {
        throw new Error("Method not implemented.");
    }
    getIntegrants():Member[]{
        throw new Error("Method not implemented.");
    }
    
}