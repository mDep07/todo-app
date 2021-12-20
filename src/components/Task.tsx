import React from 'react';
import moment from 'moment';
import { IoClose, IoChevronDown, IoChevronUp } from "react-icons/io5";
import styled from 'styled-components';

import type { ITask } from '../App';
import Button from './Button';
import type { Theme } from './Themes';

const StyledContainerTask = styled.li`
  list-style-type: none;
  padding: none;
  margin-bottom: 7px;
  border-radius: 10px;
  background-color: ${({ theme }: { theme: Theme }) => theme.backgrounColorSecondary};
  transition: all .5s linear;
  &:not(.active):hover {
    box-shadow:  ${({ theme }: { theme: Theme }) => theme.principalShadow};
  }

  &.child {
    background-color: ${({ theme }: { theme: Theme }) => theme.body};
  }
`;

const StyledTask = styled.div`
  display: flex;
  padding: 4px;
  & .section__check {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & .section__body {
    flex: 7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  & .section__actions {
    flex: 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const StyledInput = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(.95);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const StyledTitle = styled.h3<{ finished: boolean }>`
  font-size: .9rem;
  margin: 0;
  color: ${({ theme }: { theme: Theme }) => theme.text};
  font-weight: 500;
  ${({finished}) => finished ? 'text-decoration:line-through;color:#7c7c7c' : ''}
`;

const StyledDetails = styled.div`
  padding: 0 20px;
  & p {
    color: #7c7c7c;
    font-size: small;
    margin: 0;
  }
`;

type Params = { 
    task: ITask, 
    isActive?: boolean,
    toggleActive?: (taskId: string) => void,
    finish: (taskId: string) => void,
    remove: (taskId: string) => void,
    isChild?: boolean,
    disabled?: boolean,
    children?: JSX.Element[] | JSX.Element | null
    
};
export default function Task({ task, isActive, toggleActive, finish, remove, isChild, disabled, children }: Params) {

    const ToggleActiveTask = () => {
        if(!toggleActive) return null;
        
        return (
            <Button color="189, 189, 189" onClick={() => toggleActive(task.id)}>
                {isActive ? <IoChevronUp /> : <IoChevronDown /> }
            </Button>
        )
    }

    return (
      <StyledContainerTask key={task.id} className={isChild ? 'child' : ''}>
          <StyledTask>
            <div className="section__check">
              <StyledInput 
                disabled={disabled} 
                type="checkbox" 
                onChange={() => finish(task.id)} 
                checked={task.finished} 
              />
            </div>
            <div className="section__body">
                <StyledTitle finished={task.finished}>{task.title}</StyledTitle>
            </div>
            <div className="section__actions">
              <Button disabled={disabled} color="245, 66, 93" onClick={() => remove(task.id)}>
                <IoClose />
              </Button>
              <ToggleActiveTask />
            </div>
          </StyledTask>
          {
            isActive &&
            <React.Fragment>
              {
                !isChild && 
                <StyledDetails>
                  <p>{moment(task.create_date).format('lll')}</p>
                  {task.finished_date && <p>{moment(task.finished_date).fromNow()}</p>}
                </StyledDetails>
              }
              {children}
            </React.Fragment>
          }
      </StyledContainerTask>
    )
}