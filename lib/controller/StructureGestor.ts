import IComponent from "model/IComponent";


export default class Gestor{
    
    private structure : [IComponent] ;

    public add( pDato : IComponent) : void {};
    public delete( pDato: IComponent): void {};
    public search( pDato : IComponent ):void {};
    public getStructure() : [IComponent] {return null};
    public setStructure ( pData: [IComponent]):void {};

}