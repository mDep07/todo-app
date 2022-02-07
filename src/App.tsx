import React, { useReducer, Reducer, useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { IoMoon, IoSunny } from 'react-icons/io5';

import { GlobalStyles } from "./components/GlobalStyles";
import { light, dark } from "./theme";

import type { ITask } from './interfaces/task';

import Tasks from './components/Tasks';
import { orderTasks } from './utils/orderTasks';
import TasksService from './services/tasks';
const { getTasks, addTask, removeTask, updateTask } = TasksService();

type TState = { tasks: ITask[] };
type TAction =  { type: 'add', payload: ITask } | 
                { type: 'remove', payload: string } | 
                { type: 'finish', payload: { taskId: string, finished: boolean } };

const reducer: Reducer<TState, TAction> = (state, action): TState => {
  const { type, payload } = action;

  switch(type) {
    case 'add': {
      const { tasks } = state;
      const task = payload as ITask;
      // if(typeof task === 'string') return state;
      
      const newTask: ITask = addTask(task);
      const orderedTasks = orderTasks([...tasks, {...newTask}]);

      return {
        ...state,
        tasks: orderedTasks
      }
    }
    case 'remove': {
      const { tasks } = state;
      const taskId = payload as string;
      // if(typeof taskId !== 'string') return state;

      const removeTasks = removeTask(taskId);

      return {
        ...state,
        tasks: [...tasks.filter(t => !removeTasks.includes(t.id))]
      };
    }
    case 'finish': {
      const { taskId, finished } = payload as { taskId: string, finished: boolean };
      // if(typeof taskId !== 'string') return state;
      
      const tasksWithUpdated = updateTask(taskId, { finished });

      return {
        ...state,
        tasks: tasksWithUpdated
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
  position: relative;
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

  const [state, dispatch] = useReducer(reducer, { tasks: getTasks() });
  const [theme, setTheme] = useState(localStorage.getItem('mode') || 'light');
  
  useEffect(() => {
    console.log('App')
  }, [])

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
          finish={(taskId: string, finished: boolean) => dispatch({ type: 'finish', payload: { taskId, finished } })}
          remove={(taskId: string) => dispatch({ type: 'remove', payload: taskId })}
        />
      </StyledContainer>
    </ThemeProvider>
  );
}

export default App;
