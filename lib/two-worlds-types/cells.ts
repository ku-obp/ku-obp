export type CellType = "infrastructure" | "land" | "lotto" | "charity" | "chance" | "transportation" | "hospital" | "univ" | "jail" | "start";

export interface ICellData {
    get type(): CellType;
    get price(): number;
    get name(): string

    get isBuildable(): boolean
}

export class Infrastructure implements ICellData {
    get type(): CellType { return "infrastructure" }
    get price() { return 300000; }
    private readonly _name: string;
    private constructor(_name: string) {
        this._name = _name;
    }
    get isBuildable() { return false }
    get name() { return this._name }
}

export class Land implements ICellData {
    get type(): CellType { return "land" }
    get price() { return this._price; }
    private readonly _name: string;
    private readonly _price: number;
    private constructor(_name: string, _price: number) {
        this._name = _name;
        this._price = _price;
    }
    get isBuildable() { return true }
    get name() { return this._name }
}

export class Lotto implements ICellData {
    get type(): CellType { return "lotto" }
    get price() { return 200000; }
    private constructor() {
    }
    get isBuildable() { return false }
    get name() { return "로또" }
}

export class Charity implements ICellData {
    get type(): CellType { return "charity" }
    get price() { return 600000; }
    private constructor() {
    }
    get isBuildable() { return false }
    get name() { return "구제기금" }
}

export class Chance implements ICellData {
    get type(): CellType { return "chance" }
    get price() { return 0; }
    private constructor() {
    }
    get isBuildable() { return false }
    get name() { return "변화카드" }
}

export class Transportation implements ICellData {
    get type(): CellType { return "transportation" }
    get price() { return 0; }
    private constructor() {
    }
    get isBuildable() { return false }
    get name() { return "대중교통" }
}


