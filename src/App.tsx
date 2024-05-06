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
    <Router>
      <Routes>
        <Route path="/" element={
          <ThemeWrapper darkMode={darkMode}>
            <Header></Header>
            <Home reload={reload} />
          </ThemeWrapper>} />
        <Route path="/basic-questions" element={<BasicQuestionsPage setReload={setReload} />} />
        <Route path="/detailed-questions" element={<DetailedQuestionsPage setReload={setReload} />} />
      </Routes>
    </Router>
  );
}

export default App;