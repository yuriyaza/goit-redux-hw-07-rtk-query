import { configureStore } from '@reduxjs/toolkit';
import { phoneBook } from './phonebook/slice';
import { api } from './phonebook/api';

export const store = configureStore({
  reducer: {
    phoneBook: phoneBook.reducer,
    [api.reducerPath]: api.reducer,
  },
  
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(), api.middleware
  ],
});
