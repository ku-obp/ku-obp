export default Company;
declare class Company extends Field {
    getRent(moveSteps: any): number;
    enter(team: any, movement: any): {
        purchase: boolean;
        payment: {
            creditor: any;
            debtor: any;
            amount: number;
        };
        building: boolean;
        tax: any;
    };
}
import Field  from "./field";
