import React from 'react'

import { ITask } from "../../interfaces/task";

import Task from './Task';

import StyledTasksContainer, { StyledTasksList } from '../../styles/Tasks'

type TasksListParams = {
  tasks: ITask[],
  remove: (taskId: string) => void;
  finish: (taskId: string, finished: boolean) => void;
  important: (taskId: string, important: boolean) => void;
}
export default function TasksList({ tasks, remove, finish, important }: TasksListParams) {
  return (
    <StyledTasksContainer>
      <StyledTasksList>
        {
          tasks.map(task => (
            <Task 
              key={task.id} 
              task={task}
              removed={() => remove(task.id)} 
              finished={(finished) => finish(task.id, finished)}
              makeImportant={(makeImportant) => important(task.id, makeImportant)}
            />
          ))
        }
      </StyledTasksList>
    </StyledTasksContainer>  
  )
}