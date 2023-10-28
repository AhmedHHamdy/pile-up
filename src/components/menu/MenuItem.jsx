import "../../App.css"
import { useContext, useState } from "react"

export default function MenuItem({ children, handleDelete }) {
  
  return (
    <div>
      <button onClick={handleDelete} >{ children }</button>
    </div>
  )
}