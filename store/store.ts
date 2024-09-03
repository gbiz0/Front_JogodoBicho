import { configureStore } from '@reduxjs/toolkit';
import contraventorReducer from './slices/contraventorSlice';

export const store = configureStore({
  reducer: {
    contraventor: contraventorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
