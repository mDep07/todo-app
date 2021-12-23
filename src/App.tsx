import React, { useReducer, Reducer, useState } from 'react';
//import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import styled, { ThemeProvider } from 'styled-components';
import { IoMoon, IoSunny } from 'react-icons/io5';

import { GlobalStyles } from "./components/GlobalStyles";
import { light, dark } from "./theme";

import type { ITask } from './interfaces/task';

import Tasks from './components/Tasks';
import moment from 'moment';


const listTasks: ITask[] = [
  { id: uuidv4(), title: 'task 1', create_date: moment().subtract(1,'days').format(), finished: false },
  { id: uuidv4(), title: 'task 2', create_date: moment().subtract(1,'days').format(), finished: false },
  { id: uuidv4(), title: 'task 3', create_date: moment().subtract(1,'days').format(), finished: false },
  { id: uuidv4(), title: 'sub task 1 - 1', create_date: moment().subtract(1,'days').format(), finished: false },
  { id: uuidv4(), title: 'sub task 2 - 1', create_date: moment().subtract(1,'days').format(), finished: false, },
]

type TState = { tasks: ITask[] };
type TAction = { type: 'add', payload: ITask } | { type: 'remove', payload: string } | { type: 'finish', payload: string };

const reducer: Reducer<TState, TAction> = (state, action): TState => {
  const { type, payload } = action;

  switch(type) {
    case 'add': {
      const { tasks } = state;
      const task = payload;
      if(typeof task === 'string') return state;

      console.log({task})
      
      const newTask: ITask = { 
        id: uuidv4(), 
        title: task.title, 
        create_date: task.create_date, 
        finished: false, 
        task_id: task.task_id 
      };
      return {
        ...state,
        tasks: [...tasks, {...newTask}]
      }
    }
    case 'remove': {
      const { tasks } = state;
      const taskId = payload;
      if(typeof taskId !== 'string') return state;

      const removeTasks = tasks.filter(t => t.task_id === taskId || t.id === taskId).map(t => t.id);

      return {
        ...state,
        tasks: [...tasks.filter(t => !removeTasks.includes(t.id))]
      };
    }
    case 'finish': {
      const { tasks } = state;
      const taskId = payload;
      if(typeof taskId !== 'string') return state;

      const taskIndex = tasks.findIndex(t => t.id === taskId);
      const task = tasks.find(t => t.id === taskId);

      if(!task) return state;

      if(!task.finished) {
        const finishedTasks = tasks.filter(t => t.task_id === taskId || t.id === taskId).map(t => t.id);
        return {
          ...state,
          tasks: tasks.map(task => {
            if(finishedTasks.includes(task.id)) {
              task.finished = true;
              task.finished_date = moment().format();
            }

            return task;
          })
        };
      }

      return {
        ...state,
        tasks: [
          ...tasks.slice(0, taskIndex), 
          {...task, finished: !task.finished, finished_date: !task.finished ? moment().format() : '' }, 
          ...tasks.slice(taskIndex + 1)
        ]
      };
    }
  }
}

const StyledContainer = styled.main`
  background-color: ${({ theme }) => theme.backgroundColors.main};
  padding: 1rem;
  max-width: 550px;
  min-height: calc(100vh - 2rem);
  margin: 0 auto;
  overflow-y: auto;
`;

const StyledSwitchTheme = styled.button`
    border: none;
    padding: 4px;
    background-color: transparent;
    color: darkgray;
    font-size: 2rem;
    display: flex;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
    }
    &:active {
      transform: scale(.95);
    }
`;

function App() {

  const [state, dispatch] = useReducer(reducer, { tasks: listTasks });
  
  const [theme, setTheme] = useState(localStorage.getItem('mode') || 'light');
  const themeToggler = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    localStorage.setItem('mode', theme === 'light' ? 'dark' : 'light')
  }

  const getTheme = () => theme === 'light' ? light : dark;

  return (
    <ThemeProvider theme={getTheme()}>
      <GlobalStyles/>
      <StyledContainer>
        <StyledSwitchTheme title="Change theme mode" onClick={themeToggler}>
          { theme === 'light' ? <IoMoon /> : <IoSunny /> }
        </StyledSwitchTheme>
        <h1>Todo App</h1>
        <Tasks 
          tasks={state.tasks} 
          create={(task: ITask) => dispatch({ type: 'add', payload: task })}
          finish={(taskId: string) => dispatch({ type: 'finish', payload: taskId })}
          remove={(taskId: string) => dispatch({ type: 'remove', payload: taskId })}
        />
      </StyledContainer>
    </ThemeProvider>
  );
}

export default App;
