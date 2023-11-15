import "../../App.css"
import { createContext, useEffect, useRef, useState } from "react"

const MenuContext = createContext()

export default function Menu({ children }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("click", handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  function toggle() {
    setOpen(prevOpen => !prevOpen)
  }

  return (
    <MenuContext.Provider value={{open, toggle}}>
    <div className="menu" ref={menuRef}>
      {children}
    </div>
    </MenuContext.Provider>
  )
}

export {MenuContext}