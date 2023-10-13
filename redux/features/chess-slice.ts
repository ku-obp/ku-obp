// Typescript => PayLoadAction
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const startFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

type LastMovePayload = {
  from: string;
  to: string;
};

type SelectPayload = {
  from: string;
  possibleMoves: string[];
};

type ChessState = {
  boardIndex: number;
  history: string[];
  turnColor: "w" | "b";
  from: string;
  to: string[];
  lastMoveFrom: string;
  lastMoveTo: string;
};

const initialState = {
  boardIndex: 0,
  history: [startFen],
  turnColor: "w",
  from: "",
  to: [] as string[],
  lastMoveFrom: "",
  lastMoveTo: "",
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
        ...state.history.slice(0, state.boardIndex + 1),
        action.payload,
      ];
      state.turnColor = state.turnColor === "w" ? "b" : "w";
    },
    gotoPrev: (state) => {
      state.boardIndex = state.boardIndex - 1;
      state.turnColor = state.turnColor === "w" ? "b" : "w";
    },
    gotoNext: (state) => {
      state.boardIndex = state.boardIndex + 1;
      state.turnColor = state.turnColor === "w" ? "b" : "w";
    },
    selectPiece: (state, action: PayloadAction<SelectPayload>) => {
      state.from = action.payload.from;
      state.to = action.payload.possibleMoves;
    },
    deselectPiece: (state) => {
      state.from = "";
      state.to = [];
    },
    lastMove: (state, action: PayloadAction<LastMovePayload>) => {
      state.lastMoveFrom = action.payload.from;
      state.lastMoveTo = action.payload.to;
    },
    newTurn: (state) => {
      state.turnColor = state.turnColor === "w" ? "b" : "w";
      state.from = "";
      state.to = [];
    },
  },
});

export const { reset, move } = chessSlice.actions;

export default chessSlice.reducer;
