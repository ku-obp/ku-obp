export default MonopolyBoard;
declare class MonopolyBoard {
    constructor(options: {
        map: typeof MonopolyBoard.BOARD_DEFAULT_EN,
        fileds: typeof MonopolyBoard.FIELDS_DEFAULT,
        actions: typeof MonopolyBoard.ACTIONS_DEFAULT,
        pieces: number
    });
    map: Field[];
    pieces: {
        position: number,
        get field(): Field
    };
    actions: typeof MonopolyBoard.ACTIONS_DEFAULT;
    getGroup(id: number): Field[];
}
declare namespace MonopolyBoard {
    type BOARD_DETAIL_TYPE = {
        name: string,
        description: string
    } | {
        name: string,
        price: number,
        baseRent: number,
        group: number
    } | {
        name: string,
        kind: string
    } | {
        name: string
        price: number
    } | {
        name: string,
        kind: string,
        price: number,
        group: number,
    } | {
        name: string,
    } | {
        name: string,
        target: number
    } | {
        name: string,
        [key: string]: string | number
    }
    let BOARD_DEFAULT_EN: ({
        type: string,
        detail: BOARD_DETAIL_TYPE
    })[];
    let ACTIONS_DEFAULT: {
        generators: (((team: any) => {
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
        methods: {
            movement(team: any, field: any): any;
            tax(team: any, fields: any): any;
        };
    };
    type FieldGen = (detail: BOARD_DETAIL_TYPE, board: MonopolyBoard) => Field;
    let FIELDS_DEFAULT: { [key: string]: FieldGen } = {
        "Start": (detail: BOARD_DETAIL_TYPE, board: MonopolyBoard) => new Start(detail, board),
        "Street": (detail: BOARD_DETAIL_TYPE, board: MonopolyBoard) => new Street(detail, board),
        "Action": (detail: BOARD_DETAIL_TYPE, board: MonopolyBoard) => new Action(detail, board),
        "Tax": (detail: BOARD_DETAIL_TYPE, board: MonopolyBoard) => new Tax(detail, board),
        "Station": (detail: BOARD_DETAIL_TYPE, board: MonopolyBoard) => new Station(detail, board),
        "Jail": (detail: BOARD_DETAIL_TYPE, board: MonopolyBoard) => new Jail(detail, board),
        "Company": (detail: BOARD_DETAIL_TYPE, board: MonopolyBoard) => new Company(detail, board),
        "Empty": (detail: BOARD_DETAIL_TYPE, board: MonopolyBoard) => new Empty(detail, board),
        "Police": (detail: BOARD_DETAIL_TYPE, board: MonopolyBoard) => new Police(detail, board)
    }
}

import Start from "./fields/FieldStart"
import Street from "./fields/FieldStreet"
import Action from "./fields/FieldAction"
import Tax from "./fields/FieldTax"
import Station from "./fields/FieldStation"
import Jail from "./fields/FieldJail"
import Company from "./fields/FieldCompany"
import Empty from "./fields/FieldEmpty"
import Police from "./fields/FieldPolice"
import Field from "./fields/field";

