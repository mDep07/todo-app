import React from 'react'

import { ITask } from "../../interfaces/task";

import Task from './Task';

import StyledTasksContainer, { StyledTasksList } from '../../styles/Tasks'

type TasksListParams = {
  tasks: ITask[],
  remove: (taskId: string) => void;
  update: (taskId: string, data: { finish?: boolean, important?: boolean }) => void;
}
export default function TasksList({ tasks, remove, update }: TasksListParams) {
  return (
    <StyledTasksContainer>
      <StyledTasksList>
        {
          tasks.map(task => (
            <Task 
              key={task.id} 
              task={task}
              removed={() => remove(task.id)} 
              finished={(finish) => update(task.id, { finish })}
              makeImportant={(important) => update(task.id, { important })}
            />
          ))
        }
      </StyledTasksList>
    </StyledTasksContainer>  
  )
}