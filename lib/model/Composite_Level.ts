import {StructureType} from './StructureType';
import IComponent from './IComponent';

export default class Composite_Level{
    
    private groupComposite : [IComponent];


    public composite_level(pNombre: String,pNumG : number, pTipoNodo:  StructureType) : void {};
    public getCompositeGroup () : [IComponent] { return null};
    public setCompositeGroup ( pDato: [IComponent]) : void {};

}


