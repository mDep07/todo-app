import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from 'styled-components';

import GlobalStyles from "./styles/GlobalStyles";
import { light, dark } from "./theme";
import Container from './styles/Container';

import Navbar from './components/Nav';
import TasksPage from './Pages/Tasks';
import FoldersPage from './Pages/Folders';
import TagsPage from './Pages/Tags';

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

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    localStorage.setItem('mode', theme === 'light' ? 'dark' : 'light')
  }

  const getTheme = () => theme === 'light' ? light : dark;

  return (
    <ThemeProvider theme={getTheme()}>
      <GlobalStyles/>
      <Container>
        <header style={{ padding: '1rem' }}>
          <Navbar {...{ theme, toggleTheme }} />
        </header>
        <Routes>
          <Route path="tasks" element={<TasksPage />}>
            <Route path="folder/:folderId" element={<TasksPage />} />
          </Route>
          <Route path="folders" element={<FoldersPage />} />
          <Route path="tags" element={<TagsPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
