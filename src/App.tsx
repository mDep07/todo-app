import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { IoMoon, IoSunny } from 'react-icons/io5';

import GlobalStyles from "./styles/GlobalStyles";
import { light, dark } from "./theme";
import Container from './styles/Container';

import TasksPage from './Pages/Tasks';

const StyledSwitchTheme = styled.button`
    border: none;
    padding: 2px;
    background-color: transparent;
    color: darkgray;
    font-size: 1.8rem;
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
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('mode');
    if(savedTheme) {
      setTheme(savedTheme)
    } else {
      const matchedDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if(matchedDarkTheme) {
        setTheme('dark')
      }
    }
  }, [])

  const themeToggler = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    localStorage.setItem('mode', theme === 'light' ? 'dark' : 'light')
  }

  const getTheme = () => theme === 'light' ? light : dark;

  return (
    <ThemeProvider theme={getTheme()}>
      <GlobalStyles/>
      <Container>
        <header style={{ padding: '1rem' }}>
          <StyledSwitchTheme title="Change theme mode" onClick={themeToggler}>
            { theme === 'light' ? <IoMoon /> : <IoSunny /> }
          </StyledSwitchTheme>
        </header>
        <div>
          <TasksPage />
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
