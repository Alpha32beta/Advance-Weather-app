
const Button = ({onClick, children}) => {
  return (
    <button  className="dm-sans-regular w-full flex items-center cursor-pointer justify-between gap-2 py-2.5 px-4 rounded-md bg-transparent-bg focus:border" onClick={onClick}>
        {children}
    </button>
  )
}

export default Button