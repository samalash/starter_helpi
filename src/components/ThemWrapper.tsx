const ThemeWrapper = ({ darkMode, children }: { darkMode:boolean, children: React.ReactNode }) => {
  return (
    <span className={`${darkMode && "dark"} dark:bg-slate-900`}>{children}</span>
  )
}

export default ThemeWrapper;
