import * as mongoose from 'mongoose';

const userSchema = mongoose.Schema;

const schema = new userSchema({
    cedula: Number,
    name: String,
    email: String,
    telephone: Number,
    facilitador: {
        type: Boolean,
        default: false
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    rol: String,
    direction: {
        type: {
            details: String,
            canton: String,
            district: String,
            province: String
        }

    }
});

export default mongoose.model('users', schema);