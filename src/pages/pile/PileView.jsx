import "../../App.css"
import { NavLink, Link, Outlet, useLocation, useParams } from "react-router-dom"
import pileIcon  from "../../assets/Icon.png"
import { IoIosArrowBack } from "react-icons/io"
import { MdModeEdit } from "react-icons/md"
import { AiFillCloseCircle } from "react-icons/ai"
import { useEffect, useRef, useState } from "react"
import axios from "axios"

export default function PileView() {
  const activeStyle = {
    borderBottom: "2px solid #EF6C4D"
  }

  const [pileData, setPileData] = useState([])

  const params = useParams()
  console.log(params)

  const location = useLocation()
  let reportsPath = location.pathname.split('/')[location.pathname.split('/').length -1]

  const [editPileInfoForm, setEditPileInfoForm] = useState(false)
  const modelRef = useRef(null)

  const openEditPileForm = () => {
    setEditPileInfoForm(true)
  }

  const closeEditPileForm = () => {
    setEditPileInfoForm(false)
  }

  useEffect(() => {
    axios.get(`https://main.mahmoud.social/api/v1/piles/${params.id}`)
        .then(res => {
          console.log(res)
          setPileData(res.data.data)
        })
        .catch(err => {
          console.log(err)
        })
  }, [])

  return (
    <section className="pileview-container">
      <div className="pileview-container-buttons">
        <Link to="../folders"><IoIosArrowBack /> Back to piles</Link>
        <span> 
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5C9.33696 12.5 8.70107 12.2366 8.23223 11.7678C7.76339 11.2989 7.5 10.663 7.5 10C7.5 9.33696 7.76339 8.70107 8.23223 8.23223C8.70107 7.76339 9.33696 7.5 10 7.5C10.663 7.5 11.2989 7.76339 11.7678 8.23223C12.2366 8.70107 12.5 9.33696 12.5 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.04834 10.0001C3.11001 6.61925 6.26917 4.16675 10 4.16675C13.7317 4.16675 16.89 6.61925 17.9517 10.0001C16.89 13.3809 13.7317 15.8334 10 15.8334C6.26917 15.8334 3.11001 13.3809 2.04834 10.0001Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Preview
        </span>
      </div>


      <div className="pile-container">
        <div className="pile-container-info">
          <div className="pile-info">
            <img src={pileIcon} alt="" />
            <div>
              <h3>{pileData["name_en,"]}</h3>
              <p>{pileData["content_en,"]}</p>
            </div>
          </div>
          <button className="pile-info-edit-button" onClick={openEditPileForm}><MdModeEdit /></button>
        </div>

        { reportsPath == "reports" && 
          <div className="reports-total-collected">
            <h3>Total Collected</h3>
            <h1>0.0 EGP</h1>
          </div>
        }


        <div className="pileview-container-nav">
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="." end>Items</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="share">Share</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="managers">Managers</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="reports">Reports</NavLink>
          </div>
      </div>

      { editPileInfoForm && <div className="model-overlay-edit-pile-form">
        <div className="model-edit-pile-form" ref={modelRef}>
          <div className="edit-pile-form-header">
            <h1>Edit Pile Info</h1>
            <button type="button" onClick={closeEditPileForm}><AiFillCloseCircle /></button>
          </div>

          <form >
            <label htmlFor="">Name <span>*</span></label>
            <input type="text" placeholder="Enter a name" />

            <label htmlFor="">Description <span>*</span></label>
            <textarea placeholder="Enter a Description" />
            <button>Save</button>
          </form>
        </div>
      </div>}
      
      <Outlet context={pileData} />
      
    </section>
  )
}