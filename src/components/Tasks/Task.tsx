import React, { useState } from 'react'
import { motion, usePresence } from 'framer-motion';
import moment from 'moment';
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
  const [isPresent, safeToRemove] = usePresence()

  const toogleImportant = () => {
    makeImportant(!Boolean(task.important))
  }

  const toogleFinished = () => {
    finished(!task.finished)
  }

  return (
    <motion.div 
      layout
      initial="out"
      animate={isPresent ? 'in' : 'out'}
      variants={{
        in: { x: 0, opacity: 1 },
        out: { x: 10, opacity: 0 }
      }}
      transition={{ duration: .25 }}
      onAnimationComplete={() =>  !isPresent && safeToRemove && safeToRemove()}
    >
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
    </motion.div>  
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

const Details = ({ show, task }: { show: boolean, task: ITask }) => {
  return (
    <motion.div
      initial="out"
      animate={show ? 'in' : 'out'}
      variants={{
        in: { height: 'auto' },
        out: { height: 0 }
      }}
      transition={{ duration: .25 }}
      style={{ overflow: 'hidden' }}
    >
      <StyledDetailsTask>
        <small>
          {showDateFormat(task.create_date, task.finished_date)}
        </small>
        { !task.finished && task.expiration_date && <small className="expired">Expires {moment(task.expiration_date).toNow()}</small> }
      </StyledDetailsTask>
    </motion.div>
  )
}

const Footer = ({ task }: { task: ITask }) => {

  const animations = {
    initial: 'hidden',
    animate: 'show',
    variants: {
      hidden: { x: 10 },
      show: { x: 0 }
    }
  }

  return (
    <StyledFooterTask>
      {
        task.folderId && task.folder && 
        <motion.span
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1 }
          }}
        >
          <IoFolderOutline style={{ marginRight: 5 }} />
          {task.folder.title}
        </motion.span>
      }
      {!task.finished && task.expiration_date && moment().isSameOrAfter(task.expiration_date) && <span className="warning">Expired</span>}
      {task.finished && (
        <motion.span {...animations} className="success">Finished</motion.span>
      )}
      {task.important && (
        <motion.span {...animations} className="info">Important</motion.span>
      )}
    </StyledFooterTask>
  )
}