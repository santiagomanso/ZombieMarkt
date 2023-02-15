const FloatingMsg = ({ msg, opt, icon, text }) => {
  return (
    <div className={`absolute ${opt}`}>
      <span className={`${text}`}>{msg}</span>
      <i className={`${icon}`}></i>
    </div>
  )
}

export default FloatingMsg
