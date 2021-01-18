
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

}
