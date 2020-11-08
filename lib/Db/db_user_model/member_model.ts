import { Rol } from "../../model/Rol";

export interface IUser {
    cedula: number;
    name: String;
    email: String;
    telephone: number;
    facilitador: boolean;
    is_deleted: boolean;
    rol: String;
    direction: {
        details: String;
        canton: String;
        district: String;
        province: String;
    }
}

export const IUserC = {
    cedula: Number,
    name: String,
    email: String,
    telephone: Number,
    facilitador: Boolean,
    is_deleted: Boolean,
    rol: String,
    direction: {
        details: String,
        canton: String,
        district: String,
        province: String,
    }
}