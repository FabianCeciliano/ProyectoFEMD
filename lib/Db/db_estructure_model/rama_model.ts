import { IGroup, IGroupC } from "./grupo_model";

export interface IRama {
    name: String;
    id: String;
    monitores: String[];
    miembros: String[]; // * jefes de grupo //
    jefes: String[];    // ! los dos jefes de la rama //
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