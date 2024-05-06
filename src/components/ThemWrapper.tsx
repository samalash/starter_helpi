const ThemeWrapper = ({ darkMode, children }: { darkMode:boolean, children: React.ReactNode }) => {
  return (
    <div className={darkMode ? "bg-slate-900 text-white" : "bg-white text-black"}>
      {
      // SVG from Vecteezy: https://www.vecteezy.com/vector-art/2037924-abstract-blue-background-with-beautiful-fluid-shapes
      // For some reason I can only reference public assets only locally, so I had to use a URL. Very strange behavior
      // but it probably has to do with the way cra with hash router works on gh pages. Not the first thing to break because of it.
      }
      <div className="App bg-fixed bg-cover" style={{ backgroundImage: `url('https://samalash.github.io/starter_helpi/abstrack_backhround_blue_.svg')` }}>
        {children}
      </div>
    </div>
  )
}

export default ThemeWrapper;
