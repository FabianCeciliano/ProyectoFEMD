import { IGroup, IGroupC } from "./grupo_model";

  ////                                                                                 ////
  ////                                                                                 ////
  //                               Interface IRama                                       //
  ////                                                                                 ////
  ////                                                                                 ////
export interface IRama {
    name: String;
    id: String;
    monitores: String[];
    miembros: String[]; 
    jefes: String[];  
    grupos: IGroup[];
}

export const IRamaC = {
    name: String,
    id: String,
    monitores: [String],
    miembros: [String],
    jefes: [String],
    grupos: [IGroupC]
}