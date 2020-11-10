import { IUser } from "../db_user_model/member_model";
import { IZone } from "./zone_model";

export interface IStructure {
    _id : Number 
    name: String;
    coutry: String;
    cedulaJuridica: String;
    webDirection: String;
    phone: String;
    miembros: String[];
    zonas: IZone[];
}