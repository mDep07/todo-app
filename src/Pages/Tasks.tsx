import { Reducer, useReducer } from "react";


import { ITask } from "../interfaces/task";
import TasksService from "../services/tasks";
import { orderTasks } from "../utils/orderTasks";

import TaskForm from "../components/Task/TaskForm"
import TasksList from "../components/Task/TasksList";

const { getTasks, addTask, removeTask, updateTask } = TasksService();

type TState = { tasks: ITask[] };
type TAction =  { type: 'add', payload: ITask } | 
                { type: 'remove', payload: string } | 
                { type: 'finish', payload: { taskId: string, finished: boolean } };

const reducer: Reducer<TState, TAction> = (state, action): TState => {
  const { type, payload } = action;

  switch(type) {
    case 'add': {
      const { tasks } = state;
      const task = payload as ITask;
      // if(typeof task === 'string') return state;
      
      const newTask: ITask = addTask(task);
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

      const removeTasks = removeTask(taskId);

      return {
        ...state,
        tasks: [...tasks.filter(t => !removeTasks.includes(t.id))]
      };
    }
    case 'finish': {
      const { taskId, finished } = payload as { taskId: string, finished: boolean };
      // if(typeof taskId !== 'string') return state;
      
      const tasksWithUpdated = updateTask(taskId, { finished });

      return {
        ...state,
        tasks: tasksWithUpdated
      };
    }
  }
}

export default function Tasks() {
  const [state, dispatch] = useReducer(reducer, { tasks: getTasks() });

  return (
    <section style={{ padding: '0 1rem' }}>
      <h3>Tasks</h3>
      <TaskForm createTask={(task: ITask) => dispatch({ type: 'add', payload: task })} />
      <TasksList 
        tasks={state.tasks} 
        remove={(taskId) => dispatch({ type: 'remove', payload: taskId })}
        finish={(taskId, finished) => dispatch({ type: 'finish', payload: { taskId, finished } })}
      />
    </section>
  )
}