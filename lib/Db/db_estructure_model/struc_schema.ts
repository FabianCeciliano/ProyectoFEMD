import { IUserC } from '../db_user_model/member_model';
import { IZoneC } from './zone_model';
import * as mongoose from 'mongoose';

const strucSchema = mongoose.Schema;

  ////                                                                                 ////
  ////                                                                                 ////
  //                               STRUCTURE SCHEMA                                      //
  ////                                                                                 ////
  ////                                                                                 ////

const schema = new strucSchema({
    _id : Number,
    name: String,
    coutry: String,
    cedulaJuridica: String,
    webDirection: String,
    phone: String,
    miembros: [String],
    zonas: [IZoneC],
    image: [String],
});

export default mongoose.model('structures', schema);