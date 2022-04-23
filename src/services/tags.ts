import { ITag } from '../interfaces/tag';
import { v4 as uuidv4 } from 'uuid';

export default class TagsService {

  private KEY_ITEMS: string;

  constructor() {
    this.KEY_ITEMS = 'tags';
  }

  getAll() {
    const tags: ITag[] = JSON.parse(localStorage.getItem(this.KEY_ITEMS) || '[]');
    // const tasksFiltered = tasks.filter(t => 
    //   moment().startOf("day").isSame(moment(t.create_date).startOf("day")) || !t.finished
    // )
    return tags;
  }

  getById(id: string) {
    const tags = this.getAll(); 
    return tags.find(tag => tag.id === id)
  }

  add(tag: ITag) {
    const tags = this.getAll();
    
    const newTag: ITag = { 
      id: uuidv4(), 
      name: tag.name,
    };
    
    localStorage.setItem(this.KEY_ITEMS, JSON.stringify([...tags, newTag]));
    
    return newTag;
  }

  remove(id: string) {
    const tags = this.getAll();
    const tag = tags.find(task => task.id === id);
    if(!tag) {
      return
    }

    localStorage.setItem(this.KEY_ITEMS, JSON.stringify([...tags.filter(tag => tag.id !== id)]));

    return tag;
  }
}
