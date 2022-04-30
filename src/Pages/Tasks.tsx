import { useParams } from 'react-router-dom';

import { ITask } from "../interfaces/task";

import TaskForm from "../components/Tasks/TaskForm"
import TasksList from "../components/Tasks/TasksList";
import TasksFilters from "../components/Tasks/TasksFilters";
import useTasks from "../hooks/useTasks";

import TasksService from "../services/tasks";
import FoldersService from '../services/folders';
import TagsService from '../services/tags';

import StyledTasksContainer from '../styles/Tasks';

const _tasks = new TasksService();
const _folders = new FoldersService();
const _tags = new TagsService();

export default function Tasks() {
  const { folderId } = useParams();
  
  const [state, dispatch] = useTasks(_tasks.getAll(folderId));

  const handleCreate = (task: ITask) => {
    const newTask = _tasks.add(task);
    dispatch({ type: 'add', payload: newTask })
  }
  
  const handleRemove = (taskId: string) => {
    const removedTask = _tasks.remove(taskId);
    if(!removedTask) {
      return
    }

    dispatch({ type: 'remove', payload: removedTask })
  }

  const handleUpdate = (taskId: string, data: { finish?: boolean, important?: boolean }) => {
    const updatedTask = _tasks.update(taskId, data);
    if(!updatedTask) {
      return
    }
    dispatch({ type: 'update', payload: updatedTask })
  }
  
  return (
    <StyledTasksContainer>
      <TasksFilters setTasks={(tasks) => dispatch({ type: 'set', payload: tasks })} filters={{ folderId }} />
      <TaskForm create={handleCreate} foldersList={_folders.getAll()} tagsList={_tags.getAll()} />
      <TasksList 
        tasks={state.tasks} 
        remove={handleRemove}
        update={handleUpdate}
      />
    </StyledTasksContainer>
  )
}