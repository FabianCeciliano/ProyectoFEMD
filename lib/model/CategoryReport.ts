import { Contribution } from './Contribution';
import Strategy from './Strategy';
import { ContributionType } from './ContributionType';


export class CategoryReport implements Strategy{

    constructor(){
    }

    generateReport(contributionRepository: Contribution[], month : String, assesorName : String): String {
        var report = "\n\n\n Buenas Señor(a): "+assesorName+"\n\n";
        var petitoryCount = 0;
        var offeringCount = 0;
        var gratitudeCount = 0;

        contributionRepository.forEach(function (currentContribution) {
            if(currentContribution.getMonth().toLowerCase() == month){
                if(currentContribution.getType() == ContributionType.Agradecimiento){
                    gratitudeCount ++;
                }
                if(currentContribution.getType() == ContributionType.Ofrecimiento){
                    offeringCount ++;
                }
                if(currentContribution.getType() == ContributionType.Petitoria){
                    petitoryCount ++;
                }
            }
          });
        report += "En el mes de "+ month + " se recibieron: "+ gratitudeCount + " aportes de gratitud, "
         + offeringCount + " aportes de ofrecimiento y " + petitoryCount + " aportes de petitoria." ;
        return report;
    }

}


