declare const _exports: ({
    type: string;
    detail: {
        name: string;
        description: string;
    };
} | {
    type: string;
    detail: {
        name: string;
        price: number;
        baseRent: number;
        group: number;
    };
} | {
    type: string;
    detail: {
        name: string;
        kind: string;
    };
} | {
    type: string;
    detail: {
        name: string;
        price: number;
    };
} | {
    type: string;
    detail: {
        name: string;
        kind: string;
        price: number;
        group: number;
    };
} | {
    type: string;
    detail: {
        name: string;
    };
} | {
    type: string;
    detail: {
        name: string;
        target: number;
    };
})[];
export default _exports;
