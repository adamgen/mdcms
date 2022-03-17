import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/*
 * Update these interfaces according to your requirements.
 */
export interface FsTreeEntity {
  id: number;
  parentId: number;
  children: number[];
}

// Define a service using a base URL and expected endpoints
export const filesApi = createApi({
  reducerPath: 'filesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3002/',
    prepareHeaders: (headers) => {
      headers.set('accept', 'application/json');
      return headers;
    },
    mode: 'cors',
  }),
  endpoints: (builder) => ({
    getFileByName: builder.query<string, string>({
      query: (name) => `files/${name}`,
    }),
  }),
});

export const { useGetFileByNameQuery } = filesApi;
