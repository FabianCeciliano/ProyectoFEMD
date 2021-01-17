import { CategoryReport } from './CategoryReport';
import { Contribution } from './Contribution';
import { Member } from './Member';
import { MonthlyReport } from './MonthlyReport';
import Strategy from './Strategy';
import { IContribution } from "../Db/db_contribution_model/contribution_model";


export class Cupula{

    private assesor : Member;
    private committee : Member[];
    private contributionRepository : Contribution[];
    private reportGenerator : Strategy; 
    private report : String;

    constructor(){
        this.contributionRepository = [];
        this.committee = [];
        this.reportGenerator = null;
    }

    public getContributions():Contribution[]{
        return this.contributionRepository;
    }

    public reloadContribution(contribution: IContribution) {
        var emissor = contribution.emissor;
        var date = contribution.date;
        var description = contribution.descripcion;
        var type = contribution.type;
        var otra = contribution.idMovimiento;
        var deleted = contribution.deleted;
        var newContribution = new Contribution(emissor,type,description);
        newContribution.setAll(emissor, type, description, new Date(date.toString()), deleted);
    }

    public addAssessor(assesor : Member): Boolean {
        if(assesor!=null){
            this.assesor = assesor;
            console.log(this.assesor);
            return true;
        }
        return false;
    };
    public addContribution(cont : Contribution) : Boolean {
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
    
    public setStrategy (strategy : Strategy) : void {
        this.reportGenerator = strategy;
    };
    public createReport(opt : String, actualMonth : String) : String {
        if(opt == "Mensual"){
            var reporteMensual = new MonthlyReport();
            this.setStrategy(reporteMensual);
            return this.reportGenerator.generateReport(this.contributionRepository, actualMonth, this.assesor.getName());
        }else if(opt == "Categoria"){
            var reporteCategoria = new CategoryReport();
            this.setStrategy(reporteCategoria);
            return this.reportGenerator.generateReport(this.contributionRepository, actualMonth, this.assesor.getName());
        };
    };

}


