import { IUser, IUserC } from "../db_user_model/member_model";
import { IRama, IRamaC } from "./rama_model";

export interface IZone {
    name: String;
    id: String;
    jefes: IUser[];
    ramas: IRama[];
}

export const IZoneC = {
    name: String,
    id: String,
    jefes: [IUserC],
    ramas: [IRamaC]
}