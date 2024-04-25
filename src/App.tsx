import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import BasicQuestionsPage from './pages/basic-questions';
import DetailedQuestionsPage from './pages/detailed-questions';
import './App.css';
import { useState } from 'react';


function App() {
  const [reload, setReload] = useState<boolean>(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home reload={reload} />} />
        <Route path="/basic-questions" element={<BasicQuestionsPage setReload={setReload} />} />
        <Route path="/detailed-questions" element={<DetailedQuestionsPage setReload={setReload} />} />
      </Routes>
    </Router>
  );
}

export default App;