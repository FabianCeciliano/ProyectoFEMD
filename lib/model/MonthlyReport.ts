import { Contribution } from './Contribution';
import Strategy from './Strategy';


export class MonthlyReport implements Strategy{

    private report : String;
    private actualMonth : String;
    private totalCount : number;

    constructor(){
        
    }


    generateReport(contributionRepository: Contribution[], actualMonth : String, assesorName : String): String {

        this.report = "\n\n\n Buenas Señor(a): "+assesorName+"\n\n";
        this.totalCount = 0;
        
        contributionRepository.forEach(function (currentContribution) {
            if(currentContribution.getMonth() == actualMonth){
                this.totalCount ++;
            }
          });
        this.report += "En el mes de " + this.actualMonth + " se recibieron " + this.totalCount +" aportes." 
        return this.report;
    }

}


