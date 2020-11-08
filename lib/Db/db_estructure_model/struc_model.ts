import { IUser } from "../db_user_model/member_model";
import { IZone } from "./zone_model";

export interface IStructure {
    name: String;
    coutry: String;
    cedulaJuridica: String;
    webDirection: String;
    phone: Number;
    jefes: String[];
    zonas: IZone[];
}