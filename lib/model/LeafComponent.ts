import { StructureType } from "./StructureType";
import {IComponent} from "./IComponent";
import { Member } from "./Member";


export class LeafComponent extends IComponent{
          
    private quantity: number;
    monitors : Member[];

    constructor(id: number, name : String,levelType :  StructureType){
        super(id, name, levelType);
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
    addIntegrants(pDato: Member): void {
        this.members.push(pDato);
    }
    deleteIntegrants(pDato: Member): void {
        throw new Error("Method not implemented.");
    }
    searchIntegrants(pDato: Member): void {
        throw new Error("Method not implemented.");
    }
    getIntegrants():Member[]{
        return this.members;
    }
    addMonitor(monitor: Member): void {
        this.monitors.push(monitor);
    }
    
}