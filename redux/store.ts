import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import chessReducer from "./features/chess-slice";
import modalReducer from "./features/modal-slice";
import twoWorldsReducer from "./features/two-worlds-slice"

export const store = configureStore({
  reducer: {
    chessReducer,
    modalReducer,
    twoWorldsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
