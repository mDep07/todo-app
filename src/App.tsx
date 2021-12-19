import React, { useReducer, Reducer, useState } from 'react';
//import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes"

import Tasks from './components/Tasks';

export interface ITask {
  id: string;
  title: string;
  create_date: string;
  finish: boolean;
  task_id?: string;
}

const listTasks: ITask[] = [
  { id: uuidv4(), title: 'task 1', create_date: '2021-12-18', finish: false },
  { id: uuidv4(), title: 'task 2', create_date: '2021-12-18', finish: false },
  { id: uuidv4(), title: 'task 3', create_date: '2021-12-18', finish: false },
  { id: uuidv4(), title: 'sub task 1 - 1', create_date: '2021-12-18', finish: false },
  { id: uuidv4(), title: 'sub task 2 - 1', create_date: '2021-12-18', finish: false, },
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
        finish: false, 
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

      return {
        ...state,
        tasks: [...tasks.filter(t => t.id !== taskId)]
      };
    }
    case 'finish': {
      const { tasks } = state;
      const taskId = payload;
      if(typeof taskId !== 'string') return state;

      const taskIndex = tasks.findIndex(t => t.id === taskId);
      const task = tasks.find(t => t.id === taskId);

      if(!task) return state;
      // if(!task.finish) {
      //   const tasksChildren = tasks.filter(t => t.task_id === task.id);
      //   if(tasksChildren.length > 0) tasksChildren.forEach(taskChild => handleFinishTask(taskChild.id))
      // }

      return {
        ...state,
        tasks: [
          ...tasks.slice(0, taskIndex), 
          {...task, finish: !task.finish }, 
          ...tasks.slice(taskIndex + 1)
        ]
      };
    }
  }
}

const StyledContainer = styled.main`
  padding: 1rem;
`;

function App() {

  const [state, dispatch] = useReducer(reducer, { tasks: listTasks });
  
  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles/>
      <StyledContainer>
        <button onClick={themeToggler}>Switch Theme</button>
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
