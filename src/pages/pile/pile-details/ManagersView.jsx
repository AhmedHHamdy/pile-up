import { useEffect, useRef, useState } from "react"
import "../../../App.css"
import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai"
import { useOutletContext, Link } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcInvite } from "react-icons/fc"
import { useTranslation } from "react-i18next"

export default function ManagersView() {
  const [isManagerFormOpen, setIsManagerFormOpen] = useState(false)
  const modelRef = useRef(null)

  const { t } = useTranslation()

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

  function handleLinkClick(event) {
    event.preventDefault()
  }

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
          // toast.success(res.data.message)
          window.location.reload()
        })
        .catch(err => {
          console.log(err)
          toast.error(err.message)
        })
  }




  return (
    <section className="managers-container">
      <div className="managers-buttons-container">
        {/* <div className="managers-select-input">
          <input type="checkbox" name="" id="" />
          <label htmlFor="">Select all</label>
        </div> */}

        <div className="managers-create-buttons">
          <button onClick={openManagerForm}><AiOutlinePlus /> {t("Add a Participant")}</button>
          <input type="search" placeholder={t("Search For a Participant")} />
        </div>
      </div>


      <div className="managers-list-container">
        <div className="managers-list-container-manager">
          {/* <div className="managers-list-container-manager-checkbox">
            <input type="checkbox" name="" id="" />
          </div> */}
          
          <div className="managers-list-container-manager-info">
            <section className="table-container">

              <table className="table-orders">
                <thead>
                  <tr>
                    <th colSpan={2}>{t("Name")}</th>
                    <th colSpan={2}>{t("Email")}</th>
                    <th>{t("Date Added")}</th>
                    <th>{t("Role")}</th>
                    <th>{t("Send Message")}</th>
                  </tr>
                </thead>
                <tbody>
                  {[pileData].map(p => p.members)[0].map((u, i) => {
                    return (
                      <tr key={i}>
                        <td colSpan={2}>{u.user.first_name} {u.user.first_name}</td>
                        <td colSpan={2}>{u.user.email}</td>
                        <td>{u.user.created_at.split('T')[0]}</td>
                        <td>{u.is_manager == true ? "Manager" : "Participant"}</td>
                        <td className="link-invite"><Link className="send-invite" onContextMenu={handleLinkClick} to="../../sendInvitation" state={{email: u.user.email, pileId: pileData.id}}><FcInvite /></Link></td>
                      </tr>
                    )
                  })}
    

                </tbody>
              </table>
            </section>
          </div>
          
        </div>
      </div>
      <ToastContainer />
      { isManagerFormOpen && <div className="model-overlay-manager-form">
        <div className="model-manager-form" ref={modelRef}>
          <div className="manager-form-header">
            <h1>{t("Add a Participant")}</h1>
            <button type="button" onClick={closeManagerForm}><AiFillCloseCircle /></button>
          </div>

          <form onSubmit={handleAddingParticipant}>
            <label htmlFor="">{t("Pile Name")}</label>
            <input type="text" placeholder="Enter a name" disabled value={pileData.name_en}/>

            <label htmlFor="select-participant">{t("Email")} <span>*</span></label>
            <select name="email" id="select-participant" onChange={handleParticipantDataChange} value={participantData.email}>
              <option value=''>{t("Select Contact")}</option>
              {contactsOptions}
            </select>

            <button>{t("Add")}</button>
          </form>
        </div>
      </div>}
    </section>
  )
}