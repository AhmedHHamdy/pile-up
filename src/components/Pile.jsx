import axios from "axios"
import pileIcon  from "../assets/Icon.png"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function Pile(props) {

  const { t } = useTranslation()

  function handleLinkClick(event) {
    event.preventDefault()
  }

  function handleDelete() {
    const value = prompt("Are you sure you want to delete this pile? (Yes, No)", "Yes")
    if (value.toLowerCase() == "yes") {
      axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/piles/delete-pile`, {pile_id: props.id})
      .then(res => {
        console.log(res)
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      return
    }

  }

  // console.log(props)
  return (
    <div className="pile-container">
      <div>
        <img src={props.image} alt="Pile-Image" />
        <div className="pile-info">
          <h3>{props.name} {props.status == "closed" ? `- “${props.status}”` : ''}</h3>
          <h4 className="updated-data">Updated: <span className="updated-data-span">{props.updated}</span></h4>
          <h4 className="collected-data">{t("Collected")}: <span className="collected-data-total"> {props.collected} {t("EGP")}</span></h4>
        </div>

        <div className="pile-buttons">
          <Link onContextMenu={handleLinkClick} state={{id: props.folderId, status: props.status}} to={`pileview/${props.id}`}>{t("Participate")}</Link>
          <button onContextMenu={handleLinkClick} onClick={handleDelete}>{t("Delete")}</button>
        </div>
      </div>
    </div>
  )
}