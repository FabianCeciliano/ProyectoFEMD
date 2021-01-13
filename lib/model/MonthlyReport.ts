import { Contribution } from './Contribution';
import Strategy from './Strategy';


export class MonthlyReport implements Strategy{

    private report : String;
    private actualMonth : String;
    private totalCount : number;

    constructor(){
        
    }


    generateReport(contributionRepository: Contribution[]): String {
        throw new Error('Method not implemented.');
    }

}


