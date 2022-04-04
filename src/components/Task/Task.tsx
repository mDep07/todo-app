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
            <StyledButtonCheck onClick={toogleFinished} title="Finished">
                <IoCheckmark />
            </StyledButtonCheck>
          ) : (
            <StyledButtonCheck checked onClick={toogleFinished} title="Undo Finished">
                <IoCheckmark />
            </StyledButtonCheck>
          )
        } 
        <button className="select" onClick={() => setShowDetails(!showDetails)}>
          {task.title}
        </button>
        <span style={{ display: 'flex', gap: 5 }}>
          {
            !task.finished &&
            <>
              <StyledIconButton checked={task.important} color="info" onClick={toogleImportant} title="Make important">
                <IoAlert />
              </StyledIconButton>
              <StyledIconButton color="danger" onClick={() => removed()} title="Delete">
                <IoClose />
              </StyledIconButton>
            </> 
          }
        </span>
      </header>
      {
        showDetails && 
        <StyledDetailsTask>
          <small>Created at: {moment(task.create_date).format('LLL')}</small>
          {task.finished_date && <small>Finished at: {moment(task.finished_date).format('LLL')}</small>}
        </StyledDetailsTask>
      }
      <StyledFooterTask>
        {task.finished && <span className="success">Finished</span>}
        {task.important && <span className="info">Important</span>}
      </StyledFooterTask>
    </StyledTasksItem>  
  )
}