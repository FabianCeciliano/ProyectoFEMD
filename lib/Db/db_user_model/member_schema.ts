import * as mongoose from 'mongoose';
import { INotification, INotificationC } from '../db_notification_model/notification_model';

const userSchema = mongoose.Schema;

const schema = new userSchema({
    memberId: Number,
    name: String,
    email: String,
    telephone: Number,
    facilitator: String,
    is_deleted: {
        type: String,
        default: "false"
    },
    rol: String,
    direction: String,
    notifications: [INotificationC]
});

export default mongoose.model('users', schema);