import { createSlice, PayloadAction, compose } from "@reduxjs/toolkit";
import {range} from "lodash"

export type RoomDataType = {
  roomKey: string;
  hostEmail: string;
  maxGuests: number;
  guests: string[];
  isStarted: boolean;
  isEnded: boolean;
  waitingForAnswer: number;
}

export type PlayerIconType = 0 | 1 | 2 | 3

export type PlayerType = {
  email: string,
  icon: PlayerIconType,
  location: number,
  displayLocation: number,
  cash: number,
  cycles: number,
  university: string,
  tickets: {
    discountRent: number,
    bonus: boolean,
    doubleLotto: number,
  },
  remainingJailTurns: number,
}

export type PropertyType = {
  ownerEmail: string,
  count: number,
  cellId: number
}

export type GameStateType = {
  players: PlayerType[],
  properties: PropertyType[],
  nowInTurn: number,
  govIncome: number,
  charityIncome: number,
  sidecars: {
    limitRents: number
  }
}

export type AllStateType = {
  gameState: GameStateType,
  queues: QueuesType,
  latestChance: {
    displayCardName: string,
    cardDescription: string
  } | null,
  latestPayments: {
    type: string,
    cellId: number
    name: string,
    mandatory: PaymentTransaction | null,
    optional: PaymentTransaction | null
  } | null,
  frozen: boolean
}

const INITIAL_CASH = 6000000

const initialState: AllStateType = {
  gameState: {
    players: range(4).map((icon) => ({
      email: `${icon}`,
      icon: (icon as PlayerIconType),
      location: 0,
      displayLocation: 0,
      cash: INITIAL_CASH,
      cycles: 0,
      university: "notYet",
      tickets: {discountRent: 0, bonus: false, doubleLotto: 0},
      remainingJailTurns: 0
    })),
    properties: [],
    nowInTurn: 0,
    govIncome: 0,
    charityIncome: 0,
    sidecars: {
      limitRents: 0
    }
  },
  queues: {
    chances: {
      queue: [],
      processed: 0
    },
    payments: {
      queue: [],
      processed: 0
    }
  },
  latestChance: null,
  latestPayments: null,
  frozen: true
}

export type QueuesType = {
  chances: {
    queue: {
      displayCardName: string,
      cardDescription: string
    }[],
    processed: number
  },
  payments: {
    queue: {
      cellId: number,
      mandatory: PaymentTransactionJSON | null,
      optional: PaymentTransactionJSON | null
    }[],
    processed: number
  }
}

export type NotifyChanceCardAcquistionPayload = {
  queues: QueuesType,
  payload: {
    description: string,
    displayName: string
  }
}
export type NotifyPaymentsPayload = {
  queues: {
    chances: {
      queue: {
        displayCardName: string,
        cardDescription: string
      }[],
      processed: number
    },
    payments: {
      queue: {
        cellId: number,
        mandatory: PaymentTransactionJSON | null,
        optional: PaymentTransactionJSON | null
      }[],
      processed: number
    }
  },
  payload: {
    type: string,
    name: string,
    cellId: number,
    invoices: {
      mandatory: PaymentTransactionJSON | null,
      optional: PaymentTransactionJSON | null
    }
  }
} 

export const twoWorldsSlice = createSlice({
  name: "two-worlds",
  initialState,
  reducers: {
    updateGameState: (state, action: PayloadAction<GameStateType>) => {
      if(!state.frozen) { state.gameState = action.payload }
    },
    notifyChanceCardAcquistion: (state, action: PayloadAction<NotifyChanceCardAcquistionPayload>) => {
      if(!state.frozen) {
        state.latestChance = {
          displayCardName: action.payload.payload.description,
          cardDescription: action.payload.payload.description
        }
        state.queues = action.payload.queues
      }
    },
    notifyPayments: (state, action: PayloadAction<NotifyPaymentsPayload>) => {
      if(!state.frozen) {
        const {
          type, name, invoices, cellId
        } = action.payload.payload
        const [mandatory, optional] = ((_invoices) => [
          (_invoices.mandatory === null) ? null : PaymentTransaction.fromJSON(_invoices.mandatory),
          (_invoices.optional === null) ? null : PaymentTransaction.fromJSON(_invoices.optional)
        ])(invoices)
        state.latestPayments = {type,name, cellId,mandatory,optional}
        state.queues = action.payload.queues
      }
    },
    flushChances: (state, action: PayloadAction<QueuesType>) => {
      state.queues.payments = action.payload.payments
      state.queues.chances = {
        queue: [],
        processed: 0
      }
      state.latestChance = null
    },
    flushPayments: (state, action: PayloadAction<QueuesType>) => {
      state.queues.chances = action.payload.chances
      state.queues.payments = {
        queue: [],
        processed: 0
      }
      state.latestPayments = null
    },
    freeze: (state) => {
      state.frozen = true
    },
    refresh: (state, action: PayloadAction<{
      chances: {
        queue: string[];
        processed: number;
      };
      payments: {
        queue: {
          cellId: number;
          mandatory: PaymentTransactionJSON | null;
          optional: PaymentTransactionJSON | null;
        }[];
        processed: number;
      }
    }>) => {
      const converted: QueuesType = {
        payments: action.payload.payments,
        chances: {
          queue: action.payload.chances.queue.map((value) => {
            return {
              displayCardName: CHANCE_CARDS[value].displayName,
              cardDescription: CHANCE_CARDS[value].description
            }
          }),
          processed: action.payload.chances.processed
        }
      }
      state.queues = converted

      state.latestChance = (converted.chances.queue.length > 0) ? converted.chances.queue[converted.chances.queue.length - 1] : null

      state.latestPayments = (converted.payments.queue.length > 0) ? ((last) => {
        const cell = PREDEFINED_CELLS[last.cellId]
        const mandatory = (last.mandatory === null) ? null : PaymentTransaction.fromJSON(last.mandatory)
        const optional = (last.optional === null) ? null : PaymentTransaction.fromJSON(last.optional)
        return {
          name: cell.name,
          type: cell.type,
          cellId: cell.cellId,
          mandatory,
          optional
        }
      })(converted.payments.queue[converted.payments.queue.length - 1]) : null
      
      state.frozen = false
    }
  }
});

export const {
    updateGameState, notifyChanceCardAcquistion, notifyPayments, flushChances, flushPayments, freeze, refresh
} = twoWorldsSlice.actions;

export default twoWorldsSlice.reducer;

import * as TwoWorlds from "@/lib/two-worlds"

export class PaymentTransaction {
  private _player0: number
  public get player0(): number {
    return this._player0
  }
  private _player1: number
  public get player1(): number {
    return this._player1
  }
  private _player2: number
  public get player2(): number {
    return this._player2
  }
  private _player3: number
  public get player3(): number  {
    return this._player3
  }
  private _government: number
  public get government(): number {
    return this._government
  }
  private _charity: number
  public get charity(): number {
    return this._charity
  }
  public constructor({player0, player1, player2, player3, government, charity}: {
    player0?: number, player1?: number, player2?: number, player3?: number, government?: number, charity?: number
  }) {
    this._player0 = player0 ?? 0;
    this._player1 = player1 ?? 0;
    this._player2 = player2 ?? 0;
    this._player3 = player3 ?? 0;
    this._government = government ?? 0;
    this._charity = charity ?? 0;
  }
  public static toJSON(transaction: PaymentTransaction): PaymentTransactionJSON {
    const {
      player0, player1, player2, player3, government, charity
    }: {player0: number, player1: number, player2: number, player3: number, government: number, charity: number} = transaction
    return {
      player0,
      player1,
      player2,
      player3,
      government,
      charity
    }
  }

  public static fromJSON(transactionJSON: PaymentTransactionJSON): PaymentTransaction {
    return new PaymentTransaction(transactionJSON)
  }
  public merge(other: PaymentTransaction): PaymentTransaction {
    return new PaymentTransaction({
      player0: this.player0 + other.player0,
      player1: this.player1 + other.player1,
      player2: this.player2 + other.player2,
      player3: this.player3 + other.player3,
      government: this.government + other.government,
      charity: this.charity + other.charity
    })
  }

  public get revert() {
    return new PaymentTransaction({
      player0: -this.player0,
      player1: -this.player1,
      player2: -this.player2,
      player3: -this.player3,
      government: -this.government,
      charity: -this.charity
    })
  }

  public get flat() {
    return {
      playerTransactions: [
        this.player0,
        this.player1,
        this.player2,
        this.player3
      ],
      government: this.government,
      charity: this.charity,
    }
  }

  public static P2G(playerIcon: PlayerIconType, amount: number) {
    switch(playerIcon) {
      case 0:
        return new PaymentTransaction({
          player0: -amount,
          government: amount
        })
      case 1:
        return new PaymentTransaction({
          player1: -amount,
          government: amount
        })
      case 2:
        return new PaymentTransaction({
          player2: -amount,
          government: amount
        })
      case 3:
        return new PaymentTransaction({
          player3: -amount,
          government: amount
        })
    }
  }

  public static G2M(amount: number) {
    return new PaymentTransaction({
      government: -amount,
    })
  }

  public static P2C(playerIcon: PlayerIconType, amount: number) {
    switch(playerIcon) {
      case 0:
        return new PaymentTransaction({
          player0: -amount,
          charity: amount
        })
      case 1:
        return new PaymentTransaction({
          player1: -amount,
          charity: amount
        })
      case 2:
        return new PaymentTransaction({
          player2: -amount,
          charity: amount
        })
      case 3:
        return new PaymentTransaction({
          player3: -amount,
          charity: amount
        })
    }
  }

  public static unidirectional(playerIcon: PlayerIconType, amount: number) {
    switch(playerIcon) {
      case 0:
        return new PaymentTransaction({
          player0: amount
        })
      case 1:
        return new PaymentTransaction({
          player1: amount
        })
      case 2:
        return new PaymentTransaction({
          player2: amount
        })
      case 3:
        return new PaymentTransaction({
          player3: amount
        })
    }
  }

  public static P2P(from: PlayerIconType, to: PlayerIconType, amount: number): PaymentTransaction {
    const different_pair = TwoWorlds.DifferentNumberPair.checkDifferent<PlayerIconType>(from, to)
    return TwoWorlds.nullableMapper(different_pair,({a,b}) => {
      return PaymentTransaction.unidirectional(a, -amount).merge(PaymentTransaction.unidirectional(b, amount))
    },{
      mapNullIsGenerator: false, constant: new PaymentTransaction({})
    })
  }

  public pickByIcon(icon: PlayerIconType) {
    if(icon === 0) {
      return this.player0
    } else if(icon === 1) {
      return this.player1
    } else if(icon === 2) {
      return this.player2
    } else {
      return this.player3
    }
  }
}

export type PaymentTransactionJSON = {
  player0: number;
  player1: number;
  player2: number;
  player3: number;
  government: number;
  charity: number;
}

import { PaymentType, generateNormalPaymentInfo, generateP2DPaymentInfo, generateG2MPaymentInfo } from "@/lib/two-worlds.parts/utils";
import { CHANCE_CARDS } from "@/components/providers/two-worlds-socket-provider";
export type CellType = "infrastructure" | "industrial" | "land" | "lotto" | "charity" | "chance" | "transportation" | "hospital" | "park" | "concert" | "university" | "jail" | "start";

type CellDic = {
    [cell: string]: {
        cellId: number,
        name: string
    }
}

export const INFRASTRUCTURE_NAMES: CellDic={
    "water": {
        cellId: 7,
        name: "수자원"
    },
    "electricity": {
        cellId: 16,
        name: "전력"
    },
    "gas": {
        cellId: 21,
        name: "도시가스"
    }
}

export type BuildableFlagType = 0 | 1 | 3

export type TransactionType = {get?: number; pay?: number}

export interface ICellData {
    get type(): CellType;
    get name(): string;
    get isBuildable(): BuildableFlagType;
    get paymentInfos(): PaymentType[];
    get cellId(): number;
    readonly group_id?: number;
}

export class Infrastructure implements ICellData {
    public get type(): CellType { return "infrastructure" }
    private readonly kind: keyof (typeof INFRASTRUCTURE_NAMES);
    private constructor(kind: keyof (typeof INFRASTRUCTURE_NAMES)) {
        this.kind = kind;
    }
    public get isBuildable(): BuildableFlagType { return 0 }
    public get name() { return INFRASTRUCTURE_NAMES[this.kind].name }
    public get paymentInfos(): PaymentType[] {
        return [generateNormalPaymentInfo("P2G", 300000)]
    }
    public get cellId(): number {
      return INFRASTRUCTURE_NAMES[this.kind].cellId
    }
    public static readonly Infrastructures = (key: keyof typeof INFRASTRUCTURE_NAMES) => {
        return new Infrastructure(key)
    }
}

export class Land implements ICellData {
    get type(): CellType { return "land" }
    get paymentInfos(): PaymentType[] {
        return [
            generateNormalPaymentInfo("P2O",0,300000),
            generateNormalPaymentInfo("P2G",this._price)
        ]
    }
    private readonly _name: string;
    private readonly _price: number;
    public readonly group_id: number;
    private readonly _cell_id: number;
    public constructor(_cell_id: number, _name: string, _group_id: number) {
        this._cell_id = _cell_id
        this._name = _name;
        this._price = GROUP_PRICES[_group_id];
        this.group_id = _group_id;
    }
    public get isBuildable(): BuildableFlagType { return 3 }
    public get name() { return this._name }
    public get cellId(): number {
        return this._cell_id
    }
}

export class Lotto implements ICellData {
    public get type(): CellType { return "lotto" }
    public get paymentInfos(): PaymentType[] {
        return [generateNormalPaymentInfo("P2M", 0,200000)]
    }
    private readonly _cell_id: number;
    private constructor(_cell_id: number = 3) {
        this._cell_id = _cell_id
    }
    public get cellId(): number {
        return this._cell_id
    }
    public get isBuildable(): BuildableFlagType { return 0 }
    public get name() { return "로또" }
    public static readonly LottoCell = new Lotto()
}

export class Charity implements ICellData {
    public get type(): CellType { return "charity" }
    public get paymentInfos(): PaymentType[] {
        return [generateNormalPaymentInfo("P2C", 600000)]
    }
    private readonly _cell_id: number;
    private constructor(_cell_id: number = 52) {
        this._cell_id = _cell_id
    }
    public get cellId(): number {
        return this._cell_id
    }
    public get isBuildable(): BuildableFlagType { return 0 }
    public get name() { return "구제기금" }

    public static readonly CharityCell = new Charity()
}

export class Chance implements ICellData {
    public get type(): CellType { return "chance" }
    public get paymentInfos(): PaymentType[] {
        return []
    }
    private readonly _cell_id: number;
    private constructor(_cell_id: number) {
        this._cell_id = _cell_id
    }
    public get cellId(): number {
        return this._cell_id
    }
    public get isBuildable(): BuildableFlagType { return 0 }
    public get name() { return "변화카드" }
    public static readonly ChanceCells: {
        [cellId: number]: Chance
    } = {
        5: new Chance(5),
        14: new Chance(14),
        23: new Chance(23),
        31: new Chance(31),
        40: new Chance(40),
        50: new Chance(50)
    }
}

export class Transportation implements ICellData {
    public get type(): CellType { return "transportation" }
    public get paymentInfos(): PaymentType[] {
        return []
    }

    
    private readonly _cell_id: number;
    private constructor( _cell_id: number, dest: number) {
        this._cell_id = _cell_id
        this.dest = dest
    }
    public get cellId(): number {
        return this._cell_id
    }
    public get isBuildable(): BuildableFlagType { return 0 }
    public get name() { return "대중교통" }
    public readonly dest: number
    public static readonly Transportations: {
        [cellId: number]: Transportation
    } = {
        1: new Transportation(1,10),
        10: new Transportation(10,19),
        19: new Transportation(19,28),
        28: new Transportation(28,37),
        37: new Transportation(37,46),
        46: new Transportation(46,1),
    }
}

export class Hospital implements ICellData {
    public get type(): CellType { return "hospital" }
    public get paymentInfos(): PaymentType[] {
        return [
            generateG2MPaymentInfo(100000),
            generateNormalPaymentInfo("P2M",100000,0)
        ]
    }
    private readonly _cell_id: number;
    private constructor(_cell_id: number = 45) {
        this._cell_id = _cell_id
    }
    public get cellId(): number {
        return this._cell_id
    }
    public get isBuildable(): BuildableFlagType { return 0 }
    public get name() { return "병원" }

    public static readonly HospitalCell = new Hospital()    
}

export class Park implements ICellData {
    public get type(): CellType {
        return "park"
    }
    public get paymentInfos(): PaymentType[] {
        return []
    }
    private readonly _cell_id: number;
    private constructor(_cell_id: number = 36) {
        this._cell_id = _cell_id
    }
    public get cellId(): number {
        return this._cell_id
    }
    public get isBuildable(): BuildableFlagType { return 0 }
    public get name() {return "공원"}

    public static readonly ParkCell = new Park()
}

export class University implements ICellData {
    public get type(): CellType { return "university" }
    public get paymentInfos(): PaymentType[] {
        return []
    }
    private readonly _cell_id: number;
    private constructor(_cell_id: number = 3) {
        this._cell_id = _cell_id
    }
    public get cellId(): number {
        return this._cell_id
    }
    public get isBuildable(): BuildableFlagType { return 0 }
    public get name() { return "대학" }

    public static readonly UniversityCell = new University()
}

export class Jail implements ICellData {
    public get type(): CellType { return "jail" }
    public get paymentInfos(): PaymentType[] {
        return [{
            kind: "P2M",
            cost: {
                default: 0,
                additional: 400000
            }
        }]
    }
    private readonly _cell_id: number;
    private constructor(_cell_id: number = 9) {
        this._cell_id = _cell_id
    }
    public get cellId(): number {
        return this._cell_id
    }
    public get isBuildable(): BuildableFlagType { return 0 }
    public get name() { return "감옥" }
    
    public static readonly JailCell = new Jail()
}

export class Start implements ICellData {
    public get type(): CellType { return "start" }
    public get paymentInfos(): PaymentType[] {
        return [
        ]
    }
    private constructor() {
    }
    public get cellId(): number {
      return 0
    }
    public get isBuildable(): BuildableFlagType { return 0 }
    public get name() { return "출발" }

    public static readonly StartCell = new Start()
}

export class Concert implements ICellData {
    public get type(): CellType {
        return "concert"
    }
    public get name(): string {
        return "콘서트"
    }
    public get isBuildable(): BuildableFlagType { return 0 }
    public get paymentInfos(): PaymentType[] {
        return [
            generateNormalPaymentInfo("P2M", 200000),
            generateNormalPaymentInfo("P2G", 200000),
            generateNormalPaymentInfo("P2C", 200000)
        ]
    }
    private readonly _cell_id: number;
    private constructor(_cell_id: number = 27) {
        this._cell_id = _cell_id
    }
    public get cellId(): number {
        return this._cell_id
    }
    public static readonly ConcertCell = new Concert()
}

const INDUSTRIAL_NAMES: CellDic = {
    "digital-complex": {
        cellId: 44,
        name: "지식정보단지"
    },
    "agriculture": {
        cellId: 35,
        name: "농공단지"
    },
    "factory": {
        cellId: 35,
        name: "산업단지"
    }
}

export class Industrial implements ICellData {
    public get type(): CellType { return "industrial" }
    private readonly kind: keyof (typeof INDUSTRIAL_NAMES);
    private constructor(kind: keyof (typeof INDUSTRIAL_NAMES)) {
        this.kind = kind;
    }
    public get isBuildable(): BuildableFlagType { return 1 }
    public get name() { return INDUSTRIAL_NAMES[this.kind].name }
    public get paymentInfos(): PaymentType[] {
        return [
            generateP2DPaymentInfo(75000),
            generateNormalPaymentInfo("P2G", 600000)
        ]
    }
    public static readonly Industrials = (key: keyof typeof INDUSTRIAL_NAMES) => {
        return new Industrial(key)
    }
    public get cellId(): number {
        return INDUSTRIAL_NAMES[this.kind].cellId
    }
}

const parsePredefined: {
  generators: {
      land: (cellId: number, name: string, groupId: number) => Land,
      transportation: (cellId: number) => Transportation,
      chance: (cellId: number) => Chance
  },
  fixed: {
      [type: string]: ICellData
  }
} = {
  generators: {
      land: (cellId: number, name: string, groupId: number) => new Land(cellId, name, groupId),
      transportation: (cellId: number) => Transportation.Transportations[cellId],
      chance: (cellId) => Chance.ChanceCells[cellId]
  },
  fixed: {
      "water": Infrastructure.Infrastructures("water"),
      "electricity": Infrastructure.Infrastructures("electricity"),
      "lotto": Lotto.LottoCell,
      "charity": Charity.CharityCell,
      "hospital": Hospital.HospitalCell,
      "university": University.UniversityCell,
      "jail": Jail.JailCell,
      "start": Start.StartCell,
      "gas": Infrastructure.Infrastructures("gas"),
      "concert": Concert.ConcertCell,
      "agriculture": Industrial.Industrials("agriculture"),
      "park": Park.ParkCell,
      "factory": Industrial.Industrials("factory"),
      "digital-complex": Industrial.Industrials("digital-complex")
  }
}


import PredefinedCells from "./predefined_cells.json"




function gatherPredefined(): ICellData[] {
  const sorted = Array.from(PredefinedCells).sort((a,b) => a.cellId - b.cellId)
  const output: Array<ICellData> = []
  for(const c of sorted) {
      if (c.type === "chance") {
          const {cellId} = c as {
              cellId: number,
              type: string
          }
          output.push(parsePredefined.generators.chance(cellId))
      } else if (c.type === "land") {
          const {cellId, name, groupId} = c as {
              cellId: number,
              type: string,
              name: string,
              groupId: number
          };
          output.push(parsePredefined.generators.land(cellId, name, groupId))
      } else if (c.type === "transportation") {
          const {
              cellId
          } = c as {
              cellId: number,
              type: string
          };
          output.push(parsePredefined.generators.transportation(cellId))
      } else {
          output.push(parsePredefined.fixed[c.type])
      }
  }
  return Array.from(output).sort((a,b) => a.cellId - b.cellId);
}

const GROUP_PRICES = [1, 2, 3, 4, 5, 6, 7, 8].reduce((accumulator: {[key: number]: number}, target: number) => ({...accumulator, [target]: (target * 100000)}),{} as {[key: number]: number})

import { Socket } from "socket.io-client";

export const PREDEFINED_CELLS: ICellData[] = gatherPredefined();

type ChanceCard = {
    description: string,
    displayName: string,
    action: (socket: Socket, state: GameStateType, playerEmail: string) => Promise<GameStateType | null>
}

export const CHANCE_IDS = [
    "free-lotto",
    "scholarship",
    "discountRent",
    "bonus",
    "doubleLotto",
    "limitRents",
]

export type ChanceActionCallback = ({chances, payments}: {chances: {queue: string[], processed: number}, payments: {queue: {
    cellId: number,
    mandatory: PaymentTransactionJSON | null,
    optional: PaymentTransactionJSON | null
  }[], processed: number}}, {description, displayName}: {description: string, displayName: string}) => void

export type PaymentsActionCallback = ({chances, payments}: {chances: {queue: string[], processed: number}, payments: {queue: {
    cellId: number,
    mandatory: PaymentTransactionJSON | null,
    optional: PaymentTransactionJSON | null
  }[], processed: number}}, {mandatory, optional}:{
    mandatory: PaymentTransactionJSON | null,
    optional: PaymentTransactionJSON | null
}) => void
