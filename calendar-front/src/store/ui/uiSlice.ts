import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

export interface UiSliceState {
  isDateModalOpen: boolean
}

const initialState: UiSliceState = {
  isDateModalOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onOpenDateModal: (state: any) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state: any) => {
      state.isDateModalOpen = false;
    },
  },
});

//Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
