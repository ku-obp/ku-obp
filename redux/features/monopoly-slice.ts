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
    order: number;
    prev: number;
    next: number;
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

export const initialState = {
    color: "",
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

export const monopolySlice = createSlice({
    name: "monopoly",
    initialState: initialState,
    reducers: {
        convertStatus: (
            state,
            action: PayloadAction<{ status: ServerState }>
        ) => {
            const status = action.payload.status;
            state.boardIndex = status.turnIndex;
            state.history = status.history[status.orderIndex];
            state.color = COLORDIC[status.orderIndex];
            state.aiMode = false;
            state.order = status.orderIndex;
            state.prev = (status.orderIndex - 1) % 4;
            state.next = (status.orderIndex + 1) % 4;
        },
        reset: () => {
            return initialState;
        },
        command: (state: MonopolyState, _action: PayloadAction<MonopolyCommandPayload>) => {
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


  
  