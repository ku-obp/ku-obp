import Field from "./field";
export default Station;
declare class Station extends Field {
    get rent(): number;
    getRent(ownAmount: any): number;
    enter(team: any): {
        purchase: boolean;
        payment: {
            creditor: any;
            debtor: any;
            amount: number;
        };
        building: boolean;
        tax: any;
    };
    owner: any;
}
