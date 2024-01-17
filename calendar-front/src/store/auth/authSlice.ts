import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

export interface CounterState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  user: Partial<User>;
  errorMessage: string | null;
}

const initialState: CounterState = {
  status: 'checking',
  user: {},
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // checking: (state, action: PayloadAction<number>) => {
    onChecking: (state) => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage = null;
    },
    onLogin: (state, action: PayloadAction<Partial<User>>) => {
      state.status = 'authenticated';
      state.user = action.payload;
      state.errorMessage = null;
    },
    onLogout: (state, action: PayloadAction<string | null>) => {
      state.status = 'not-authenticated';
      state.user = {};
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
});

//Action creators are generated for each case reducer function
export const {
  onChecking,
  onLogin,
  onLogout,
  clearErrorMessage,
} = authSlice.actions;

export default authSlice.reducer;
