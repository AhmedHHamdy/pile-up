import "../../App.css"
import { NavLink, Link, Outlet, useLocation, useParams } from "react-router-dom"
import pileIcon  from "../../assets/Icon.png"
import { IoIosArrowBack } from "react-icons/io"
import { MdModeEdit } from "react-icons/md"
import { AiFillCloseCircle } from "react-icons/ai"
import { useEffect, useMemo, useRef, useState } from "react"
import axios from "axios"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useAuth } from "../../context/AuthProvider"
import { useTranslation } from "react-i18next"

export default function PileView() {
  const activeStyle = {
    borderBottom: "2px solid #EF6C4D"
  }

  const { t } = useTranslation()

  const { token } = useAuth()

  const [loadingStatus, setLoadingStatus] = useState(true)
  const [error, setError] = useState(null)


  const [pileData, setPileData] = useState([])

  const params = useParams()
  console.log(params.id)

  const location = useLocation()
  console.log(location)

  const [cachedValue, setCachedValue] = useState(() => {
    // Try to retrieve the cached value from localStorage
    const storedValue = localStorage.getItem('cachedValue');
    return storedValue ? JSON.parse(storedValue) : {
      status: location?.state?.status,
      folderId: location?.state?.id,
    };
  });

  // Update the cached value whenever the location changes
  useEffect(() => {
    const storedValue = localStorage.getItem('cachedValue');



    if (storedValue && Object.keys(storedValue).length !== 0 && location.state == null) {
      const parsedValue = JSON.parse(storedValue);
      localStorage.setItem('cachedValue', JSON.stringify(parsedValue));

    } else {
      const newValue = {
        status: location?.state?.status,
        folderId: location?.state?.id,
      };
      setCachedValue(newValue);
  
      // Store the new value in localStorage
      localStorage.setItem('cachedValue', JSON.stringify(newValue));
    }
    
  }, []);

  console.log(cachedValue)

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
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/piles/${params.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      console.log(res)
      setLoadingStatus(false)
      setPileData(res.data.data)
    })
    .catch(err => {
      console.log(err)
      setError(err.message)
    })
  }, [])

  const [pileInfoUpdateForm, setPileInfoUpdateForm] = useState({
    name: '',
    content: '',
    folder_id: "", // Assuming you want to include these values
    pile_id: params.id,
    status: ""
  })


  function handlePileInfoFormChange(event) {
    const {name, value} = event.target
    setPileInfoUpdateForm(previousValue => ({
      ...pileData, ...previousValue, pile_id: params.id, folder_id: +cachedValue.folderId, status: cachedValue.status, [name]: value
    }))
  }
  console.log(pileInfoUpdateForm)

  function handleSubmitPileInfoUpdate(event) {
    event.preventDefault()
    console.log(pileInfoUpdateForm)


    let inputNames = ["name", "content", "status", "pile_type", "dead_line", "event_date", "folder_id", "pile_id"]
    const formData = new FormData(); // Create a new FormData object
  
    // Append the fields from pileFormData
    for (const key of inputNames) {
      console.log(key, pileInfoUpdateForm[key])
      if (key == "pile_type") {
        formData.append("pile_type_id", pileInfoUpdateForm[key].id);
      } else {
        formData.append(key, pileInfoUpdateForm[key]);
      }
    }
  

    axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/piles/update`, formData)
          .then(res => {
            console.log(res)
            // window.location.reload();
            setPileData(res.data.data)
            closeEditPileForm()
          })
          .catch(err => {
            console.log(err)
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
    <section className="pileview-container">
      <div className="pileview-container-buttons">
        <Link to="../folders"><IoIosArrowBack /> {t("Back to Piles")}</Link>
        {/* <span> 
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5C9.33696 12.5 8.70107 12.2366 8.23223 11.7678C7.76339 11.2989 7.5 10.663 7.5 10C7.5 9.33696 7.76339 8.70107 8.23223 8.23223C8.70107 7.76339 9.33696 7.5 10 7.5C10.663 7.5 11.2989 7.76339 11.7678 8.23223C12.2366 8.70107 12.5 9.33696 12.5 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.04834 10.0001C3.11001 6.61925 6.26917 4.16675 10 4.16675C13.7317 4.16675 16.89 6.61925 17.9517 10.0001C16.89 13.3809 13.7317 15.8334 10 15.8334C6.26917 15.8334 3.11001 13.3809 2.04834 10.0001Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Preview
        </span> */}
      </div>


      <div className="pile-container">
        <div className="pile-container-info">
          <div className="pile-info">
            <img src={pileData['image']} alt="pile-image" />
            <div>
              <h3>{pileData["name_en"]}</h3>
              <p>{pileData["content_en"]}</p>
            </div>
          </div>
          <button className="pile-info-edit-button" onClick={openEditPileForm}><MdModeEdit /></button>
        </div>

        { reportsPath == "reports" && 
          <div className="reports-total-collected">
            <h3>{t("Total Collected")}</h3>
            <h1>0.0 {t("EGP")}</h1>
          </div>
        }


        <div className="pileview-container-nav">
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="." end>{t("Items")}</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="share">{t("Share")}</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="managers">{t("Managers")}</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="reports">{t("Reports")}</NavLink>
          </div>
      </div>

      { editPileInfoForm && <div className="model-overlay-edit-pile-form">
        <div className="model-edit-pile-form" ref={modelRef}>
          <div className="edit-pile-form-header">
            <h1>{t("Edit Pile Info")}</h1>
            <button type="button" onClick={closeEditPileForm}><AiFillCloseCircle /></button>
          </div>

          <form onSubmit={handleSubmitPileInfoUpdate}>
            <label htmlFor="name">{t("Name")} <span>*</span></label>
            <input type="text" placeholder="Enter a name" name="name" required id="name" value={pileInfoUpdateForm.name} onChange={handlePileInfoFormChange} />

            <label htmlFor="description">{t("Description")} <span>*</span></label>
            <textarea placeholder="Enter a Description" id="description" required name="content" value={pileInfoUpdateForm.content} onChange={handlePileInfoFormChange}/>
            <button>{t("Save")}</button>
          </form>
        </div>
      </div>}
      
      <Outlet context={pileData} />
      
    </section>
  )
}