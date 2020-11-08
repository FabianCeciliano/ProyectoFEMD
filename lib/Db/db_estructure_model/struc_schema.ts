import { IUserC } from '../db_user_model/member_model';
import { IZoneC } from './zone_model';
import * as mongoose from 'mongoose';

const strucSchema = mongoose.Schema;

const schema = new strucSchema({
    name: String,
    coutry: String,
    cedulaJuridica: String,
    webDirection: String,
    phone: Number,
    jefes: [String],
    zonas: [IZoneC],
});

export default mongoose.model('structure', schema);