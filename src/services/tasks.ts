import { ITask } from '../interfaces/task';
import { orderTasks } from '../utils/orderTasks';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export default class TasksService {

  private KEY_ITEMS: string;

  constructor() {
    this.KEY_ITEMS = 'tasks';
  }

  getAll() {
    const tasks: ITask[] = JSON.parse(localStorage.getItem(this.KEY_ITEMS) || '[]');
    // const tasksFiltered = tasks.filter(t => 
    //   moment().startOf("day").isSame(moment(t.create_date).startOf("day")) || !t.finished
    // )
    return tasks;
  }

  getById(id: string) {
    const tasks = this.getAll(); 
    return tasks.find(task => task.id === id)
  }

  add(task: ITask) {
    const tasks = this.getAll();
    
    const newTask: ITask = { 
      id: uuidv4(), 
      title: task.title, 
      create_date: moment().format(), 
      finished: false, 
      task_id: task.task_id, 
      important: task.important
    };

    const orderedTasks = orderTasks([...tasks, newTask]);
    localStorage.setItem(this.KEY_ITEMS, JSON.stringify(orderedTasks));
    
    return newTask;
  }

  remove(id: string) {
    const tasks = this.getAll();
    const task = tasks.find(task => task.id === id);
    if(!task) {
      return
    }

    const orderedTasks = orderTasks([...tasks.filter(task => task.id !== id)]);
    localStorage.setItem(this.KEY_ITEMS, JSON.stringify(orderedTasks));

    return task;
  }

  update(id: string, data: { finish?: boolean, important?: boolean }) {
    const tasks = this.getAll();
    const task = tasks.find(task => task.id === id);
    if(!task) {
      return
    }

    const updatedTask: ITask = { ...task }

    if(typeof data.finish !== 'undefined') {
      updatedTask.finished = data.finish;
      updatedTask.finished_date = data.finish ? moment().format() : '';
    }

    if(typeof data.important !== 'undefined') {
      updatedTask.important = data.important;
    }

    const orderedTasks = orderTasks([...tasks.map(task => task.id === id ? { ...updatedTask } : task)]);
    localStorage.setItem(this.KEY_ITEMS, JSON.stringify(orderedTasks));

    return updatedTask;

  }
}
