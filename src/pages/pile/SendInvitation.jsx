import { Link, useLocation } from "react-router-dom"
import React, { useState } from 'react';
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

  const location = useLocation()
  console.log(location)

  const [contactsFormData, setContactFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });


  const [inviteDataForm, setInviteDataForm] = useState({
    pile_id: '',
    message_type: '',
    send_to: location?.state.email,
    send_from: '',
    subject: ''
  })

  const [contactsData, setContactsData] = useState([''])

  function handleContactFormChange(event) {
    const { name, value } = event.target
    setContactFormData(previousValue => {
      return ({...previousValue, [name]: value})
    })
  }

  console.log(contactsFormData)





  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddingContact = () => {
    axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/contacts/create`, contactsFormData)
          .then(res => {
            console.log(res)
            setContactsData(res.data.data)
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




  return (
    <section className="invitation-form-container">
      <ToastContainer />
      <div className="invitation-back-button ">
        <Link to="../pileview/share"><IoIosArrowBack /> Back to piles</Link>
      </div>
      <div className="invitation-form">
        <h1>Message Center</h1>
          <form>
            <div className="invitation-from-elements-container">

              <div className="title-input-container">
                <label htmlFor="">Select Pile <span>*</span></label>
                <input type="text" placeholder="My Pile 01" />
              </div>

              <div className="invite-input-container ">
                <label htmlFor="invitation-selection">Message type <span>*</span></label>
                <select name="invitation" id="invitation-selection">
                  <option value="Invitation 01">Invitation</option>
                </select>
              </div>

              <div className="invite-form-add-recipients-button-container">
                <label htmlFor="">To <span>*</span></label>
                {/* <p>contact1, contact2, contact3, contact4, contact5, contact7، contact1, contact2, contact3, contact4, contact5, contact7، contact1, contact2, contact3, contact4, contact5, contact7</p> */}
                {/* {recipients} */}
                <input style={{display: "block", marginBottom: "1rem", width: "50%"}} type="text" name="send_to" id="" value={contactsData[contactsData.length-1].email || location?.state.email} disabled />
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
                <div className="invite-message-container-from-input">
                  <label htmlFor="">From <span>*</span></label>
                  <input type="text" placeholder="Email" />
                </div>


                <div className="invite-message-container-from-subject-input">
                  <label htmlFor="invitation-selection">Subject <span>*</span></label>
                  <input type="text" placeholder="Subject" />
                </div>

                <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
              </section>

            </div>

            <div className="form-buttons">
              <Link to="../contacts">Cancel</Link>
              <button>Create</button>
            </div>
          </form>

 
      </div>
    </section>
  )
}