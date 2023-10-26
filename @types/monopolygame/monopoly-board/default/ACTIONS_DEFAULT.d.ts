export let generators: (((team: any) => {
    type: string;
    wait: boolean;
    message: string;
    fields: {
        steps: any;
    };
}) | ((team: any) => {
    type: string;
    wait: boolean;
    message: string;
    fields: {
        tax: number;
    };
}))[];
export namespace methods {
    function movement(team: any, field: any): any;
    function tax(team: any, fields: any): any;
}
