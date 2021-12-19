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
  background-color: ${({ theme }: { theme: Theme }) => theme.cardBgColor};
  border-radius: 10px;
  transition: all .5s linear;
  &:not(.active):hover {
    box-shadow:  ${({ theme }: { theme: Theme }) => theme.shadow};
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
`;

const StyledTitle = styled.h3`
  font-size: 1rem;
  margin: 0;
  color: ${({ theme }: { theme: Theme }) => theme.text};
`;

const StyledDetails = styled.div`
  & small {
    color: #7c7c7c
  }
`;

type Params = { 
    task: ITask, 
    isActive?: boolean,
    toggleActive?: (taskId: string) => void,
    finish: (taskId: string) => void,
    remove: (taskId: string) => void,
    children?: JSX.Element[] | JSX.Element | null
    
};
export default function Task({ task, isActive, toggleActive, finish, remove, children }: Params) {

    const ToggleActiveTask = () => {
        if(!toggleActive) return null;
        
        return (
            <Button color="189, 189, 189" onClick={() => toggleActive(task.id)}>
                {isActive ? <IoChevronUp /> : <IoChevronDown /> }
            </Button>
        )
    }
    return (
      <StyledContainerTask key={task.id}>
          <StyledTask>
            <div className="section__check">
              <StyledInput type="checkbox" onChange={() => finish(task.id)} checked={task.finish} />
            </div>
            <div className="section__body">
                <StyledTitle>{task.title}</StyledTitle>
                <StyledDetails>
                  <small>Created: {moment(task.create_date).format('LLL')}</small>
                </StyledDetails>
            </div>
            <div className="section__actions">
              <Button color="245, 66, 93" onClick={() => remove(task.id)}><IoClose /></Button>
              <ToggleActiveTask />
            </div>
          </StyledTask>
          {isActive && children}
      </StyledContainerTask>
    )
}