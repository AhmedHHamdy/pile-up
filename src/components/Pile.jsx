import pileIcon  from "../assets/Icon.png"
import { Link } from "react-router-dom"

export default function Pile() {
  return (
    <div className="pile-container">
      <div>
        <img src={pileIcon} alt="" />
        <div className="pile-info">
          <h3>My Pile 01</h3>
          <h4>Updated 08/06/2023</h4>
          <h4>Collected: EGP 2550.00</h4>
        </div>
        <Link to="pileview">Participate</Link>
      </div>
    </div>
  )
}