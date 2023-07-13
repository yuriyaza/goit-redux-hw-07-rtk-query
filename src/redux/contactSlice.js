import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

export const contactSlice = createSlice({
  name: 'contactSlice',

  initialState: {
    contacts: [],
    filter: '',
    error: null,
    isLoading: false,
  },

  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.isLoading = false;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts = [...state.contacts, action.payload];
        state.isLoading = false;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload.id);
        state.isLoading = false;
      })

      .addMatcher(isAnyOf(fetchContacts.pending, addContact.pending, deleteContact.pending), (state, action) => {
        state.error = null;
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(fetchContacts.rejected, addContact.rejected, deleteContact.rejected), (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});
