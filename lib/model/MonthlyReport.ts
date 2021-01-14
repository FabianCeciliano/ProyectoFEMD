import { Contribution } from './Contribution';
import Strategy from './Strategy';


export class MonthlyReport implements Strategy{

    constructor(){
    }

    generateReport(contributionRepository: Contribution[], actualMonth : String, assesorName : String): String {

        var report = "\n\n\n Buenas Señor(a): "+assesorName+"\n\n";
        var totalCount = 0;
        contributionRepository.forEach(function (currentContribution) {
            if(currentContribution.getMonth().toLowerCase() == actualMonth){
                totalCount +=1;
            }
          });
        report += "En el mes de " + actualMonth + " se recibieron " + totalCount +" aportes." 
        return report;
    }

}


