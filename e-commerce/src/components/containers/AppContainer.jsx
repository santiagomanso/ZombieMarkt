const AppContainer = ({ children }) => {
  return (
    <div className='app-container h-screen bg-gradient-to-br from-amber-100 to-slate-900'>
      {children}
    </div>
  )
}

export default AppContainer
