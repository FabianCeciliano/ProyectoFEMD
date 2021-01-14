import * as mongoose from 'mongoose';

const contributionSchema = mongoose.Schema;

const schema = new contributionSchema({
    emissor: String,
    type : String,
    date : String,
    descripcion : String
});

export default mongoose.model('contributions', schema);
