import { IUser } from './member_model';
import users from './member_schema';

export default class UserService {

    public createUser(user_params: IUser, callback: any) {
        //console.log("Aqui2");
        const _session = new users(user_params);
        //console.log("Aqui3");
        _session.save(callback);
        //console.log("Aqui4");
    }

    public filterUser(query: any, callback: any) {
        users.findOne(query, callback);
    }

    public updateUser(user_params: IUser, callback: any) {
        const query = { id: user_params.memberId };
        users.findOneAndUpdate(query, user_params, callback);
    }
    
    public deleteUser( id: String, callback: any ) {
        const query = { memberId: id };
        users.deleteOne(query, callback);
    }

    public async getAllMembersImp():Promise<IUser[]>{
        var usersFromDB:IUser[]=null;
        await users.find(function(err, result:IUser[]) {
            if (err) {
                console.log(err); 
            } else {
            //console.log(result);
            usersFromDB=result;
            }
        })
        return usersFromDB;
    }
}