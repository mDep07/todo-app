import moment from 'moment';
import React, { useState } from 'react'
import { IoClose, IoCheckmark, IoAlert } from 'react-icons/io5';

import { ITask } from "../../interfaces/task";

import { StyledIconButton } from '../../styles/Button'
import { StyledTasksItem, StyledButtonCheck, StyledDetailsTask, StyledFooterTask } from '../../styles/Tasks'

type TaskParams = {
  task: ITask,
  removed: () => void;
  finished: (finished: boolean) => void;
  makeImportant: (important: boolean) => void;
}
export default function Task({ task, removed, finished, makeImportant }: TaskParams) {

  const [showDetails, setShowDetails] = useState(false)

  const toogleImportant = () => {
    makeImportant(!Boolean(task.important))
  }

  const toogleFinished = () => {
    finished(!task.finished)
  }

  return (
    <StyledTasksItem checked={task.finished} highlight={task.important}>
      <header>
        {
          !task.finished ? (
            <StyledButtonCheck onClick={toogleFinished}>
                <IoCheckmark />
            </StyledButtonCheck>
          ) : (
            <StyledButtonCheck checked onClick={toogleFinished}>
                <IoCheckmark />
            </StyledButtonCheck>
          )
        } 
        <button className="select" onClick={() => setShowDetails(!showDetails)}>
          {task.title}
        </button>
        <span style={{ display: 'flex', gap: 5 }}>
          <StyledIconButton checked={task.important} color="info" onClick={toogleImportant}>
            <IoAlert />
          </StyledIconButton>
          <StyledIconButton color="danger" onClick={removed}>
            <IoClose />
          </StyledIconButton>
        </span>
      </header>
      {
        showDetails && 
        <StyledDetailsTask>
          <small>Created at: {moment(task.create_date).format('LLL')}</small>
        </StyledDetailsTask>
      }
      <StyledFooterTask>  
        <span>Etiqueta</span>
        <span>Expira en 2022-01-41</span>
        <span>Desarrollo</span>
      </StyledFooterTask>
    </StyledTasksItem>  
  )
}