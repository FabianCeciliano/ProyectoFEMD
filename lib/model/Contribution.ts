import { Member } from './Member';
import {ContributionType} from './ContributionType';

export class Contribution{

    private type : ContributionType;
    private description : String;
    private date: String;
    private emissor : String;
    
    constructor(emissor:String, type:String, description:String){
        this.emissor = emissor;
        this.type = ContributionType.Agradecimiento;
        this.description = description;
        this.date = new Date().toLocaleDateString();
        this.setType(type);
    }

    private setType(type:String) : void{
        if(type=="Petitoria"){
            this.type = ContributionType.Petitoria;
        }else if(type=="Agradecimiento"){
            this.type = ContributionType.Agradecimiento;
        }
        else if(type=="Ofrecimiento"){
            this.type = ContributionType.Ofrecimiento;
        }
    }
    

}


