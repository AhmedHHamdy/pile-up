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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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

  const [contactsFormData, setContactFormData] = useState({
    first_name: '',
    last_name: '',
    contact_id: '',
  });

  
  function handleContactFormChange(event) {
    const { name, value } = event.target
    setContactFormData(previousValue => {
      return ({...previousValue, [name]: value})
    })
  }

  console.log(contactsFormData)


  const [open, setOpen] = useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    setContactFormData(previousValue => {
      return ({...previousValue, contact_id: id})
    })
  };

  const handleEditingContact = () => {
    axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/contacts/update`, contactsFormData)
          .then(res => {
            console.log(res)
            setContactsData(res.data.data)
            toast.success("Contact Edited")
            setOpen(false);
          })
          .catch(err => {
            console.log(err)
            toast.error(err.response.data.message)
          })
  };

  const handleClose = () => {
    setOpen(false)
  }


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
    <section className="table-container"> 
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
              <td className="button-edit" onClick={() => handleClickOpen(contact.id)}><button><FiEdit /></button></td>
              <td className="button-delete"><button onClick={() => handleDeleteContact(contact.id)}><MdOutlineDeleteOutline /></button></td>
            </tr>
          );
        })}
      </tbody>
    </table>

    <Pagination
      className="pagination-bar"
      currentPage={currentPage}
      totalCount={paginationData.total_count}
      pageSize={paginationData.per_page}
      onPageChange={page => setCurrentPage(page)}
    />  
    
    <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <DialogContentText>
              Edit a Contact
            </DialogContentText>
            <TextField
              margin="dense"
              id="first_name"
              label="First Name"
              type="text"
              name="first_name"
              fullWidth
              placeholder="John"
              variant="standard"
              onChange={handleContactFormChange}
              value={contactsFormData.first_name}
              required
            />

            <TextField
              margin="dense"
              id="last_name"
              label="Last Name"
              name="last_name"
              type="text"
              fullWidth
              placeholder="Smith"
              variant="standard"
              onChange={handleContactFormChange}
              value={contactsFormData.last_name}
              required
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleEditingContact}>Save</Button>
          </DialogActions>
        </Dialog>

        </div>
    </section>
  )
}