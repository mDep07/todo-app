import React, { useState } from "react";
import moment from "moment";
import {
  IoClose,
  IoChevronDown,
  IoChevronUp,
  IoCheckmark,
} from "react-icons/io5";
import styled from "styled-components";

import type { ITask } from "../interfaces/task";
import Button from "./Button";

const StyledContainerTask = styled.li`
  list-style-type: none;
  padding: none;
  margin-bottom: 7px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.backgroundColors.secondary};
  height: auto;
  transition: background-color 0.25s linear;

  &:not(.active):hover {
    box-shadow: ${({ theme }) => theme.shades.md};
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

  @media (min-width: 500px) {
    & .section__actions:not(.active) > button {
      transition: opacity 0.25s ease-in-out;
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
    transform: scale(0.95);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const StyledTitle = styled.h3<{ finished: boolean }>`
  font-size: 0.9rem;
  margin: 0;
  color: ${({ theme }) => theme.text.main};
  font-weight: 500;
  ${({ finished, theme }) =>
    finished
      ? `text-decoration:line-through;color:${theme.text.secondary}`
      : ""}
`;

const StyledDetails = styled.div`
  padding: 0 20px;
  & p {
    color: ${({ theme }) => theme.text.secondary};
    font-size: small;
    margin: 0;
  }
`;

const StyledBadge = styled.span<{ color?: 'main' }>`
  display: inline-block;
  background-color: ${({ color, theme }) =>
    !color ? theme.colors.info : theme.colors[color]};
  border-radius: 1000px;
  color: white;
  padding: 0 6px;
  font-size: 0.7rem;
  font-weight: 700;
`;

type Params = {
  task: ITask;
  finish: (taskId: string, finished: boolean) => void;
  remove: (taskId: string) => void;
  subtasks?: ITask[];
  isActive?: boolean;
  toggleActive?: (taskId: string) => void;
  isChild?: boolean;
  disabled?: boolean;
  state?: 'pending' | 'today';
  children?: JSX.Element[] | JSX.Element | null;
};
export default function Task({
  task,
  finish,
  remove,
  subtasks,
  isActive,
  toggleActive,
  isChild,
  disabled,
  children,
  state
}: Params) {

  const [showConfirmRemove, setShowConfirmRemove] = useState(false)

  const ToggleActiveTask = () => {
    if (!toggleActive) return null;

    return (
      <Button onClick={() => toggleActive(task.id)}>
        {isActive ? <IoChevronUp /> : <IoChevronDown />}
      </Button>
    );
  };

  const CountSubTasks = () => {
    if (!subtasks) return null;

    const finished = subtasks.filter((t) => t.finished).length;
    const total = subtasks.length;

    const StyledCount = styled.small<{
      completed?: boolean;
      almost?: boolean;
    }>`
      display: inline-block;
      margin: 5px;
      font-weight: 500;
      color: ${({ completed, almost, theme }) =>
        completed
          ? theme.colors.success
          : almost
          ? theme.colors.warning
          : theme.text.secondary};
    `;

    if (finished === total && total > 0) {
      return (
        <StyledCount completed>
          {finished}/{total} ✅ Good work!
        </StyledCount>
      );
    }

    if (finished >= total / 2 && total > 0) {
      return (
        <StyledCount almost>
          {finished}/{total} 🎉 Keep going!
        </StyledCount>
      );
    }

    return (
      <StyledCount>
        {finished}/{total}
      </StyledCount>
    );
  };

  return (
    <StyledContainerTask 
      key={task.id} 
      className={isChild ? "child" : ""}
      onMouseLeave={() => setShowConfirmRemove(false)} 
    >
      <StyledTask>
        <div className="section__check">
          <StyledInput
            disabled={disabled}
            type="checkbox"
            onChange={(e) => finish(task.id, e.target.checked)}
            checked={task.finished}
          />
        </div>
        <div className="section__body">
          <StyledTitle finished={task.finished}>{task.title}</StyledTitle>
          {task.important && <StyledBadge>Important</StyledBadge>}
          {state === 'pending' && <StyledBadge color="main">{moment(task.create_date).format('LLL')}</StyledBadge>}
        </div>
        <div className={`section__actions ${isActive ? "active" : ""}`}>
          {
            !showConfirmRemove 
            ? <Button
                disabled={disabled}
                color="danger"
                onClick={() => setShowConfirmRemove(true)}
              >
                <IoClose />
              </Button>
            : <Button
                color="main"
                title="Confirm"
                onClick={() => {
                  setShowConfirmRemove(false)
                  remove(task.id);
                }}
              >
                <IoCheckmark />
              </Button>
          }
          
          <ToggleActiveTask />
        </div>
      </StyledTask>
      {isActive && (
        <React.Fragment>
          {!isChild && (
            <StyledDetails>
              <p>{moment(task.create_date).format("lll")}</p>
              {task.finished_date && (
                <p>{moment(task.finished_date).fromNow()}</p>
              )}
            </StyledDetails>
          )}
          <div style={{ padding: 10 }}>
            {children}
            <CountSubTasks />
            {subtasks?.map((t) => (
              <Task
                key={t.id}
                task={t}
                finish={finish}
                remove={remove}
                isChild
                disabled={task.finished}
              />
            ))}
          </div>
        </React.Fragment>
      )}
    </StyledContainerTask>
  );
}
