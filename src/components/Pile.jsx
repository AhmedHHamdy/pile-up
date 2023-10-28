import pileIcon  from "../assets/Icon.png"
import { Link } from "react-router-dom"

export default function Pile(props) {
  return (
    <div className="pile-container">
      <div>
        <img src={pileIcon} alt="Pile-Image" />
        <div className="pile-info">
          <h3>{props.name}</h3>
          <h4>{props.updated}</h4>
          <h4>Collected: {props.total}</h4>
        </div>
        <Link to="pileview">Participate</Link>
      </div>
    </div>
  )
}