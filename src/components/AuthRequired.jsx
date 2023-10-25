import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AuthRequired() {
  const { auth } = useAuth()
  console.log(auth)
  // return (
  //   auth ?  <Outlet /> : <Navigate to="/login" replace />
  // )
  const token = localStorage.getItem("userToken")
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}