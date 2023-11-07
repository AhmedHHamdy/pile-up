import { Outlet, NavLink } from "react-router-dom"
import collections from "../assets/collections-icon 1.png"
import history from "../assets/history-icon.png"
import managers from "../assets/managers-icon.png"
import reports from "../assets/reports-icon.png"
import address from "../assets/address-book-icon 1.png"
import orders from "../assets/order.png"
import { FaUserCircle } from "react-icons/fa"
import { RiContactsBook2Line } from "react-icons/ri"
import "../App.css"

export default function SideNav() {
  const activeStyle = {
    background: "#008A78"
  }
  
  return (
    <div className="side-navigation">
      <nav>
        <NavLink className="sideNav-links" style={({isActive}) => isActive ? activeStyle : null} end to="./folders"><img src={collections} alt="collections-icon" /></NavLink>
        <NavLink className="sideNav-links" style={({isActive}) => isActive ? activeStyle : null} to="orders">
          <svg className="order-SVG" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 256 256" enableBackground="new 0 0 256 256" xmlSpace="preserve">
          <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
          <g><g><path fill="#fffff" d="M171.5,70.6H84.5c-3.8,0-7.2,3.4-7.2,7.2c0,3.8,3.4,7.2,7.2,7.2h87.3c3.8,0,7.3-3.4,7.3-7.2C179.1,74.1,175.6,70.6,171.5,70.6z"/><path fill="#ffffff" d="M171.5,111.4H84.5c-3.8,0-7.2,3.4-7.2,7.2c0,3.8,3.4,7.2,7.2,7.2h87.3c3.8,0,7.3-3.4,7.3-7.2C179.1,114.8,175.6,111.4,171.5,111.4z"/><path fill="#fffff" d="M171.5,152.6H84.5c-3.8,0-7.2,3.4-7.2,7.2c0,3.8,3.4,7.2,7.2,7.2h87.3c3.8,0,7.3-3.4,7.3-7.2C179.1,156,175.6,152.6,171.5,152.6z"/><path fill="#fffff" d="M204.6,10H51.4c-12.2,0-22.1,10.3-22.1,22.9v205.9c0,2.7,1.5,5.3,3.8,6.5c2.3,1.1,5.3,1.1,7.6-0.8l18.7-13.7l18.7,13.7c2.7,1.9,6.1,1.9,8.4,0l18.7-13.7l18.7,13.7c2.7,1.9,6.1,1.9,8.4,0l18.7-13.7l18.7,13.7c2.7,1.9,6.1,1.9,8.4,0l18.7-13.7l18.7,13.7c1.2,0.8,2.7,1.5,4.2,1.5c1.2,0,2.3-0.4,3.4-0.8c2.3-1.2,3.8-3.8,3.8-6.5V32.5C226.7,20.3,216.8,10,204.6,10z M212.3,224.3l-11.4-8.4c-2.7-1.9-6.1-1.9-8.4,0l-18.7,13.7l-18.7-13.7c-1.1-0.8-2.7-1.5-4.2-1.5c-1.5,0-3.1,0.4-4.2,1.5L128,229.6l-18.7-13.7c-2.7-1.9-6.1-1.9-8.4,0l-18.7,13.7l-18.7-13.7c-2.7-1.9-6.1-1.9-8.4,0l-11.4,8.4V32.5c0-4.6,3.4-8.4,7.6-8.4h153.3c4.2,0,7.6,3.8,7.6,8.4V224.3L212.3,224.3z"/></g></g>
          </svg>
        </NavLink>
        <NavLink className="sideNav-links" style={({isActive}) => isActive ? activeStyle : null} to="contacts"><img src={address} alt="address" /></NavLink>
        <NavLink className="sideNav-links" style={({isActive}) => isActive ? activeStyle : null} to="../profile"><FaUserCircle className="user-profile" /></NavLink>
        {/* <NavLink className="sideNav-links" style={({isActive}) => isActive ? activeStyle : null} to="addressBook"><img src={address} alt="address" /></NavLink> */}
      </nav>
      <Outlet className="view-section" />
    </div>
  )
}