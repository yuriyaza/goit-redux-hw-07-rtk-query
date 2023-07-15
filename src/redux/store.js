import { configureStore } from '@reduxjs/toolkit';
import { contactSlice } from './contactSlice';
import { contactApi } from './contactApi';

export const store = configureStore({
  reducer: {
    contactSlice: contactSlice.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(), contactApi.middleware
  ],
});
