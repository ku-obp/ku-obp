export default Street;
declare class Street extends Field {
    get monopoly(): boolean;
    get monopolyOwner(): any;
    get rent(): number;
    getRent(level: any): number;
    buildingAllowed(team: any): boolean;
    get buildingCost(): number;
    get interactions(): {};
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
    level: number;
    owner: any;
}
import Field  from "./field";
