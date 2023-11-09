import { useEffect, useMemo, useState } from "react";
import "../../App.css"
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from "../../components/Pagination";
import Box from '@mui/material/Box'
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { FcInvite } from "react-icons/fc"
import { FiEdit } from "react-icons/fi"
import { MdOutlineDeleteOutline } from "react-icons/md"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactsView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState([])

  const [contactsData, setContactsData] = useState([])

  const [loadingStatus, setLoadingStatus] = useState(true)
  const [error, setError] = useState(null)

  const { token } = useAuth()

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/contacts/list?page=${currentPage}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setLoadingStatus(false)
      console.log(res)
      setContactsData(res.data.data)
      setPaginationData(res.data.paginator)
    })
    .catch(err => {
      setLoadingStatus(false)
      setError(err.message)
      console.log(err)
    })
  }, [currentPage])


  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * paginationData.per_page;
    const lastPageIndex = firstPageIndex + paginationData.per_page;
    // return orderData.slice(firstPageIndex, lastPageIndex);
    return contactsData

  }, [currentPage, contactsData]); // Make sure to include 'orderData' as a dependency

  function handleDeleteContact(id) {
    axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/contacts/delete`, {contact_id: id} )
          .then(res => {
            toast.success("Contact Deleted")
            console.log(res)
            setContactsData(res.data.data)
            window.location.reload()
          })
          .catch(err => {
            console.log(err)
            toast.error(err.message)
          })

  }


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
    <ToastContainer />
    <table className="table-orders">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th colSpan={2}>Email</th>
          <th>Phone</th>
          <th>Send Invite</th>
          <th>Edit Contact</th>
          <th>Delete Contact</th>
        </tr>
      </thead>
      <tbody>
        {currentTableData.map(contact => {
          return (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.name}</td>
              <td colSpan={2}>{contact.email}</td>
              <td>{contact.phone}</td>
              <td className="link-invite"><Link className="send-invite" to="../sendInvitation" state={{email: contact.email}}><FcInvite /></Link></td>
              <td className="button-edit"><button><FiEdit /></button></td>
              <td className="button-delete"><button onClick={() => handleDeleteContact(contact.id)}><MdOutlineDeleteOutline /></button></td>
            </tr>
          );
        })}
      </tbody>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={paginationData.total_count}
        pageSize={paginationData.per_page}
        onPageChange={page => setCurrentPage(page)}
      />  
    </table>

    </>
  )
}