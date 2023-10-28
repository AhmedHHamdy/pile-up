import "../../App.css"
import { useContext, useState } from "react"
import { MenuContext } from "./Menu"

export default function MenuDropdown({ children }) {
  const { open } = useContext(MenuContext)

  return open ? (
      <div className="menu-container">
        {children}
      </div>
    ) : null
}