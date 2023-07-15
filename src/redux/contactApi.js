import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
  reducerPath: 'contactApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://64a6b18f096b3f0fcc80543b.mockapi.io',
  }),
  tagTypes: ['contacts'],

  endpoints: builder => ({
    fetchContacts: builder.query({
      query: () => ({
        method: 'GET',
        url: '/contacts',
      }),
      providesTags:['contacts'],
    }),
    addContact: builder.mutation({
      query: newContact => ({
        method: 'POST',
        url: '/contacts',
        body: newContact,
      }),
      invalidatesTags: ['contacts'],
    }),
    deleteContact: builder.mutation({
      query: id => ({
        method: 'DELETE',
        url: `/contacts/${id}`,
      }),
      invalidatesTags: ['contacts'],
    }),
  }),
});

export const { useFetchContactsQuery, useAddContactMutation, useDeleteContactMutation } = contactApi;
