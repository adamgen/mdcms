import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/*
 * Update these interfaces according to your requirements.
 */
export interface FsTreeEntity {
  filename: string; // Relative path to file including the filename and md extension
  content: string; // The contents with md metadata
}

// Define a service using a base URL and expected endpoints
export const filesApi = createApi({
  reducerPath: 'filesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      headers.set('accept', 'application/json');
      return headers;
    },
    mode: 'no-cors',
  }),
  tagTypes: ['Files'],
  endpoints: (builder) => ({
    getFilesList: builder.query<string[], void>({
      query: () => `files`,
      providesTags: () => [{ type: 'Files', id: 'LIST' }],
    }),
    getFileByName: builder.query<string, string>({
      query: (name) => {
        return `files/${name}`;
      },
      providesTags: (result, error, id) => {
        return [{ type: 'Files', id }];
      },
    }),
    createFile: builder.mutation<
      string,
      Pick<FsTreeEntity, 'content' | 'filename'>
    >({
      query: ({ content, filename }) => ({
        url: `/files/${filename}`,
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: (result, error, id) => {
        return [
          { type: 'Files', id: 'LIST' },
          { type: 'Files', id: id.filename },
        ];
      },
    }),
  }),
});

export const {
  useGetFilesListQuery,
  useCreateFileMutation,
  useGetFileByNameQuery,
} = filesApi;
