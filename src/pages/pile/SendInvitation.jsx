import { Link, useLocation } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoIosArrowBack } from "react-icons/io"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { display } from "@mui/system";

export default function sendInvitation() {
  const [value, setValue] = useState()

  const [pileList, setPileList] = useState([])
  console.log(pileList)

  const location = useLocation()
  console.log(location)

  const [contactsData, setContactsData] = useState([''])


  const [contactsFormData, setContactFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });


  const [inviteDataForm, setInviteDataForm] = useState({
    pile_id: location?.state?.pileId || '',
    title: '',
    email: location?.state.email ,
    content: ''
  })

  console.log(inviteDataForm)

  function handleInvitationDateChange(event) {
    const { name, value } = event.target
    setInviteDataForm(previousValue => {
      return ({...previousValue, [name]: value})
    })
  }

  function handleSendMessage(event) {
    event.preventDefault()
    axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/piles/add-message`, inviteDataForm)
        .then(res => {
          console.log(res)
          setInviteDataForm({
            pile_id: location?.state?.pileId || '',
            title: '',
            email: location?.state?.email,
            content: ''
          })
          toast.success("Message Sent")
        })
        .catch(err => {
          console.log(err)
          toast.error(err.message)
        })
  }


  function handleContactFormChange(event) {
    const { name, value } = event.target
    setContactFormData(previousValue => {
      return ({...previousValue, [name]: value})
    })
  }

  // console.log(contactsFormData)


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddingContact = () => {
    axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/contacts/create`, contactsFormData)
          .then(res => {
            console.log(res)
            setContactsData(res.data.data)
            setContactFormData({
              first_name: '',
              last_name: '',
              email: '',
              phone: ''
            })
            setInviteDataForm(previousValue => {
              return {...previousValue, email:res.data.data[res.data.data.length-1].email }
            })
            toast.success("Contact Added")
            setOpen(false);
          })
          .catch(err => {
            console.log(err)
            toast.error(err.message)
          })
  };

  const handleClose = () => {
    setOpen(false)
  }


  const recipients = [contactsData[contactsData.length-1]].map(c => {
    return (
      <p key={c.id}>{c.email}</p>
    )
  })
  console.log(recipients)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/piles/my-piles`)
        .then(res => {
          console.log(res)
          setPileList(res.data.data)

        })
        .catch(err => {
          console.log(TypeError)
        })
  }, [])

  const pileOptions = pileList.map(p => {
    return (<option key={p.id} value={p.id}>{p["name_en"]}</option>)
  })



  return (
    <section className="invitation-form-container">
      <ToastContainer />
      <div className="invitation-back-button ">
        <Link to={location?.state?.pileId ? `../folders/pileview/${location?.state?.pileId}/managers` : '../contacts'}><IoIosArrowBack /> Back to piles</Link>
      </div>
      <div className="invitation-form">
        <h1>Message Center</h1>
          <form onSubmit={handleSendMessage}>
            <div className="invitation-from-elements-container">

              <div className="pile-select-input-container">
                <label htmlFor="pile-selection">Select Pile <span>*</span></label>
                <select name="pile_id" id="pile-selection" onChange={handleInvitationDateChange} value={inviteDataForm.pile_id} required>
                  <option value=''>Select Pile</option>
                  {pileOptions}
                </select>
              </div>
{/* 
              <div className="invite-input-container ">
                <label htmlFor="invitation-selection">Message type <span>*</span></label>
                <select name="invitation" id="invitation-selection">
                  <option value="Invitation 01">Invitation</option>
                </select>
              </div> */}

              <div className="invite-form-add-recipients-button-container">
                <label htmlFor="send_to">To <span>*</span></label>
                {/* <p>contact1, contact2, contact3, contact4, contact5, contact7، contact1, contact2, contact3, contact4, contact5, contact7، contact1, contact2, contact3, contact4, contact5, contact7</p> */}
                {/* {recipients} */}
                <input style={{display: "block", marginBottom: "1rem", width: "50%"}} type="email" name="email" id="send_to" onChange={handleInvitationDateChange} value={inviteDataForm.email} required />

                <Button className="button" onClick={handleClickOpen}>Add recipient</Button>
                <Dialog open={open} onClose={handleClose}>
                  {/* <DialogTitle>Add recipients</DialogTitle> */}
                  <DialogContent>
                    <DialogContentText>
                      Add a Contact
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
                    />

                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Email Address"
                      name="email"
                      type="email"
                      fullWidth
                      variant="standard"
                      placeholder="example@domain.com"
                      onChange={handleContactFormChange}
                      value={contactsFormData.email}
                    />

                    <TextField
                      margin="dense"
                      id="phone"
                      label="Phone"
                      name="phone"
                      type="text"
                      fullWidth
                      placeholder="01055555555"
                      variant="standard"
                      onChange={handleContactFormChange}
                      value={contactsFormData.phone}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddingContact}>Add</Button>
                  </DialogActions>
                </Dialog>

              </div>

              <section className="invite-message-container">
                <div className="invite-message-container-from-subject-input">
                  <label htmlFor="title">Subject <span>*</span></label>
                  <input type="text" placeholder="Subject" name="title" id="title" onChange={handleInvitationDateChange} value={inviteDataForm.title} required/>
                </div>

                {/* <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} /> */}
                <textarea className="editor" placeholder="Messge" name="content" value={inviteDataForm.content} id="content" cols="30" rows="10" onChange={handleInvitationDateChange} required></textarea>
              </section>

            </div>

            <div className="form-buttons">
              <Link to={location?.state?.pileId ? `../folders/pileview/${location?.state?.pileId}/managers` : '../contacts'}>Cancel</Link>
              <button>Send</button>
            </div>
          </form>

 
      </div>
    </section>
  )
}