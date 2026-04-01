import { baseApi } from './baseApi';
import { Research } from '@/types';

export const researchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getResearch: builder.query<
      Research[],
      { lab?: string; category?: string; search?: string } | void
    >({
      query: (params) => ({
        url: '/research',
        params: params || undefined,
      }),
      providesTags: ['Research'],
    }),
    getTrendingResearch: builder.query<Research[], void>({
      query: () => '/research/trending',
    }),
    getResearchById: builder.query<Research, string>({
      query: (id) => `/research/${id}`,
      providesTags: (_, __, id) => [{ type: 'Research', id }],
    }),
  }),
});

export const {
  useGetResearchQuery,
  useGetTrendingResearchQuery,
  useGetResearchByIdQuery,
} = researchApi;