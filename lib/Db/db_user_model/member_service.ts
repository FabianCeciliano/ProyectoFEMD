import { IUser } from './member_model';
import users from './member_schema';

export default class UserService {

    public createUser(user_params: IUser, callback: any) {
        const _session = new users(user_params);
        _session.save(callback);
    }

    public filterUser(query: any, callback: any) {
        users.findOne(query, callback);
    }

    public updateUser(user_params: IUser, callback: any) {
        const query = { _id: user_params.cedula };
        users.findOneAndUpdate(query, user_params, callback);
    }
    
    public deleteUser(_id: Number, callback: any) {
        const query = { _id: _id };
        users.deleteOne(query, callback);
    }

}