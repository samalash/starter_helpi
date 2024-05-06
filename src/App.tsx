import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import BasicQuestionsPage from './pages/basic-questions';
import DetailedQuestionsPage from './pages/detailed-questions';
import { useEffect, useState } from 'react';
import ThemeWrapper from './components/ThemWrapper';
import Header from './components/Header';


function App() {
  const [reload, setReload] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(localStorage?.theme === 'dark' ? true : false);

  useEffect(() => {
  localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className='App'>
      <Header setDarkMode={setDarkMode} darkMode={darkMode} />
        <ThemeWrapper darkMode={darkMode}>
          <Router>
            <Routes>
              <Route path="/" element={
                  <Home reload={reload} darkMode={darkMode} />
                } />
              <Route path="/basic-questions" element={
                  <BasicQuestionsPage setReload={setReload} darkMode={darkMode} />
              } />
              <Route path="/detailed-questions" element={
                  <DetailedQuestionsPage setReload={setReload} darkMode={darkMode} />
              } />
            </Routes>
          </Router>
        </ThemeWrapper>
    </div>
  );
}

export default App;