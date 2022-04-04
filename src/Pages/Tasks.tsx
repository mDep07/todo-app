import { ITask } from "../interfaces/task";

import TaskForm from "../components/Task/TaskForm"
import TasksList from "../components/Task/TasksList";
import useTasks from "../hooks/useTasks";

export default function Tasks() {
  const [state, dispatch] = useTasks();

  const handleCreate = (task: ITask) => dispatch({ type: 'add', payload: task })
  const handleRemove = (taskId: string) => dispatch({ type: 'remove', payload: taskId })
  const handleFinish = (taskId: string, finished: boolean) => dispatch({ type: 'finish', payload: { taskId, finished } })
  const handleImportant = (taskId: string, important: boolean) => dispatch({ type: 'makeImportant', payload: { taskId, important } })

  return (
    <section style={{ padding: '0 1rem' }}>
      <h3>Tasks</h3>
      <TaskForm createTask={handleCreate} />
      <TasksList 
        tasks={state.tasks} 
        remove={handleRemove}
        finish={handleFinish}
        important={handleImportant}
      />
    </section>
  )
}