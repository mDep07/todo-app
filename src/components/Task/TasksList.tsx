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
            // <StyledTasksItem key={task.id} checked={task.finished}>
            //   <header>
            //     {
            //       !task.finished ? (
            //         <StyledButtonCheck onClick={() => finish(task.id, true)}>
            //             <IoCheckmark />
            //         </StyledButtonCheck>
            //       ) : (
            //         <StyledButtonCheck checked onClick={() => finish(task.id, false)}>
            //             <IoCheckmark />
            //         </StyledButtonCheck>
            //       )
            //     } 
            //     <button className="select">
            //       {task.title}
            //     </button>
            //     <span>
            //       <StyledIconButton color="danger" onClick={() => remove(task.id)}>
            //         <IoClose />
            //       </StyledIconButton>
            //     </span>
            //   </header>
            // </StyledTasksItem>
          ))
        }
      </StyledTasksList>
    </StyledTasksContainer>  
  )
}