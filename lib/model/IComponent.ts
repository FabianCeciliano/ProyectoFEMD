import Member from './Member';
import {StructureType} from './StructureType';

export default abstract class IComponent{
    
    name : String;
    id: number;
    numG : number;
    levelType :  StructureType;
    members : [Member];


    abstract IComponente_Nivel( pNombre: String,pNumG : number, pTipoNodo:  StructureType )
    abstract addComposite( pDato : IComponent) : void
    abstract deleteCompuesto( pDato: IComponent) : void
    abstract searchComposite( pDato : IComponent ) : IComponent
    abstract getLevelType() : StructureType
    abstract setLevelType(pDato : StructureType)
    abstract getName() : String
    abstract setName(pDato : String): void
    abstract addIntegrants( pDato : Member) : void
    abstract deleteIntegrants( pDato: Member) : void
    abstract searchIntegrants( pDato : Member) : void
    abstract getIntegrants(pNombre : String) : [Member]

}


