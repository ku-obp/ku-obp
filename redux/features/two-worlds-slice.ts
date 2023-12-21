import { createSlice, PayloadAction, compose, current } from "@reduxjs/toolkit";
import {range} from "lodash"

import copy from 'fast-copy'

export type PlayerIconType = number

export type TicketType = {
    feeExemption: number,
    taxExemption: number,
    bonus: number,
    doubleLotto: number,
    lawyer: number,
    freeHospital: number
}

export type PlayerType = {
  icon: number,
  location: number,
  displayLocation: number,
  cash: number,
  cycles: number,
  university: string,
  tickets: TicketType,
  remainingJailTurns: number
}

export type PropertyType = {
  ownerIcon: number,
  count: number
}

export type GameStateType = {
  playerStates: PlayerType[],
  properties: Map<number, PropertyType>,
  nowInTurn: number,
  govIncome: number,
  charityIncome: number,
  sidecars: {
    catastrophe: number,
    pandemic: number
  }
}

const INITIAL_CASH = 6000000

export type RoomState = {
  playerEmails: string[],
  isEnded: boolean
}

export type TurnState = {
  doublesCount: number,
  diceCache: number,
  quirkOfFateDiceCache: number,
  prompt: string,
  chanceCardDisplay: string
}

export type AllStateType = {
  roomState: RoomState,
  turnState: TurnState,
  gameState: GameStateType,
}



export const initialState: AllStateType = {
  roomState: {
    playerEmails: [],
    isEnded: false
  },
  turnState: {
    doublesCount: 0,
    diceCache: 0,
    quirkOfFateDiceCache: 0,
    prompt: "none",
    chanceCardDisplay: ""
  },
  gameState: {
    playerStates: [],
    properties: new Map<number, PropertyType>(),
    nowInTurn: 0,
   govIncome: 0,
    charityIncome: 0,
    sidecars: {
      catastrophe: 0,
      pandemic: 0
    }
  }
}


export type UpdateGameStatePayload = {
    playerStates: Array<PlayerType>, properties: Map<number, PropertyType>,
    nowInTurn: number, govIncome: number, charityIncome: number, remainingCatastropheTurns: number, remainingPandemicTurns: number, qofDiceCache: number
}

export type RefreshGameStatePayload = {
    playerEmails: string[],
    isEnded: boolean,
    gs: UpdateGameStatePayload,
    ts: TurnState
}

function _refreshGameState(payload: RefreshGameStatePayload): AllStateType {
    return {
        roomState: {
            playerEmails: copy(payload.playerEmails),
            isEnded: copy(payload.isEnded)
        },
        gameState: {
            playerStates: copy(payload.gs.playerStates),
            properties: copy(payload.gs.properties),
            nowInTurn: copy(payload.gs.nowInTurn),
            govIncome: copy(payload.gs.govIncome),
            charityIncome: copy(payload.gs.charityIncome),
            sidecars: {
                catastrophe: copy(payload.gs.remainingCatastropheTurns),
                pandemic: copy(payload.gs.remainingPandemicTurns)
            }
        },
        turnState: {
            doublesCount: copy(payload.ts.doublesCount),
            diceCache: copy(payload.ts.diceCache),
            quirkOfFateDiceCache: copy(payload.ts.quirkOfFateDiceCache),
            prompt: copy(payload.ts.prompt),
            chanceCardDisplay: copy(payload.ts.chanceCardDisplay)
        }
    } as AllStateType
}

function _updateGameState(payload: UpdateGameStatePayload): GameStateType {
    return {
        playerStates: copy(payload.playerStates),
        properties: copy(payload.properties),
        nowInTurn: copy(payload.nowInTurn),
        govIncome: copy(payload.govIncome),
        charityIncome: copy(payload.charityIncome),
        sidecars: {
            catastrophe: copy(payload.remainingCatastropheTurns),
            pandemic: copy(payload.remainingPandemicTurns)
        }
    } as GameStateType

}

export const twoWorldsSlice = createSlice({
  name: "two-worlds",
  initialState,
  reducers: {
    refreshGameState: (state, action: PayloadAction<RefreshGameStatePayload>) => {
        const payload = action.payload
        state = _refreshGameState(payload)
        console.log(state)
    },
    updateGameState: (state, action: PayloadAction<UpdateGameStatePayload>) => {
        const copied: AllStateType = {
            ...copy(state),
            turnState: {
                ...copy(state.turnState),
                quirkOfFateDiceCache: action.payload.qofDiceCache
            },
            gameState: _updateGameState(action.payload)
        }
        state = copied
        console.log(state)
    },
    updateChanceCardDisplay: (state, action: PayloadAction<string>) => {
        state.turnState.chanceCardDisplay = copy(action.payload)
    },
    showQuirkOfFateStatus: (state, action: PayloadAction<{dice1: number, dice2: number}>) => {
      const {dice1, dice2} = action.payload
      if(dice1 < 1 || dice1 > 6 || dice2 < 1 || dice2 > 6) {
        state.turnState.quirkOfFateDiceCache = 0
      } else {
        state.turnState.quirkOfFateDiceCache = (dice1 - 1) * 6 + dice2
      }
    },
    eraseQuirkOfFateStatus: (state) => {
        state.turnState.quirkOfFateDiceCache = 0
    },
    publishChanceCard: (state, action: PayloadAction<string>) => {
        state.turnState.chanceCardDisplay = copy(action.payload)
    },
    notifyRoomStatus: (state, action: PayloadAction<RoomState>) => {
        for (const n of range(0,action.payload.playerEmails.length)) {
            if(state.roomState.playerEmails.length <= n) {
                state.roomState.playerEmails.push(copy(action.payload.playerEmails[n]))
            } else {
                state.roomState.playerEmails[n] = copy(action.payload.playerEmails[n])
            }
        }
        state.roomState.isEnded = copy(action.payload.isEnded)
    },
    showDices: (state, action: PayloadAction<number>) => {
        if((action.payload < 1) || (action.payload > 36)) {
            state.turnState.diceCache = 0
        } else {
            state.turnState.diceCache = copy(action.payload)
        }
    },
    flushDices: (state) => {
        state.turnState.diceCache = 0
    },
    updatePrompt: (state, action: PayloadAction<string>) => {
        state.turnState.prompt = copy(action.payload)
    },
    updateDoublesCount: (state, action: PayloadAction<number>) => {
        state.turnState.doublesCount = copy(action.payload)
    }
  }
});

export const {

    updateGameState, refreshGameState, updateChanceCardDisplay, showQuirkOfFateStatus, eraseQuirkOfFateStatus, publishChanceCard, notifyRoomStatus,
    showDices, flushDices, updatePrompt, updateDoublesCount
} = twoWorldsSlice.actions;

export default twoWorldsSlice.reducer;

import * as TwoWorlds from "@/lib/two-worlds"

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
import { ChanceCardDisplay } from './../../components/two-worlds/two-worlds-chance-card-display';




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

export const PREDEFINED_CELLS: ICellData[] = gatherPredefined();
