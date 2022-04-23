import { IFolder } from "./folder";

export interface ITask {
  id: string;
  title: string;
  create_date: string;
  finished: boolean;
  task_id?: string;
  finished_date?: string;
  important?: boolean;
  expiration_date?: string;
  start_date?: string;
  folderId?: string;
  folder?: IFolder;
  tagsId?: string[];
}

export interface IAdvancedTask extends ITask {
  folderId?: string;
  folder?: IFolder;
  expiration_date?: string;
  tagsId?: string[];
}