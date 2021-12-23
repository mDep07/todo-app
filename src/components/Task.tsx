import React from 'react';
import moment from 'moment';
import { IoClose, IoChevronDown, IoChevronUp } from "react-icons/io5";
import styled from 'styled-components';

import type { ITask } from '../interfaces/task';
import Button from './Button';

const StyledContainerTask = styled.li`
  list-style-type: none;
  padding: none;
  margin-bottom: 7px;
  border-radius: 10px;
  background-color: ${({theme }) => theme.backgroundColors.secondary};
  height: auto;
  transition: background-color .25s linear;

  &:not(.active):hover {
    box-shadow:  ${({ theme }) => theme.shades.md};
  }

  &.child {
    background-color: ${({ theme }) => theme.backgroundColors.main};
    &:hover {
      box-shadow: none;
      transform: scale(1.01);
    }
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

  @media(min-width: 500px) {
    & .section__actions:not(.active) > button {
      transition: opacity .25s ease-in-out;
      opacity: 0;
    }

    &:hover .section__actions > button {
      opacity: 1;
    }
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
  color: ${({ theme }) => theme.text.main};
  font-weight: 500;
  ${({ finished, theme }) => finished ? `text-decoration:line-through;color:${theme.text.secondary}` : ''}
`;

const StyledDetails = styled.div`
  padding: 0 20px;
  & p {
    color: ${({ theme }) => theme.text.secondary};
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
            <Button icon onClick={() => toggleActive(task.id)}>
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
            <div className={`section__actions ${isActive ? 'active' : ''}`}>
              <Button icon disabled={disabled} color="danger" onClick={() => remove(task.id)}>
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