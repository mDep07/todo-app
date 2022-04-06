import { Reducer, useReducer } from "react";

import { ITask } from "../interfaces/task";
import TasksService from "../services/tasks";
import { orderTasks } from "../utils/orderTasks";

export default function useTasks() {

  const Tasks = new TasksService();

  type TState = { 
    tasks: ITask[] 
  };

  type TAction = { type: 'add' | 'remove' | 'update', payload: ITask }

  const reducer: Reducer<TState, TAction> = (state, action): TState => {
    const { type, payload } = action;

    switch(type) {
      case 'add': {
        const { tasks } = state;
        const newTask = payload;
        
        const orderedTasks = orderTasks([...tasks, newTask]);

        return {
          ...state,
          tasks: orderedTasks
        }
      }
      case 'remove': {
        const removedTask = payload;
        
        const tasksFiltered = state.tasks.filter(task => task.id !== removedTask.id)

        return {
          ...state,
          tasks: tasksFiltered
        };
      }
      case 'update': {
        const updatedTask = payload;
        
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

  const tasks = Tasks.getAll();

  return useReducer(reducer, { tasks });
}