import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OpenPayload = {
  type: string;
  data: {
    gameName: string,
    hostEmail: string
  };
};

const initialState = {
  type: "",
  data: {
    gameName: "",
    hostEmail: ""
  },
  isOpen: false,
};

export const createRoomModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<OpenPayload>) => {
      state.type = action.payload.type;
      state.data = action.payload.data;
      state.isOpen = true;
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { openModal, closeModal } = createRoomModalSlice.actions;

export default createRoomModalSlice.reducer;
