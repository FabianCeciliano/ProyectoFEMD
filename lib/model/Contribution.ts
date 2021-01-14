import { Member } from './Member';
import {ContributionType} from './ContributionType';

export class Contribution{

    private type : ContributionType;
    private description : String;
    private date: Date;
    private emissor : String;
    
    constructor(emissor:String, type:String, description:String){
        this.emissor = emissor;
        this.type = ContributionType.Agradecimiento;
        this.description = description;
        this.date = new Date();
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

    public getMonth() : String{

        var monthInt = new Intl.DateTimeFormat("en-US", { month: "long" }).format;
        var monthName = monthInt(this.date.getMonth()); 
        console.log(monthName);
        return monthName;
    }

    public getType() : ContributionType{
        return this.type;
    }
    

}


