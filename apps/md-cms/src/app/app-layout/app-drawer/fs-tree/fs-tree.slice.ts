import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBackendUrl } from '@md-cms/shared-env';
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
    baseUrl: getBackendUrl(),
    prepareHeaders: (headers) => {
      headers.set('accept', 'application/json');
      return headers;
    },
    mode: 'cors',
  }),
  endpoints: (builder) => ({
    getFilesList: builder.query<string, void>({
      query: () => `files`,
    }),
    getFileByName: builder.query<string, string>({
      query: (name) => `files/${name}`,
    }),
    createFile: builder.mutation<
      string,
      Pick<FsTreeEntity, 'content' | 'filename'>
    >({
      query: (mdContent) => ({
        url: '/files',
        method: 'POST',
        body: mdContent,
      }),
    }),
    updateFile: builder.mutation<
      string,
      Pick<FsTreeEntity, 'content' | 'filename'>
    >({
      query: ({ content, filename }) => ({
        url: `/files/${filename}`,
        method: 'POST',
        body: content,
      }),
    }),
  }),
});

export const {
  useGetFileByNameQuery,
  useGetFilesListQuery,
  useCreateFileMutation,
  useUpdateFileMutation,
} = filesApi;
