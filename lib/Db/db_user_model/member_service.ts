import { IUser } from './member_model';
import users from './member_schema';

export default class UserService {

    public createUser(user_params: IUser) {
        const _session = new users(user_params);
        _session.save();
    }

    public filterUser(query: any, callback: any) {
        users.findOne(query, callback);
    }

    public updateUser(user_params: IUser) {
        const query = { id: user_params.memberId };
        users.findOneAndUpdate(query, user_params);
    }
    
    public deleteUser( id: String ) {
        const query = { memberId: id };
        users.deleteOne(query);
    }

}