import MonopolyBoard from "../board";

declare class Field {
    constructor(details: any, board: MonopolyBoard);
    __board: any;
    get collection(): any;
    ownOfCollection(owner: any): any;
    get collectionOwner(): any;
    index?: number;
    type?: string;
}
export default Field;