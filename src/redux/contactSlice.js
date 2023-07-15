import { createSlice } from '@reduxjs/toolkit';

export const contactSlice = createSlice({
  name: 'contactSlice',

  initialState: {
    filter: '',
  },

  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});
