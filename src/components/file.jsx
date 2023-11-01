import { useRef, useState } from "react"
import "../App.css"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import Menu from "./menu/Menu"
import MenuButton from "./menu/MenuButton"
import MenuDropdown from "./menu/MenuDropdown"
import MenuItem from "./menu/MenuItem"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function File(props) {

  const navigate = useNavigate()

  console.log(props)
  function handleDelete() {
    axios.post("https://main.mahmoud.social/api/v1/folders/delete-folder", {'folder_id': props.id})
          .then(res => console.log(res))
          .catch(err => {
            console.log(err)
            window.location.reload()
          })
  }

  return (
    <div className={`folder  ${props.styling}`} onClick={props.onclick}>
      <h2>{props.name}</h2>
      <Menu>
        <MenuButton><BiDotsHorizontalRounded /></MenuButton>
        <MenuDropdown>
          <MenuItem>
            <button>Edit</button>
          </MenuItem>

          <MenuItem>
            <button onClick={handleDelete}>Delete</button>
          </MenuItem>
        </MenuDropdown>
      </Menu>
    </div>
  )
}