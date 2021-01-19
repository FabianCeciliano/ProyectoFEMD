import * as mongoose from 'mongoose';
import { INotification, INotificationC } from '../db_notification_model/notification_model';

const userSchema = mongoose.Schema;

const schema = new userSchema({
    memberId: String,
    name: String,
    email: String,
    telephone: String,
    facilitator: String,
    is_deleted: {
        type: String,
        default: "false"
    },
    rol: String,
    direction: String,
    password: String,
    notifications: [INotificationC]
});

export default mongoose.model('users', schema);