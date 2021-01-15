import { INotificationC, INotification } from '../db_notification_model/notification_model';
export interface IUser {
    memberId: String;
    name: String;
    email: String;
    telephone: String;
    facilitator: String;
    rol: String;
    direction: String;
    password: String;
    notifications: INotification[];
}

export const IUserC = {
    memberId: String,
    name: String,
    email: String,
    telephone: String,
    facilitator: String,
    rol: String,
    direction: String,
    password: String,
    notifications: [INotificationC]
}