const ThemeWrapper = ({ darkMode, children }: { darkMode:boolean, children: React.ReactNode }) => {
  return (
    <div className={darkMode ? "bg-slate-900 text-white" : "bg-white text-black"}>
      {children}
    </div>
  )
}

export default ThemeWrapper;
