import moment from "moment";
import { ITask } from "../interfaces/task";

export const orderTasks = (tasks: ITask[]) => {
  const orderedByDate = [...tasks].sort((a, b) => {
      if(moment(a.create_date).isBefore(b.create_date)) return 1
      if(moment(a.create_date).isAfter(b.create_date)) return -1
      return 0
  });

  const orderedByImportance = [...orderedByDate].sort((a, b) => Number(b.important) - Number(a.important));
  return orderedByImportance;
}