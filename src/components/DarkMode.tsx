import { useEffect, useState } from "react";

const DarkMode = () => {
    const [darkMode, setDarkMode] = useState<boolean>(localStorage?.theme === 'dark' ? true : false);

  useEffect(() => {
  localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);
  return (
    <div></div>
  )
}

export default DarkMode;
