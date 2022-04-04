import { ITask } from "../interfaces/task";

import TaskForm from "../components/Tasks/TaskForm"
import TasksList from "../components/Tasks/TasksList";
import useTasks from "../hooks/useTasks";
import TasksService from "../services/tasks";

export default function Tasks() {
  const [state, dispatch] = useTasks();

  const Tasks = new TasksService();

  const handleCreate = (task: ITask) => {
    const newTask = Tasks.add(task);
    dispatch({ type: 'add', payload: newTask })
  }
  
  const handleRemove = (taskId: string) => {
    const removedTask = Tasks.remove(taskId);
    if(!removedTask) {
      return
    }

    dispatch({ type: 'remove', payload: removedTask })
  }

  const handleUpdate = (taskId: string, data: { finish?: boolean, important?: boolean }) => {
    const updatedTask = Tasks.update(taskId, data);
    if(!updatedTask) {
      return
    }
    dispatch({ type: 'update', payload: updatedTask })
  }
  // const handleImportant = (taskId: string, important: boolean) => {
  //   const updatedTask = Tasks.makeImportant(taskId, important);
  //   if(!updatedTask) {
  //     return
  //   }
  //   dispatch({ type: 'update', payload: updatedTask })
  // }

  return (
    <section style={{ padding: '0 1rem' }}>
      <TaskForm create={handleCreate} />
      <TasksList 
        tasks={state.tasks} 
        remove={handleRemove}
        update={handleUpdate}
      />
    </section>
  )
}