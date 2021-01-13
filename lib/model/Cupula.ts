import { Contribution } from './Contribution';
import { Member } from './Member';
import Strategy from './Strategy';


export class Cupula{

    private asssesor : Member;
    private committee : Member[];
    private contributionRepository : Contribution[];
    private reportGenerator : Strategy; 
    private report : String;

    constructor(){
        
    }
    public addAssessor(assesor : Member): void {};
    public addContribution(cont : Contribution) : boolean {
        
        if(cont!=null){
            this.contributionRepository.push(cont);
            return true;
        }
        return false;
    }; 
    public addCommitteeMember(member : Member) : void {};
    public downloadRepository() : void {};
    public setStrategy (strategy : Strategy) : void {};
    public createReport(opt : number) : void {};

}


