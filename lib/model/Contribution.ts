import { Member } from './Member';
import {ContributionType} from './ContributionType';

export class Contribution{

    private type : ContributionType;
    private description : String;
    private date: Date;
    private deleted : Boolean;
    private emissor : String;
    
    constructor(emissor:String, type:String, description:String){
        this.emissor = emissor;
        this.type = ContributionType.Agradecimiento;
        this.description = description;
        this.setType(type);
        this.deleted = false;
        this.date = new Date(); //"11/10/2016, 11:49:36 AM"
        console.log(this.date);

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
        var  months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        return months[this.date.getMonth()]; // "July" (or current month) 
    }

    public getType() : ContributionType {
        return this.type;
    }

    public getDate() : String {
        return this.date.toString();
    }

    public getDescription() :  String {
        return this.description;
    }

    public getEmissor() : String {
        return this.emissor;
    }

}


