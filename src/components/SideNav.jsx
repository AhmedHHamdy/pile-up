import { Outlet, NavLink } from "react-router-dom"
import collections from "../assets/collections-icon 1.png"
import history from "../assets/history-icon.png"
import managers from "../assets/managers-icon.png"
import reports from "../assets/reports-icon.png"
import address from "../assets/address-book-icon 1.png"

import "../App.css"

export default function SideNav() {
  const activeStyle = {
    background: "#008A78"
  }
  
  return (
    <div className="side-navigation">
      <nav>
        <NavLink className="sideNav-links" style={({isActive}) => isActive ? activeStyle : null} end to="."><img src={collections} alt="collections-icon" /></NavLink>
        <NavLink className="sideNav-links" style={({isActive}) => isActive ? activeStyle : null} to="history"><img src={history} alt="history" /></NavLink>
        <NavLink className="sideNav-links" style={({isActive}) => isActive ? activeStyle : null} to="managers"><img src={managers} alt="managers" /></NavLink>
        <NavLink className="sideNav-links" style={({isActive}) => isActive ? activeStyle : null} to="reports"><img src={reports} alt="reports" /></NavLink>
        <NavLink className="sideNav-links" style={({isActive}) => isActive ? activeStyle : null} to="addressBook"><img src={address} alt="address" /></NavLink>
      </nav>
      <Outlet className="view-section" />
    </div>
  )
}