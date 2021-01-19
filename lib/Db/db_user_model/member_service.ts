import { IUser, IUserC } from './member_model';
import users from './member_schema';
import { INotification } from "../db_notification_model/notification_model";

export default class UserService {

    public createUser(user_params: IUser, callback: any) {
        //console.log("Aqui2");
        const _session = new users(user_params);
        //console.log("Aqui3");
        _session.save(callback);
        //console.log("Aqui4");
    }

    public filterUser(query: any, callback: any) {
        return users.findOne(query, callback);
    }

    public async setPassword_ (memberId: String, pPassword: String, callback: any) {
        const query = { memberId: memberId };
        const res = await users.updateOne(query, { password: pPassword });
        console.log("Cuantity of results matched : " + res.n); // Number of documents matched
        //console.log("Cuantity of results modified : " res.nModified); // Number of documents modified 
        if(res.n != 0){
            return true;
        }else{
            return false;
        }
    }

    public updateUser(user_params: IUser, callback: any) {
        const query = { memberId: user_params.memberId };
        users.updateOne(query, user_params, callback);
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

    public delayy(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    public async validateUser(userName:String,password:String):Promise<String>{
        var userId:String = null;

        var x = await users.find({memberId:userName,password:password},async function(err,result:IUser[]){//NO "name" sino "userName" y No "telephone" sino "password"
            if(err){
                console.log("Error al validar usuario");
            }else{
                if(result.length>0){
                    userId=result[0].memberId;
                }
            }
        })

        return userId;
    }

    // ! ======================================================================================================//
    // ! Notifications ========================================================================================//
    // ! ======================================================================================================//

    ///                                                                                       ///
    //                              InsertNotification                                         //
    ///                                                                                       ///
    public insertNotification(notification: INotification, suscriber: String, callback: any){
        console.log(">> BD --> Metiendo la notificacion en la persona");
        users.update({ memberId:suscriber }, {$push: { notifications: notification  } },callback);
    }

    ///                                                                                       ///
    //                               Update Notification State                                 //
    ///                                                                                       ///
    public updateNotification(notificationDate: String, suscriberId: String, callback: any){
        console.log(" >> BD --> Actualizando estado de la notificacion");
        users.updateOne(
            { memberId:suscriberId},
            { $set: { "notifications.$[elem].estado": true } },
            { arrayFilters: [{ "elem.currentDate": { $eq: notificationDate } }], multi: true },callback
          );
    }

    // ! Notifications ======================================================================================================//

}
