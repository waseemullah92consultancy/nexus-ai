import { baseApi } from './baseApi';
import { Agent, CreateAgentRequest, UpdateAgentRequest } from '@/types';

export const agentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgents: builder.query<
      Agent[],
      { category?: string; search?: string } | void
    >({
      query: (params) => ({
        url: '/agents',
        params: params || undefined,
      }),
      providesTags: ['Agent'],
    }),
    getMyAgents: builder.query<Agent[], void>({
      query: () => '/agents/mine',
      providesTags: ['Agent'],
    }),
    getAgentById: builder.query<Agent, string>({
      query: (id) => `/agents/${id}`,
      providesTags: (_, __, id) => [{ type: 'Agent', id }],
    }),
    createAgent: builder.mutation<Agent, CreateAgentRequest>({
      query: (body) => ({
        url: '/agents',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Agent'],
    }),
    createAgentFromTemplate: builder.mutation<Agent, string>({
      query: (templateId) => ({
        url: `/agents/from-template/${templateId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Agent'],
    }),
    updateAgent: builder.mutation<Agent, { id: string; patch: UpdateAgentRequest }>({
      query: ({ id, patch }) => ({
        url: `/agents/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Agent', id }, 'Agent'],
    }),
    deleteAgent: builder.mutation<{ deleted: true }, string>({
      query: (id) => ({
        url: `/agents/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Agent'],
    }),
  }),
});

export const {
  useGetAgentsQuery,
  useGetMyAgentsQuery,
  useGetAgentByIdQuery,
  useCreateAgentMutation,
  useCreateAgentFromTemplateMutation,
  useUpdateAgentMutation,
  useDeleteAgentMutation,
} = agentsApi;