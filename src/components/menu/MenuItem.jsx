import "../../App.css"
import { useContext, useState } from "react"

export default function MenuItem({ children }) {
  
  return (
    <div className="menu-options">
      {children}
    </div>
  )
}