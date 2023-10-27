import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { range } from "lodash";

export type MonopolyCommandPayload = {
    actor: number;
    serializedCommand: string;
}

export type MonopolyState = {
    color: string;
    boardIndex: number;
    position: number;
    balance: number;
    properties: MonopolyProprety[];
    isInJail: boolean;
    jailTurnsRemaining: number;
    getoutCards: number;
    history: string[];
    aiMode: boolean;
}

export type MonopolyAllState = {
    players: MonopolyState[]
}

export type MonopolyModeState = {
    WinningMode: string;
    AllowDeals: boolean;
    Name: string;
    startingCash: number;
    mortageAllowed: boolean;
    turnTimer?: number;
}

export type MonopolyProprety = {
    posistion: number;
    count: string | number;
    group: string;
    rent?: number;
    morgage?: boolean;
}

type ServerState = {
    roomId: string;
    hostEmail: string;
    guestsEmail: string[];
    turnOrder: string[];
    orderIndex: number;
    turnIndex: number;
    history: Array<string[]>;
    isStarted: boolean;
    isEnd: boolean;
};

export const COLORDIC = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#fae102",
]

export function initialize(players_count: number): MonopolyAllState {
    let result = range(0,players_count).map((value) => {
        return {
            color: COLORDIC[value],
            boardIndex: 0,
            position: 0,
            balance: 1000000,
            properties: [] as MonopolyProprety[],
            isInJail: false,
            jailTurnsRemaining: 0,
            getoutCards: 0,
            history: [] as string[],
            aiMode: true
        }
    })
    return { players: result }
    
}

export const monopolySlice = createSlice({
    name: "monopoly",
    initialState: initialize(4),
    reducers: {
        convertStatus: (
            state: MonopolyAllState,
            action: PayloadAction<{ status: ServerState }>
        ) => {
            const status = action.payload.status;
            state.players[status.orderIndex].boardIndex = status.turnIndex;
            state.players[status.orderIndex].history = status.history[status.orderIndex];
            state.players[status.orderIndex].color = COLORDIC[status.orderIndex];
            state.players[status.orderIndex].aiMode = false;
        },
        reset: () => {
            return initialize(4);
        },
        command: (state: MonopolyAllState, _action: PayloadAction<MonopolyCommandPayload>) => {
            // 주사위, 카드, 거래 등에 대한 로직 수행
        }
    },
});

export const {
    convertStatus,
    reset,
    command
} = monopolySlice.actions

export default monopolySlice.reducer


  
  