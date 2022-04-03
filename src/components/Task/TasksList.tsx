import React from 'react'
import { IoClose, IoCheckmark, IoCheckmarkDone } from 'react-icons/io5';

import { ITask } from "../../interfaces/task";

import { StyledIconButton } from '../../styles/Button'
import StyledTasksContainer, { StyledTasksList, StyledTasksItem, StyledButtonCheck } from '../../styles/TasksList'

type TasksListParams = {
  tasks: ITask[],
  remove: (taskId: string) => void;
  finish: (taskId: string, finished: boolean) => void;
}
export default function TasksList({ tasks, remove, finish }: TasksListParams) {
  return (
    <StyledTasksContainer>
      <StyledTasksList>
        {
          tasks.map(task => (
            <StyledTasksItem key={task.id} checked={task.finished}>
              <header>
                {
                  !task.finished ? (
                    <StyledButtonCheck onClick={() => finish(task.id, true)}>
                        <IoCheckmark />
                    </StyledButtonCheck>
                  ) : (
                    <StyledButtonCheck checked onClick={() => finish(task.id, false)}>
                        <IoCheckmark />
                    </StyledButtonCheck>
                  )
                } 
                <button className="select">
                  {task.title}
                </button>
                <span>
                  <StyledIconButton color="danger" onClick={() => remove(task.id)}>
                    <IoClose />
                  </StyledIconButton>
                </span>
              </header>
            </StyledTasksItem>
          ))
        }
      </StyledTasksList>
    </StyledTasksContainer>  
  )
}