export type CellType = "infrastructure" | "land" | "lotto" | "charity" | "chance" | "transportation" | "hospital" | "univ" | "jail" | "start";

export interface ICellData {
    get type(): CellType;
    get cost(): number;
    get name(): string

    get isBuildable(): boolean
}

export class Infrastructure implements ICellData {
    get type(): CellType { return "infrastructure" }
    get cost() { return 300000; }
    private readonly _name: string;
    private constructor(_name: string) {
        this._name = _name;
    }
    get isBuildable() { return false }
    get name() { return this._name }
}

export class Land implements ICellData {
    get type(): CellType { return "land" }
    get cost() { return this._cost; }
    private readonly _name: string;
    private readonly _cost: number;
    private constructor(_name: string, _cost: number) {
        this._name = _name;
        this._cost = _cost;
    }
    get isBuildable() { return true }
    get name() { return this._name }
}

export class Lotto implements ICellData {
    get type(): CellType { return "lotto" }
    get cost() { return 200000; }
    private constructor() {
    }
    get isBuildable() { return false }
    get name() { return "로또" }
}

export class Charity implements ICellData {
    get type(): CellType { return "charity" }
    get cost() { return 600000; }
    private constructor() {
    }
    get isBuildable() { return false }
    get name() { return "구제기금" }
}

export class Chance implements ICellData {
    get type(): CellType { return "chance" }
    get cost() { return 0; }
    private constructor() {
    }
    get isBuildable() { return false }
    get name() { return "변화카드" }
}

export class Transportation implements ICellData {
    get type(): CellType { return "transportation" }
    get cost() { return 0; }
    private constructor() {
    }
    get isBuildable() { return false }
    get name() { return "대중교통" }
}


