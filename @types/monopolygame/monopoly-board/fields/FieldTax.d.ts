export default Tax;
declare class Tax extends Field {
    enter(team: any): {
        purchase: any;
        payment: any;
        building: any;
        tax: any;
    };
}
import Field  from "./field";
