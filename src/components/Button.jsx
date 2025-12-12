const Button = ({onClick, children}) => {
  return (
    <button  
      className="dm-sans-regular flex items-center cursor-pointer justify-between gap-2 py-2.5 px-4 rounded-md bg-transparent-bg hover:bg-transparent-bg-hover transition-colors focus:outline-none focus:ring-2 focus:ring-lightblue" 
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
