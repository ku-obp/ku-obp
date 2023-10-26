export default Police;
declare class Police extends Field {
    enter(team: any): {
        purchase: boolean;
        payment: any;
        building: boolean;
        tax: any;
        movement: any;
    };
}
import Field  from "./field";
