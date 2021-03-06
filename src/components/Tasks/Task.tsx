import React, { useState } from 'react';
import moment from 'moment';
import { IoClose, IoCheckmark, IoAlert, IoFolderOutline, IoPricetagOutline } from 'react-icons/io5';

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
      <Details show={showDetails} task={task} />
      <Footer task={task} />
    </StyledTasksItem>
  )
}

const showDateFormat = (startDate: string, endDate?: string): string => {
  let resultDate = moment(startDate).format('LLL');

  if(endDate) {
    const isSameDay = moment(startDate, 'yyyy-DD-MM').isSame(moment(endDate, 'yyyy-DD-MM'));
    const endDateFormat = isSameDay ? moment(endDate).format('LT') : moment(endDate).format('LLL');
    resultDate += ` ??? ${endDateFormat}`
  }
  return resultDate
}

const Details = ({ show, task }: { show: boolean, task: ITask }) => {
  if(!show) return null

  return (
    <StyledDetailsTask>
      <small>
        {showDateFormat(task.create_date, task.finished_date)}
      </small>
      { !task.finished && task.expiration_date && <small className="expired">Expires {moment(task.expiration_date).toNow()}</small> }
    </StyledDetailsTask>
  )
}

const Footer = ({ task }: { task: ITask }) => {

  return (
    <StyledFooterTask>
      {
        task.folderId && task.folder && 
        <span>
          <IoFolderOutline style={{ marginRight: 5 }} />
          {task.folder.title}
        </span>
      }
      {
        task.tagsId && task.tags && 
        <span className="main">
          <IoPricetagOutline style={{ marginRight: 5 }} />
          {task.tags.name}
        </span>
      }
      {!task.finished && task.expiration_date && moment().isSameOrAfter(task.expiration_date) && <span className="warning">Expired</span>}
      {task.finished && (
        <span className="success">Finished</span>
      )}
      {task.important && (
        <span className="info">Important</span>
      )}
    </StyledFooterTask>
  )
}