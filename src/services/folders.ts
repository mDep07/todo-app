import { IFolder } from '../interfaces/folder';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import TasksService from './tasks'; 

export default class FoldersService {

  private KEY_ITEMS: string;
  private Tasks;

  constructor() {
    this.KEY_ITEMS = 'folders';
    this.Tasks = new TasksService();
  }

  getAll() {
    const folders: IFolder[] = JSON.parse(localStorage.getItem(this.KEY_ITEMS) || '[]');
    // const tasksFiltered = tasks.filter(t => 
    //   moment().startOf("day").isSame(moment(t.create_date).startOf("day")) || !t.finished
    // )
    return folders;
  }

  getById(id: string) {
    const folders = this.getAll(); 
    return folders.find(folder => folder.id === id)
  }

  add(folder: IFolder) {
    const folders = this.getAll();
    
    const newFolder: IFolder = { 
      id: uuidv4(), 
      title: folder.title, 
      create_date: moment().format(),
    };
    
    localStorage.setItem(this.KEY_ITEMS, JSON.stringify([...folders, newFolder]));
    
    return newFolder;
  }

  remove(id: string) {
    const folders = this.getAll();
    const folder = folders.find(task => task.id === id);
    if(!folder) {
      return
    }

    const tasksInFolder = this.Tasks.getAll(folder.id);
    if(tasksInFolder.length > 0) {
      return
    }

    localStorage.setItem(this.KEY_ITEMS, JSON.stringify([...folders.filter(task => task.id !== id)]));

    return folder;
  }
}
