import { ITask } from '../interfaces/task';
import { orderTasks } from '../utils/orderTasks';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';


export default function TasksService() {
  const KEY_ITEM = 'tasks';
  const getTasks = () => {
    const tasks: ITask[] = JSON.parse(localStorage.getItem(KEY_ITEM) || '[]');
    return tasks;
  }

  const addTask = (task: ITask) => {
    const tasks = getTasks();
    
    const newTask: ITask = { 
      id: uuidv4(), 
      title: task.title, 
      create_date: task.create_date, 
      finished: false, 
      task_id: task.task_id, 
      important: task.important
    };

    const orderedTasks = orderTasks([...tasks, {...newTask}]);
    localStorage.setItem(KEY_ITEM, JSON.stringify(orderedTasks));
    
    return newTask;
  }

  const removeTask = (taskId: string) => {
    const tasks = getTasks();
    const taskAndSubTasksIds = tasks.filter(t => t.task_id === taskId || t.id === taskId).map(t => t.id);

    const tasksWithoutRemoved = [...tasks.filter(t => !taskAndSubTasksIds.includes(t.id))];
    localStorage.setItem(KEY_ITEM, JSON.stringify(tasksWithoutRemoved));

    return taskAndSubTasksIds;
  }

  const updateTask = (taskId: string, { finished }: { finished: boolean }) => {
    const tasks = getTasks();
    const taskAndSubTasksIds = tasks.filter(t => t.task_id === taskId || t.id === taskId).map(t => t.id);

    const tasksWithUpdated = [
      ...tasks.map(task => {
        if(taskAndSubTasksIds.includes(task.id)) {
          if(task.id === taskId) {
            return {
              ...task, 
              finished: finished, 
              finished_date: finished ? moment().format() : '' 
            }
          }
          
          return {
            ...task, 
            finished: finished ? finished : task.finished, 
            finished_date: finished ? moment().format() : '' 
          }
        }

        return task;
      })
    ];
    
    localStorage.setItem(KEY_ITEM, JSON.stringify(tasksWithUpdated));

    return tasksWithUpdated;
  }


  return { getTasks, addTask, removeTask, updateTask }
}