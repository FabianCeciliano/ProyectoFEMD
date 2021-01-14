
import { IContribution, IContributionC } from './contribution_model';
import contributions from './contribution_schema';

export default class ContributionService {

    public createContribution(someparams: IContribution, callback: any) {
        //console.log("Aqui2");
        const _session = new contributions(someparams);
        //console.log("Aqui3");
        _session.save(callback);
        //console.log("Aqui4");
    }
/*
    public filterUser(query: any, callback: any) {
        return users.findOne(query, callback);
    }

    public updateUser(user_params: IUser, callback: any) {
        const query = { id: user_params.memberId };
        users.findOneAndUpdate(query, user_params, callback);
    }
    
    public deleteContribution( id: String, callback: any ) {
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

        var x = await users.find({name:userName,telephone:password},async function(err,result:IUser[]){//NO "name" sino "userName" y No "telephone" sino "password"
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
*/    
}
