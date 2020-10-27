import { StructureType } from "./StructureType";


export default class LeafComponent {
    private structureType : StructureType
    private quantity: number;

    public Componente_nivel_hoja( pNombre: String,pNumG : number, pTipoNodo:  StructureType) : void {}
    public getStructureType():StructureType {return null};
    public setStructureType( pDato : StructureType): void {};
    public getQuantity() : number {return null};
    public setQuantity( pDato : number) : void {};
}