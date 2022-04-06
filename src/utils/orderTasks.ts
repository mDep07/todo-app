import moment from "moment";
import { ITask } from "../interfaces/task";

import componse from './compose';

export const orderTasks = (tasks: ITask[]) => componse(sortCompletedLast, sortImportantAtBeginning, sortByDate)(tasks);

export const sortByDate = (tasks: ITask[]) => {
  return [...tasks].sort((a, b) => {
      if(moment(a.create_date).isBefore(b.create_date)) return 1
      if(moment(a.create_date).isAfter(b.create_date)) return -1
      return 0
  });
}

export const sortImportantAtBeginning = (tasks: ITask[]) => {
  return [...tasks].sort((a, b) => Number(b.important) - Number(a.important));
}

export const sortCompletedLast = (tasks: ITask[]) => {
  return [...tasks].sort((a, b) => Number(a.finished) - Number(b.finished));
}