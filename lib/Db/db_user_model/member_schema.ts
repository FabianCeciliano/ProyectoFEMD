import * as mongoose from 'mongoose';

const userSchema = mongoose.Schema;

const schema = new userSchema({
    memberId: Number,
    name: String,
    email: String,
    telephone: Number,
    facilitador: {
        type: String,
        default: "false"
    },
    is_deleted: {
        type: String,
        default: "false"
    },
    rol: String,
    direction: String
});

export default mongoose.model('users', schema);