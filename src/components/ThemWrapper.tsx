const ThemeWrapper = ({ darkMode, children }: { darkMode:boolean, children: React.ReactNode }) => {
  return (
    <body className={`${darkMode && "dark"}`}>
    <div className="bg-white dark:bg-slate-900 text-black dark:text-white">
      {children}
    </div>
    </body>
  )
}

export default ThemeWrapper;
