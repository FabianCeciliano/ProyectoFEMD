import * as mongoose from 'mongoose';

const contributionSchema = mongoose.Schema;

const schema = new contributionSchema({
    idMovimiento: String,
    idMember: String,
    emissor: String,
    type : String,
    date : String,
    descripcion : String,
    deleted : Boolean
});

export default mongoose.model('contributions', schema);
