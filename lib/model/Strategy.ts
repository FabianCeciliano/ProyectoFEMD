import { Contribution } from "./Contribution";

export default interface Strategy {
    
    generateReport(contributionRepository : Contribution [], month : String, asssesorName : String): String
}