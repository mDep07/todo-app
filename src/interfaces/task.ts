export interface ITask {
  id: string;
  title: string;
  create_date: string;
  finished: boolean;
  task_id?: string;
  finished_date?: string;
  expiration_date?: string;
  important?: boolean;
}