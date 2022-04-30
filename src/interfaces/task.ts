import { IFolder } from "./folder";
import { ITag } from "./tag";

// export interface ITask {
//   id: string;
//   title: string;
//   create_date: string;
//   finished: boolean;
//   finished_date?: string;
//   important?: boolean;
//   expiration_date?: string;
//   start_date?: string;
//   task_id?: string;
//   folderId?: string;
//   folder?: IFolder;
//   tagsId?: ITag[];
// }

export interface IBasicTask {
  id: string;
  title: string;
  create_date: string;
  finished: boolean;
  finished_date?: string;
  important?: boolean;
}

export interface IAdvancedTask {
  expiration_date?: string;
  start_date?: string;
  task_id?: string;
  folderId?: string;
  folder?: IFolder;
  tagsId?: string;
  tags?: ITag;
}

export interface ITask extends IBasicTask, IAdvancedTask { }