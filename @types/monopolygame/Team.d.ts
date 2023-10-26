import Monopoly from "./main";

export default Team;
declare class Team {
    constructor(game: Monopoly, index: number, wallet?: number);
    game: any;
    index: number;
    wallet: number;
    move(steps?: number): {
        success: boolean;
        steps: number;
        team: Team;
        target: any;
        next: any;
    };
    jail: boolean;
    moveTo(target: Field): {
        success: boolean;
        steps: number;
        team: Team;
        target: any;
        next: any;
    };
    buy(field: Field, rules?: boolean): void;
    transaction(targetTeam: Team, amount: number): void;
    payTax(amount: number): void;
    earnSalary(): void;
    get fields(): any;
    get collections(): void;
    get piece(): any;
    get name(): string;
}
