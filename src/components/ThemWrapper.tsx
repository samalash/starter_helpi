const ThemeWrapper = ({ darkMode, children }: { darkMode:boolean, children: React.ReactNode }) => {
  return (
    <body className={`${darkMode && "dark"}`}>
    <div className={darkMode ? "bg-slate-900 text-white" : "bg-white text-black"}>
      {children}
    </div>
    </body>
  )
}

export default ThemeWrapper;
