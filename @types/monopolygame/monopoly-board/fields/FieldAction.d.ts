export default Action;
declare class Action extends Field {
    enter(team: any): {
        purchase: boolean;
        payment: any;
        building: boolean;
        tax: any;
        action: {
            type: string;
            action: any;
        };
    };
}

import Field from "./field";
