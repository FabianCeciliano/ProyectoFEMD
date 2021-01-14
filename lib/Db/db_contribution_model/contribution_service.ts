
import { IContribution, IContributionC } from './contribution_model';
import contributions from './contribution_schema';

export default class ContributionService {

    public uploadContribution(someparams: IContribution, callback: any) {
        const _session = new contributions(someparams);
        _session.save(callback);
    }

    public updateContribution(contrib_params: IContribution, callback: any) {
        const query = { date: contrib_params.date };
        contributions.findOneAndUpdate(query, contrib_params, callback);
    }

    public findContribution(query: any, callback: any) {
        return contributions.findOne(query, callback);
    }

    public async getAllContributions():Promise<IContribution[]>{
        var contributionsFromDB:IContribution[]=null;
        await contributions.find( { deleted: false } ,function(err, result:IContribution[]) {
            if (err) {
                console.log(err); 
            } else {
                contributionsFromDB=result;
            }
        })
        return contributionsFromDB;
    }

/*    

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
