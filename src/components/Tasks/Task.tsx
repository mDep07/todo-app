import moment from 'moment';
import React, { useState } from 'react'
import { IoClose, IoCheckmark, IoAlert, IoFolderOutline } from 'react-icons/io5';

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
    <StyledTasksItem checked={task.finished} highlight={task.important && !task.finished}>
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
          <small>
            {showDateFormat(task.create_date, task.finished_date)}
          </small>
        </StyledDetailsTask>
      }
      <StyledFooterTask>
        {
          task.folderId && task.folder && 
          <span className="">
            <IoFolderOutline style={{ marginRight: 5 }} />
            {task.folder.name}
          </span>
        }
        {task.finished && <span className="success">Finished</span>}
        {task.important && <span className="info">Important</span>}
      </StyledFooterTask>
    </StyledTasksItem>  
  )
}

const showDateFormat = (startDate: string, endDate?: string): string => {
  let resultDate = moment(startDate).format('LLL');

  if(endDate) {
    const isSameDay = moment(startDate, 'yyyy-DD-MM').isSame(moment(endDate, 'yyyy-DD-MM'));
    const endDateFormat = isSameDay ? moment(endDate).format('LT') : moment(endDate).format('LLL');
    resultDate += ` • ${endDateFormat}`
  }
  return resultDate
}