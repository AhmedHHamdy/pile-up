import { Outlet } from "react-router-dom";
import "../App.css"
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}