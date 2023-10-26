export default Start;
declare class Start extends Field {
    enter(team: any): {
        purchase: boolean;
        payment: any;
        building: boolean;
        tax: number;
    };
}
import Field from "./field"
