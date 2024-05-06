import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import BasicQuestionsPage from './pages/basic-questions';
import DetailedQuestionsPage from './pages/detailed-questions';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    <ThemeWrapper darkMode={darkMode}>
      <Router>
        <Routes>
          <Route path="/" element={
            <div>
              <Header></Header>
              <Home reload={reload} />
            </div>
            } />
          <Route path="/basic-questions" element={
            <div>
              <Header></Header>
              <BasicQuestionsPage setReload={setReload} />
            </div>
          } />
          <Route path="/detailed-questions" element={
            <div>
              <Header></Header>
              <DetailedQuestionsPage setReload={setReload} />
            </div>
          } />
        </Routes>
      </Router>
    </ThemeWrapper>
  );
}

export default App;