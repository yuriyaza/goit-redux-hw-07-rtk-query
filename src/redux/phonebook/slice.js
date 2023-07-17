import { createSlice } from '@reduxjs/toolkit';

export const phoneBook = createSlice({
  name: 'phoneBook',

  initialState: {
    filter: '',
  },

  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});
