import { IUserC, IUser } from "../db_user_model/member_model";

export interface IGroup {
    name: String;
    id: String;
    monitores: String[];
    jefes: String[];
    miembros: String[];
}

export const IGroupC = {
    name: String,
    id: String,
    monitores: [String],
    jefes: [String],
    miembros: [String]
}