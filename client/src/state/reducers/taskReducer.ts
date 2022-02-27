import { TaskActionType, ITaskState } from '../action-types';
import { TaskAction } from '../actions';

const initialState: ITaskState = {
  tasks: [],
  loading: false,
};

export const taskReducer = (
  state = initialState,
  action: TaskAction
): ITaskState => {
  switch (action.type) {
    case TaskActionType.SET_TASKS:
      return { ...state, tasks: action.payload };
    case TaskActionType.UNSET_TASKS:
      return initialState;
    case TaskActionType.CREATE_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case TaskActionType.UPDATE_TASK: {
      const tasks = state.tasks.map((task) =>
        task.taskId === action.payload.taskId ? action.payload : task
      );
      return { ...state, tasks: [...tasks] };
    }
    case TaskActionType.DELETE_TASK: {
      const tasks = state.tasks.filter(
        (task) => task.taskId !== action.payload
      );
      return { ...state, tasks: [...tasks] };
    }
    default:
      return state;
  }
};

export default taskReducer;
