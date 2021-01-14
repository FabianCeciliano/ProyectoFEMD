import { CategoryReport } from './CategoryReport';
import { Contribution } from './Contribution';
import { Member } from './Member';
import { MonthlyReport } from './MonthlyReport';
import Strategy from './Strategy';


export class Cupula{

    private assesor : Member;
    private committee : Member[];
    private contributionRepository : Contribution[];
    private reportGenerator : Strategy; 
    private report : String;

    constructor(){
        this.contributionRepository = [];
        this.committee = [];

    }
    public addAssessor(assesor : Member): Boolean {
        if(assesor!=null){
            this.assesor = assesor;
            console.log(this.assesor);
            return true;
        }
        return false;
    };
    public addContribution(cont : Contribution) : boolean {
        if(cont!=null){
            this.contributionRepository.push(cont);
            console.log(this.contributionRepository);
            return true;
        }
        console.log(this.contributionRepository);
        return false;
    }; 
    public addCommitteeMember(member : Member) : Boolean {
        if(member!=null){
            this.committee.push(member);
            console.log("IMPRIMIENDO COMITEE")
            console.log(this.committee);
            return true;
        }
        console.log(this.committee);
        return false;
    };
    public downloadRepository() : void {};
    public setStrategy (strategy : Strategy) : void {};
    public createReport(opt : String, actualMonth : String) : Boolean {
        if(opt == "Mensual"){
            var reporteMensual = new MonthlyReport();
            this.setStrategy(reporteMensual);
            this.reportGenerator.generateReport(this.contributionRepository, actualMonth, this.assesor.getName());
            return true;
            
        }else if(opt == "Categoria"){
            var reporteCategoria = new CategoryReport();
            this.setStrategy(reporteCategoria);
            this.reportGenerator.generateReport(this.contributionRepository, actualMonth, this.assesor.getName());
            return true;
        };
        return false;
    };

}


