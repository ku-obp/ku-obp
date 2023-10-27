import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
// import monopolyReducer from "./features/monopoly-slice";
import modalReducer from "./features/modal-slice";

export const store = configureStore({
  reducer: {
//    monopolyReducer,
    modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
