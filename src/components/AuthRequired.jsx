import { Outlet, Navigate } from "react-router-dom";
import {useAuth} from "../context/AuthProvider";

export default function AuthRequired() {
  const { token } = useAuth()  
  // console.log(token)
  // Check if the use is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />
  }

  // If authenticated, render the child routes
  return <Outlet />
}