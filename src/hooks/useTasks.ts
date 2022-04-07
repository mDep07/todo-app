import { Reducer, useReducer } from "react";

import { ITask } from "../interfaces/task";
import { orderTasks } from "../utils/orderTasks";

export default function useTasks(initialState: ITask[]) {

  type TState = { 
    tasks: ITask[] 
  };

  type TAction = { type: 'add' | 'remove' | 'update', payload: ITask } | { type: 'set', payload: ITask[] }

  const reducer: Reducer<TState, TAction> = (state, action): TState => {
    const { type, payload } = action;

    switch(type) {
      case 'set': {
        const tasks = payload as ITask[];
        
        const orderedTasks = orderTasks([...tasks]);

        return {
          ...state,
          tasks: orderedTasks
        }
      }
      case 'add': {
        const { tasks } = state;
        const newTask = payload as ITask;
        
        const orderedTasks = orderTasks([...tasks, newTask]);

        return {
          ...state,
          tasks: orderedTasks
        }
      }
      case 'remove': {
        const removedTask = payload as ITask;
        
        const tasksFiltered = state.tasks.filter(task => task.id !== removedTask.id)

        return {
          ...state,
          tasks: tasksFiltered
        };
      }
      case 'update': {
        const updatedTask = payload as ITask; 
        
        const orderedTasks = orderTasks(state.tasks.map(task => task.id === updatedTask.id ? { ...updatedTask } : task));

        return {
          ...state,
          tasks: orderedTasks
        };
      }
      default:
        return state
    }
  }

  return useReducer(reducer, { tasks: initialState });
}