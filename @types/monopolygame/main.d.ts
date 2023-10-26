export default Monopoly;
declare class Monopoly {
    constructor(options?: {
        map: typeof MonopolyBoard.BOARD_DEFAULT_EN,
        fileds: typeof MonopolyBoard.FIELDS_DEFAULT,
        actions: typeof MonopolyBoard.ACTIONS_DEFAULT,
        pieces: number
    });
    board: MonopolyBoard;
    teams: Team[];
    currentAction: any;
    payment(payingTeam: Team, targetTeam: Team, amount: number): {};
    action(actionRecord: any, team: Team): any;
    nextActions(actions: any): void;
}
declare namespace Monopoly {
    type MonopolyBoard_1 = MonopolyBoard;
    export { MonopolyBoard_1 as MonopolyBoard };
}

import MonopolyBoard from "./monopoly-board/board";
import Team from "./Team";