import { Reducer, useReducer } from "react";


import { ITask } from "../interfaces/task";

import TaskForm from "../components/Task/TaskForm"
import TasksList from "../components/Task/TasksList";
import useTasks from "../hooks/useTasks";

export default function Tasks() {
  const [state, dispatch] = useTasks();

  return (
    <section style={{ padding: '0 1rem' }}>
      <h3>Tasks</h3>
      <TaskForm createTask={(task: ITask) => dispatch({ type: 'add', payload: task })} />
      <TasksList 
        tasks={state.tasks} 
        remove={(taskId) => dispatch({ type: 'remove', payload: taskId })}
        finish={(taskId, finished) => dispatch({ type: 'finish', payload: { taskId, finished } })}
        important={(taskId, important) => dispatch({ type: 'makeImportant', payload: { taskId, important } })}
      />
    </section>
  )
}