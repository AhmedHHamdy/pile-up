import "../../App.css"
import Pile from "../../components/Pile"
import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai"
import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../../context/AuthProvider"
import { useParams, useSearchParams, Link , useNavigate } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import FolderFile from "../../components/FolderFile"
import { useTranslation } from "react-i18next"

export default function FolderView() {
  const { token } = useAuth()
  const [folderData, setFolderData] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const { t } = useTranslation()

  const [createFolderForm, setCreateFolderForm] = useState({ name: '' })
  const navigate = useNavigate()

  const [loadingStatus, setLoadingStatus] = useState(false)
  const [error, setError] = useState(null)
  
  const [sortingPile, setSortingPile] = useState({sort: 'name'})


  console.log(sortingPile)

  const [searchData, setSearchData] = useState([])
  const [searchForm, setSearchForm] = useState({name: ''})

  function handleLinkClick(event) {
    event.preventDefault()
  }

  function handleSearchChange(event) {
    const { name, value } = event.target
    setSearchForm(prevSearchForm => {
      return {name: value}
    })
  }

  console.log(searchForm)


  function createFolderHandler(event) {
    event.preventDefault();
    axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/folders/create-folder`, createFolderForm)
      .then(res => {
        console.log(res);
        closeFolderForm()
        // window.location.reload();
        setFolderData((prevFolderData) => [...prevFolderData, res.data.data]);
      })
      .catch(err => {
        console.log(err);
        setError(err.message)
      })
      .finally(() => {
        // This will be executed whether the request is successful or encounters an error.
      });
  }
  
  const folderChange = searchParams.get('folder')


  const params = useParams()

  function handleFolderChange (key, value) {
    setSearchParams(prevParams => {
      if (value == "null") {
        prevParams.delete(key)
      } else {
        prevParams.set(key, value)
      }
      return prevParams
    })
  }

  const folders = folderData.map(f => {
    return <FolderFile key={f.id} name={f.name_en} id={f.id} onclick={() => handleFolderChange("folder", f.id)} styling={`${folderChange == f.id ? 'selected' : ''}`} />
  })

  const folderId = folderData.find(folder => folder.id === +folderChange);

  function handleSortingChange(event) {
    const { name, value } = event.target
    setSortingPile(previousData => {
      return {...previousData, [name]: value}
    })
  }


  const piles = folderId ? sortingPile.sort === "name" ? folderId.piles.sort((a, b) => a["name_en"].localeCompare(b["name_en"])).map((pile, i) => (
    <Pile key={i} name={pile.name_ar} updated={pile.updated_at.split('T')[0]} total="2500" id={pile.id} image={pile["image"]} collected={pile.collected} status={pile.status} folderId={folderChange} />
  )) : folderId.piles.sort((a, b) => a["event_date"].split('T')[0].localeCompare(b["event_date"].split('T')[0])).map((pile, i) => (
    <Pile key={i} name={pile.name_ar} updated={pile.updated_at.split('T')[0]} total="2500" id={pile.id} image={pile["image"]} collected={pile.collected} status={pile.status} folderId={folderChange} />
  )) : null;


  
  function handleSearchFormSubmit(event) {
    event.preventDefault()
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/piles/search?name=${searchForm.name.toLowerCase()}`)
    .then(res => {
      console.log(res)
      // setSearchData(res.data)
      console.log(folderData)
      for (let folder of folderData) {
        console.log(folder)
        for (let pile of folder.piles){
          console.log(pile.id)
          if(pile.id == res.data.data[0].id) {
            console.log(folder.id)
            handleFolderChange("folder", folder.id)
          }
        }
      }
    })
    .catch(err => {
      console.log(err)
    })
  }


  const modelRef = useRef(null)
  const [isFolderFormOpen, setIsFolderFormOpen] = useState(false)

  const openFolderForm = () => {
    setIsFolderFormOpen(true)
  }

  const closeFolderForm = () => {
    setIsFolderFormOpen(false)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (modelRef.current && !modelRef.current.contain(event.target)) {
        closeFolderForm()
      }

      if (isFolderFormOpen) {
        document.addEventListener("click", handleClickOutside)
      }

      return () => {
        document.removeEventListener("click", handleClickOutside)
      }
    }
  }, [isFolderFormOpen])

  useEffect(() => {
    setLoadingStatus(true)
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/folders/my-folders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setLoadingStatus(false)
      setFolderData(res.data.data);
      console.log(res.data.data); // Log the data received from the API
    })
    .catch(err => {
      setLoadingStatus(false)
      console.log(err); // Log any errors that occur
      setError(err.message)
    });
  }, []);

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(window.location.search);
    const id = (folderData[0]?.id) + ''

    currentSearchParams.set('folder', id )
    const newURL = new URL(window.location.href)

    newURL.search = currentSearchParams.toString()
    window.history.pushState({ path: newURL.href }, '', newURL.href)

    setSearchParams(currentSearchParams)
  }, [folderData])


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
    <section className="folder-view">
      <section className="folder-creation-section">
        <div className="create-pile-div">
          <Link className="create-pile-button" onContextMenu={handleLinkClick} state={{folders: folderData, folderId: folderChange}} to="../createpile">{t("Create a Pile")}</Link>
        </div>

        <div className="folders-section">
          <div className="create-folder-section">
            <h2>{t("My Folders")}</h2>
            <button onClick={openFolderForm}>
              <AiOutlinePlus />
            </button>
          </div>

          <form onSubmit={handleSearchFormSubmit} >
            <input type="text" placeholder={t("Search for a folder or a pile")} value={searchForm.searchText} onChange={handleSearchChange} />
          </form>

          <div className="create-folder-container">
            <h3>{t("Create a Folder")}...</h3>
            {folders}
          </div>
        </div>
      </section>

      <section className="folder-container">
        <section className="folder-container-top">
          <h1>{folderId?.name_en}</h1>
          <div className="folder-select-input-container">
            {/* <section>
              <input type="checkbox" id="selectAll" name="selectAll" />
              <label htmlFor="selectAll">Select all</label>
            </section> */}

            <section className="sort-piles-by-section">
              <label htmlFor="sort">{t("Sort By")}:</label>
              <select name="sort" id="sort" className="" value={sortingPile.sort} onChange={handleSortingChange}>
                {/* <option value="">Sort By</option> */}
                <option value="name">{t("Name")}</option>
                <option value="date">{t("Date")}</option>
              </select>
            </section>
          </div>
        </section>


        <div className="pile-section-container">
          {piles && piles.length > 0 ? piles : 
          (<div className="no-pile-view">
            <div>
              <h2>{t("This folder is empty")}</h2>
              <p>{t("create a new pile")}</p>
            </div>
            <Link className="create-pile-button" onContextMenu={handleLinkClick} state={{folders: folderData, folderId: folderChange}} to="../createpile">{t("Create a Pile")}</Link>
            {/* <button className="quick-tour-button">Take a quick tour</button> */}
          </div>)}
        </div>
      </section>

      <section className="total-container">
        <div>
          <span>{t("Total Collected")}</span>
          <h2>2550.0 {t("EGP")}</h2>
        </div>
        <div className="buttonReedem-container">
          <button>{t("Redeem")}</button>
        </div>
      </section>


      { isFolderFormOpen && <div className="model-overlay-folder-form">
        <div className="model-folder-form" ref={modelRef}>
          <div className="folder-form-header">
            <h1>{t("New Folder")}</h1>
            <button type="button" onClick={closeFolderForm}><AiFillCloseCircle /></button>
          </div>

          <form onSubmit={createFolderHandler} >
            <label htmlFor="folder-name">{t("Name")} <span>*</span></label>
            <input type="text" name="name" id="folder-name" placeholder="Enter a name" value={createFolderForm.name} onChange={(event) => setCreateFolderForm(previousData => ({...previousData, name: event.target.value}))} />
            <button>{t("Save")}</button>
          </form>
        </div>
      </div>}
    </section>
  )
}