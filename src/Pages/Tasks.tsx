import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ITask } from "../interfaces/task";

import TaskForm from "../components/Tasks/TaskForm"
import TasksList from "../components/Tasks/TasksList";
import useTasks from "../hooks/useTasks";
import TasksService from "../services/tasks";
import FoldersService from '../services/folders';

export default function Tasks() {
  
  const Tasks = new TasksService();
  const Folders = new FoldersService();

  const [state, dispatch] = useTasks();
  const params = useParams();


  useEffect(() => {
    const { folderId } = params;
    if(folderId) {
      console.log({folderId})
    }

  }, [params])

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
  
  return (
    <section style={{ padding: '0 1rem' }}>
      <TaskForm create={handleCreate} foldersList={Folders.getAll()} />
      <TasksList 
        tasks={state.tasks} 
        remove={handleRemove}
        update={handleUpdate}
      />
    </section>
  )
}