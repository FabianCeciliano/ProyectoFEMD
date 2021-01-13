import { Contribution } from './Contribution';
import Strategy from './Strategy';


export class CategoryReport implements Strategy{

    private report : String;
    private petitoryCount : number;
    private contributionCount : number;
    private gratitudeCount : number;
    private reportDate : Date;
    private actualMonth : String;

    constructor(){
        
    }


    generateReport(contributionRepository: Contribution[]): String {
        throw new Error('Method not implemented.');
    }

}


