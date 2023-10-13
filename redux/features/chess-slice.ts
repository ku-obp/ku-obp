// Typescript => PayLoadAction
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startFen } from "@/lib/utils";

type LastMovePayload = {
  from: string;
  to: string;
};

type SelectPayload = {
  from: string;
  possibleMoves: string[];
};

type LastMove = {
  from: string;
  to: string;
};

type ChessState = {
  boardIndex: number;
  history: string[];
  lastMove: LastMove[];
  playerColor: "w" | "b";
  opponentColor: "w" | "b";
  aiMode: boolean;
  turnColor: "w" | "b";
  from: string;
  to: string[];
};

const initialState = {
  boardIndex: 0,
  history: [startFen],
  lastMove: [{ from: "none", to: "none" }],
  playerColor: "w",
  opponentColor: "b",
  aiMode: true,
  turnColor: "w",
  from: "",
  to: [] as string[],
} as ChessState;

export const chessSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    move: (state, action: PayloadAction<string>) => {
      state.boardIndex = state.boardIndex + 1;
      state.history = [
        ...state.history.slice(0, state.boardIndex),
        action.payload,
      ];
      state.turnColor = state.turnColor === "w" ? "b" : "w";
      state.from = "";
      state.to = [];
    },
    select: (state, action: PayloadAction<SelectPayload>) => {
      state.from = action.payload.from;
      state.to = action.payload.possibleMoves;
    },
    deselect: (state) => {
      state.from = "";
      state.to = [];
    },
    gotoPrev: (state) => {
      state.boardIndex = state.boardIndex - 1;
      state.turnColor = state.turnColor === "w" ? "b" : "w";
    },
    gotoNext: (state) => {
      state.boardIndex = state.boardIndex + 1;
      state.turnColor = state.turnColor === "w" ? "b" : "w";
    },
    lastMove: (state, action: PayloadAction<LastMovePayload>) => {
      state.lastMove = [
        ...state.lastMove.slice(0, state.boardIndex),
        action.payload,
      ];
    },
    changeColor: (state) => {
      if (state.boardIndex === 0) {
        state.playerColor = state.playerColor === "w" ? "b" : "w";
        state.opponentColor = state.opponentColor === "w" ? "b" : "w";
      }
    },
  },
});

export const {
  reset,
  move,
  gotoPrev,
  gotoNext,
  select,
  deselect,
  lastMove,
  changeColor,
} = chessSlice.actions;

export default chessSlice.reducer;
