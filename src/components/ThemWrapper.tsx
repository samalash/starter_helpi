import { useEffect, useState } from "react";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
    const [darkMode, setDarkMode] = useState<boolean>(localStorage?.theme === 'dark' ? true : false);

  useEffect(() => {
  localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);
  return (
    <span className={`${darkMode && "dark"} dark:bg-slate-900`}>{children}</span>
  )
}

export default ThemeWrapper;
