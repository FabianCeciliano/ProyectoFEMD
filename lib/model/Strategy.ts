import { Contribution } from "./Contribution";

export default interface Strategy {
    
    generateReport(contributionRepository : Contribution []): String
}