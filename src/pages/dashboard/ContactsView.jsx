import { useEffect, useState } from "react";
import "../../App.css"
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { FcInvite } from "react-icons/fc"

export default function ContactsView() {
  const [contactsData, setContactsData] = useState([])

  const [loadingStatus, setLoadingStatus] = useState(true)
  const [error, setError] = useState(null)

  const { token } = useAuth()

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/contacts/list`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setLoadingStatus(false)
      console.log(res)
      setContactsData(res.data.data)
    })
    .catch(err => {
      setLoadingStatus(false)
      setError(err.message)
      console.log(err)
    })
  }, [])


  if (loadingStatus) {
    return (
      <Box sx={{ display: 'flex', justifyContent:"center", gridColumn: "8", alignSelf: "center" }}>
        <CircularProgress color="success"  />
      </Box>
    )
  }

  if (error) {
    return (
      <h1 style={{gridColumn: "2/-1", textAlign: "center" }}>{error} <br/> Please Refresh</h1>
    )
  }


  return (
    <>
    <table className="table-orders">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Send Invite</th>
        </tr>
      </thead>
      <tbody>
        {contactsData.map(contact => {
          return (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td><Link className="send-invite" to="../sendInvitation"><FcInvite /></Link></td>
            </tr>
          );
        })}
      </tbody>
    </table>

    </>
  )
}