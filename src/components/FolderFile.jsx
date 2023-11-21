import { useRef, useState } from "react"
import "../App.css"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import Menu from "./menu/Menu"
import MenuButton from "./menu/MenuButton"
import MenuDropdown from "./menu/MenuDropdown"
import MenuItem from "./menu/MenuItem"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function FolderFile(props) {

  const { t } = useTranslation()

  const [successStatus, setSuccessStatus] = useState(false)

  const navigate = useNavigate()

  function handleDelete() {
    axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/folders/delete-folder`, {'folder_id': props.id})
          .then(res => {
            console.log(res)
            window.location.reload()
            setSuccessStatus(true)
          })
          .catch(err => {
            console.log(err)
          })
          .finally(
            setSuccessStatus(false)
          )
  }

  return (
    <div className={`folder  ${props.styling}`} onClick={props.onclick}>
      <h2>{props.name}</h2>
      <Menu>
        <MenuButton><BiDotsHorizontalRounded /></MenuButton>
        <MenuDropdown>
          {/* <MenuItem>
            <button>Edit</button>
          </MenuItem> */}

          <MenuItem>
            <button onClick={handleDelete}>{t("Delete")}</button>
          </MenuItem>
        </MenuDropdown>
      </Menu>
    </div>
  )
}
