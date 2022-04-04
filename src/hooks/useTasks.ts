import { Reducer, useReducer } from "react";

import { ITask } from "../interfaces/task";
import TasksService from "../services/tasks";
import { orderTasks } from "../utils/orderTasks";

export default function useTasks() {

  const Tasks = new TasksService();

  type TState = { tasks: ITask[] };
  type TAction =  { type: 'add', payload: ITask } | 
                  { type: 'remove', payload: string } | 
                  { type: 'finish', payload: { taskId: string, finished: boolean } } |
                  { type: 'makeImportant', payload: { taskId: string, important: boolean } };

  const reducer: Reducer<TState, TAction> = (state, action): TState => {
    const { type, payload } = action;

    switch(type) {
      case 'add': {
        const { tasks } = state;
        const task = payload as ITask;
        // if(typeof task === 'string') return state;
        
        const newTask: ITask = Tasks.add(task);
        const orderedTasks = orderTasks([...tasks, {...newTask}]);

        return {
          ...state,
          tasks: orderedTasks
        }
      }
      case 'remove': {
        const { tasks } = state;
        const taskId = payload as string;
        // if(typeof taskId !== 'string') return state;

        const removeTask = Tasks.remove(taskId);
        if(!removeTask) {
          return state
        }

        return {
          ...state,
          tasks: [...tasks.filter(t => t.id !== removeTask.id)]
        };
      }
      case 'finish': {
        const { taskId, finished } = payload as { taskId: string, finished: boolean };
        // if(typeof taskId !== 'string') return state;
        
        const updatedTask = Tasks.finish(taskId, finished);
        if(!updatedTask) {
          return state
        }

        return {
          ...state,
          tasks: state.tasks.map(task => task.id === updatedTask.id ? { ...updatedTask } : task)
        };
      }
      case 'makeImportant': {
        const { taskId, important } = payload as { taskId: string, important: boolean };
        // if(typeof taskId !== 'string') return state;
        
        const updatedTask = Tasks.makeImportant(taskId, important);
        if(!updatedTask) {
          return state
        }

        return {
          ...state,
          tasks: state.tasks.map(task => task.id === updatedTask.id ? { ...updatedTask } : task)
        };
      }
    }
  }

  const tasks = Tasks.getAll();

  return useReducer(reducer, { tasks });
}