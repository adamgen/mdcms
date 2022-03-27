import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { cloneDeep } from 'lodash';
import { useDispatch } from 'react-redux';
import { editorSlice, File } from './editor.slice';
import { useEffect } from 'react';

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
    mode: 'cors',
  }),
  tagTypes: ['Files'],
  // TODO https://redux-toolkit.js.org/rtk-query/usage/mutations#revalidation-example
  endpoints: (builder) => ({
    getFilesList: builder.query<string[], void>({
      query: () => `files`,
      providesTags: (result) => [{ type: 'Files', id: 'LIST' }],
    }),
    getFileByName: builder.query<string, string>({
      query: (name) => `files/${name}`,
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
      invalidatesTags: [{ type: 'Files', id: 'LIST' }],
    }),
  }),
});

const { useGetFileByNameQuery: useGetFileByNameQueryBase } = filesApi;

export const useGetFileByNameQuery: typeof useGetFileByNameQueryBase = (
  fileName,
  options
) => {
  const result = useGetFileByNameQueryBase(fileName, options);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!result['data'] || !result['originalArgs']) {
      return;
    }
    const selectedFile: File = {
      path: result['originalArgs'],
      content: result['data'],
    };

    dispatch(editorSlice.actions.update({ selectedFile }));
  }, [result['originalArgs'], result['data']]);

  return cloneDeep(result);
};

export const { useGetFilesListQuery, useCreateFileMutation } = filesApi;
