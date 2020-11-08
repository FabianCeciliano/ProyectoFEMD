import { IGroup, IGroupC } from "./grupo_model";

export interface IRama {
    name: String;
    id: String;
    jefes: String[];
    grupos: IGroup[];
}

export const IRamaC = {
    name: String,
    id: String,
    jefes: [String],
    grupos: [IGroupC]
}