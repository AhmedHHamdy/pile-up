import pileIcon  from "../assets/Icon.png"

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
        <a href="">Participate</a>
      </div>
    </div>
  )
}