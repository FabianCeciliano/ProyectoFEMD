import { IUser, IUserC } from "../db_user_model/member_model";
import { IRama, IRamaC } from "./rama_model";

export interface IZone {
    name: String;
    id: String;
    miembros: String[];
    jefes: String[];
    ramas: IRama[];
}

export const IZoneC = {
    name: String,
    id: String,
    miembros: [String],
    jefes: [String],
    ramas: [IRamaC]
}