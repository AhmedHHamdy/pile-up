import { useEffect, useRef, useState } from "react"
import "../../../App.css"
import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai"
import { useOutletContext } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ManagersView() {
  const [isManagerFormOpen, setIsManagerFormOpen] = useState(false)
  const modelRef = useRef(null)

  const [contactList, setContactList] = useState([])
  console.log(contactList)

  const contactsOptions = contactList.map((email, i) => {
    return (<option key={i} value={email}>{email}</option>)
  })

  console.log(contactsOptions)

  const pileData = useOutletContext()
  console.log(pileData)

  const [participantData, setParticipantData] = useState({
    pile_id: `${pileData.id}`,
    email: ''
  })

  console.log(participantData)

  function handleParticipantDataChange(event) {
    const { name, value } = event.target
    setParticipantData(previousData => {
      return ({...previousData, [name]: value})
    })
  }


  const openManagerForm = () => {
    setIsManagerFormOpen(true)
  }

  const closeManagerForm = () => {
    setIsManagerFormOpen(false)
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/contacts/list`)
        .then(res => {
          console.log(res)
          setContactList(res.data.data.map(c => c.email))
        })
        .catch(err => {
          console.log(err)
          toast.error(err.message)
        })
  }, [])

  function handleAddingParticipant(event) {
    event.preventDefault()
      axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/piles/add-member`, participantData)
        .then(res => {
          console.log(res)
          setParticipantData({
            pile_id: `${pileData.id}`,
            email: ''
          })
          closeManagerForm()
          toast.success(res.data.message)
        })
        .catch(err => {
          console.log(err)
          toast.error(err.message)
        })
  }




  return (
    <section className="managers-container">
      
      <div className="managers-buttons-container">
        <div className="managers-select-input">
          <input type="checkbox" name="" id="" />
          <label htmlFor="">Select all</label>
        </div>

        <div className="managers-create-buttons">
          <button onClick={openManagerForm}><AiOutlinePlus /> Add a Participant</button>
          <input type="search" placeholder="Search for a manager" />
        </div>
      </div>


      <div className="managers-list-container">
        <div className="managers-list-container-manager">
          <div className="managers-list-container-manager-checkbox">
            <input type="checkbox" name="" id="" />
          </div>
          
          <div className="managers-list-container-manager-info">
            <table className="table-orders">
              <thead>
                <tr>
                  <th colSpan={2}>Name</th>
                  <th colSpan={2}>Email</th>
                  <th>Date Added</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {[pileData].map(p => p.members)[0].map((u, i) => {
                  return (
                    <tr key={u.i}>
                      <td colSpan={2}>{u.user.first_name} {u.user.first_name}</td>
                      <td colSpan={2}>{u.user.email}</td>
                      <td>{u.user.created_at.split('T')[0]}</td>
                      <td>{u.is_manager == true ? "Manager" : "Participant"}</td>
                    </tr>
                  )
                })}
  

              </tbody>
            
            </table>
          </div>
          
        </div>
      </div>
      <ToastContainer />
      { isManagerFormOpen && <div className="model-overlay-manager-form">
        <div className="model-manager-form" ref={modelRef}>
          <div className="manager-form-header">
            <h1>Add a Participant</h1>
            <button type="button" onClick={closeManagerForm}><AiFillCloseCircle /></button>
          </div>

          <form onSubmit={handleAddingParticipant}>
            <label htmlFor="">Pile Name</label>
            <input type="text" placeholder="Enter a name" disabled value={pileData.name_en}/>

            <label htmlFor="select-participant">Email <span>*</span></label>
            <select name="email" id="select-participant" onChange={handleParticipantDataChange} value={participantData.email}>
              <option value=''>Select Contact</option>
              {contactsOptions}
            </select>

            <button>Add</button>
          </form>
        </div>
      </div>}
    </section>
  )
}