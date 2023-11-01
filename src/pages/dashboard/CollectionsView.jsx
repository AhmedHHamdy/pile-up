import "../../App.css"
import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai"
import Pile from "../../components/Pile"
import File from "../../components/File"
import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../../context/AuthProvider"
import { useParams, useSearchParams, Link , useNavigate, useLocation } from "react-router-dom"

export default function FolderView() {
  const { token } = useAuth()
  const [folderData, setFolderData] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const [createFolderForm, setCreateFolderForm] = useState({ name: '' })
  const navigate = useNavigate()

  function createFolderHandler(event) {
    event.preventDefault();
    axios.post(`https://main.mahmoud.social/api/v1/folders/create-folder`, createFolderForm)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        // This will be executed whether the request is successful or encounters an error.

      });
  }
  

  const folderChange = searchParams.get('folder')
  console.log(folderChange)


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
    return <File key={f.id} name={f.name_en} id={f.id} onclick={() => handleFolderChange("folder", f.id)} styling={`${folderChange == f.id ? 'selected' : ''}`} />
  })

  const folderId = folderData.find(folder => folder.id === +folderChange);

  const piles = folderId ? folderId.piles.map((pile, i) => (
    <Pile key={i} name={pile.name_ar} updated={pile.updated_at.split('T')[0]} total="2500" id={pile.id} />
  )) : null;

  console.log(piles)
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
    axios.get('https://main.mahmoud.social/api/v1/folders/my-folders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setFolderData(res.data.data);
      console.log(res.data.data); // Log the data received from the API
    })
    .catch(err => {
      console.log(err); // Log any errors that occur
    });
  }, []);

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(window.location.search);
    const id = (folderData[0]?.id) + ''
    console.log(id)
    currentSearchParams.set('folder', id )
    const newURL = new URL(window.location.href)

    newURL.search = currentSearchParams.toString()
    window.history.pushState({ path: newURL.href }, '', newURL.href)

    setSearchParams(currentSearchParams)
  }, [folderData])

  
  return (
    <section className="folder-view">
      <section className="folder-creation-section">
        <div className="create-pile-div">
          <Link className="create-pile-button" state={{folders: folderData}} to="../createpile">Create a Pile</Link>
        </div>

        <div className="folders-section">
          <div className="create-folder-section">
            <h2>My Folders</h2>
            <button onClick={openFolderForm}>
              <AiOutlinePlus />
            </button>
          </div>
          <input type="text" placeholder="Search for a folder or a pile" />
          <div className="create-folder-container">
            <h3>Create a Folder...</h3>
            {folders}
          </div>
        </div>
      </section>

      <section className="folder-container">
        <section className="folder-container-top">
          <h1>{folderId?.name_en}</h1>
          <div>
            <section>
              <input type="checkbox" id="selectAll" name="selectAll" />
              <label htmlFor="selectAll">Select all</label>
            </section>

            <section>
              <label htmlFor="sort">Sort By:</label>
              <select name="sort" id="sort">
                <option value="name">Name</option>
                <option value="date">Date</option>
              </select>
            </section>
          </div>
        </section>


        <div>
          {piles && piles.length > 0 ? piles : 
          (<div className="no-pile-view">
            <div>
              <h2>This folder is empty</h2>
              <p>Drag a pile into this folder or create a new pile</p>
            </div>
            <Link className="create-pile-button" to="../createpile">Create a Pile</Link>
            <button className="quick-tour-button">Take a quick tour</button>
          </div>)}
        </div>
      </section>

      <section className="total-container">
        <div>
          <span>Total Collected</span>
          <h2>2550.0 EGP</h2>
        </div>
        <div className="buttonReedem-container">
          <button>Redeem</button>
        </div>
      </section>


      { isFolderFormOpen && <div className="model-overlay-folder-form">
        <div className="model-folder-form" ref={modelRef}>
          <div className="folder-form-header">
            <h1>New Folder</h1>
            <button type="button" onClick={closeFolderForm}><AiFillCloseCircle /></button>
          </div>

          <form onClick={createFolderHandler} >
            <label htmlFor="folder-name">Name <span>*</span></label>
            <input type="text" name="name" id="folder-name" placeholder="Enter a name" value={createFolderForm.name} onChange={(event) => setCreateFolderForm(previousData => ({...previousData, name: event.target.value}))} />
            <button>Save</button>
          </form>
        </div>
      </div>}
    </section>
  )
}