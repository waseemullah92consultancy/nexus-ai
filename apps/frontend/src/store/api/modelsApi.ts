import { baseApi } from './baseApi';
import { Model, Lab, ModelStats } from '@/types';

export const modelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getModels: builder.query<
      Model[],
      { lab?: string; category?: string; search?: string } | void
    >({
      query: (params) => ({
        url: '/models',
        params: params || undefined,
      }),
      providesTags: ['Model'],
    }),
    getModelById: builder.query<Model, string>({
      query: (id) => `/models/${id}`,
      providesTags: (_, __, id) => [{ type: 'Model', id }],
    }),
    getModelStats: builder.query<ModelStats, void>({
      query: () => '/models/stats',
    }),
    getLabs: builder.query<Lab[], void>({
      query: () => '/models/labs',
    }),
  }),
});

export const {
  useGetModelsQuery,
  useGetModelByIdQuery,
  useGetModelStatsQuery,
  useGetLabsQuery,
} = modelsApi;