import { Contribution } from './Contribution';
import Strategy from './Strategy';
import { ContributionType } from './ContributionType';


export class CategoryReport implements Strategy{

    private petitoryCount : number;
    private contributionCount : number;
    private offeringCount : number;
    private gratitudeCount : number;
    private reportDate : Date;
    private actualMonth : String;

    constructor(){
        
    }


    generateReport(contributionRepository: Contribution[], month : String, assesorName : String): String {
        var report = "\n\n\n Buenas Señor(a): "+assesorName+"\n\n";
        this.petitoryCount = 0;
        this.offeringCount = 0;
        this.gratitudeCount = 0;

        contributionRepository.forEach(function (currentContribution) {
            if(currentContribution.getMonth() == month){
                if(currentContribution.getType() == ContributionType.Agradecimiento){
                    this.gratitudeCount ++;
                }
                if(currentContribution.getType() == ContributionType.Ofrecimiento){
                    this.offeringCount ++;
                }
                if(currentContribution.getType() == ContributionType.Petitoria){
                    this.petitoryCount ++;
                }
            }
          });
        report += "En el mes de "+ month + "se recibieron: "+ this.gratitudeCount + " aportes de gratitud, "
         + this.offeringCount + " aportes de ofrecimiento y " + this.petitoryCount + " aportes de petitorios." ;
        return report;
    }

}


