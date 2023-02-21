import { apiSlice } from '../../app/api/apiSlice';
import { ITask, NewTaskType, TaskIdType, UpdateTaskType } from '../../types';

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTask: builder.query<ITask[], void>({
      query: () => ({
        url: '/tasks',
      }),
      providesTags: (result) =>
        result
          ? [
              { type: 'Tasks', id: 'LIST' },
              ...result.map(({ taskId }) => ({
                type: 'Tasks' as const,
                id: taskId,
              })),
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),

    createTask: builder.mutation<ITask, NewTaskType>({
      query: (newTaskData) => ({
        url: '/tasks',
        method: 'POST',
        body: { ...newTaskData },
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),

    updateTask: builder.mutation<ITask, UpdateTaskType>({
      query: (updateTaskData) => ({
        url: `/tasks/${updateTaskData.taskId}`,
        method: 'PUT',
        body: { ...updateTaskData },
      }),
      // invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.taskId }],
      invalidatesTags: ['Tasks'],
    }),

    deleteTask: builder.mutation<null, TaskIdType>({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Tasks'],
    }),
  }),
});

export const {
  useGetAllTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApiSlice;
