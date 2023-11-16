import "../../App.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AiOutlinePlus } from "react-icons/ai"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularWithValueLabel from "../../components/CircularProgressWithLabel"


export default function CreatePile() {
  const location = useLocation()
  console.log(location)

  const navigate = useNavigate()

  const [LoadingStatus, setLoadingStatus] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState(0);

  const [uploadProgress, setUploadProgress] = useState(0)
  console.log(uploadProgress, typeof uploadProgress)

  const [pileFormData, setPileFormData] = useState({
    name: '',
    content: '',
    folder_id: `${location?.state?.folderId}`,
    dead_line: '',
    event_date: '',
    pile_type_id: '1',
    status: "open",
    image: null
  });

  function handleContentChange(value) {
    setLoadingStatus(true)
    const text = value

    clearTimeout(typingTimeout)

    const timeout = setTimeout(() => {
      setLoadingStatus(false)
    }, 1000)

    setTypingTimeout(timeout)
    
    if (pileFormData.content !== text) { // Check if the content has changed
      setPileFormData((prevFormData) => ({
        ...prevFormData,
        content: text,
      }));
    }
  }

  function handleFileChange(event) {
    setLoadingStatus(true)

    clearTimeout(typingTimeout)

    const timeout = setTimeout(() => {
      setLoadingStatus(false)
    }, 1000)

    setTypingTimeout(timeout)

    const selectedFile = event.target.files[0];
    setPileFormData((prevFormData) => ({
      ...prevFormData,
      image: selectedFile, // Store the selected file in your state
    }));
  }

  function handleChange(event) {
    setLoadingStatus(true)

    clearTimeout(typingTimeout)

    const timeout = setTimeout(() => {
      setLoadingStatus(false)
    }, 1000)

    setTypingTimeout(timeout)

    const {name, value, type, checked} = event.target
    setPileFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked ? "open" : "closed" : value
      }
    })
  }

  console.log(pileFormData)

  function handleSubmit(event) {
    event.preventDefault();
  
    const formData = new FormData(); // Create a new FormData object
  
    // Append the fields from pileFormData
    for (const key in pileFormData) {
      formData.append(key, pileFormData[key]);
      if (key === "content") {
        formData.append(key, pileFormData[key].replace(/<[^>]*>/g, ''))
      }
    }
  
    // Append the file data
    formData.append("image", pileFormData.image);

    const config = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted)
        console.log(`Upload Progress: ${percentCompleted}%`);
        // You can update your UI with the upload percentage here
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  
    axios
      .post(`${import.meta.env.VITE_BACKEND_API_URL}/piles/create`, formData, config)
      .then((res) => {
        if (res) {
          setLoadingStatus(false)
          console.log(res);
          navigate(`/dashboard/folders?folder=${formData.folder_id}`);
        }
      })
      .catch((err) => {
        setLoadingStatus(false)
        console.log(err);
        toast.error(err.response.data.message)
      });
  }
  



  const options = location?.state?.folders.map(folder => {
    return <option key={folder.id} value={folder.id}>{folder.name_en}</option>
  })

  function getCurrentDate() {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    console.log(today.getMonth())
    const day = String(today.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  return (
    <section className="pile-form-container">
      <ToastContainer />
      <div className="pile-form">
        <h1>Create Pile</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="from-elements-container">
              <div className="input-banner-container" style={{display: "flex", flexDirection: "row", gap: "0.8rem", marginBottom: "1rem", justifyContent: "space-between", alignItems: "center", paddingLeft: "2rem"}}>
                <section className="upload-image-section">
                  <label for="file-input" class="custom-file-upload" style={{ paddingLeft: "2rem" }}> Upload Image <span style={{ color: "#EF6C4D" }}>*</span></label>
                  <input className="input-banner-container" style={{ paddingLeft: "2rem" }} id="image"  type="file" name="file-input" onChange={handleFileChange} required />
                </section>
                 <CircularWithValueLabel value={uploadProgress} />
              </div>

              <div className="title-input-container">
                <label htmlFor="name">Title <span>*</span></label>
                <input type="text" name="name" id="name" placeholder="My Pile 01" required value={pileFormData.name} onChange={handleChange} />
              </div>

              <div className="folder-input-container">
                <label htmlFor="folder-selection">Folder <span>*</span></label>
                <select name="folder_id" id="folder-selection" onChange={handleChange} value={pileFormData.folder_id}>
                  {options}
                </select>

              </div>

              <div className="pile-type-input-container">
                <label htmlFor="pile_type_id">Pile Type <span>*</span></label>
                <select name="pile_type_id" id="pile_type_id" onChange={handleChange} value={pileFormData.pile_type_id}>
                  <option value="1">Birthday</option>
                  <option value="2">Eid</option>
                  <option value="3">Graduation Party</option>
                  <option value="4">New Job Position</option>
                  <option value="5">Gifts</option>
                  <option value="6">Others</option>
                </select>
              </div>

              {/* <div className="status-checkbox-input">
                <input type="checkbox" id="status" name="status" checked={pileFormData.status} onChange={handleChange} />
                <label htmlFor="status">Pile Status: (Open)</label>
              </div> */}

              <ReactQuill  className="editor" theme="snow" value={pileFormData.content} style={{ direction: "ltr"}}  onChange={handleContentChange} />

              <div className="event-data-input-container">
                <label htmlFor="event-date">Event Date </label>
                <input type="date" name="event_date" id="event-date" required min={getCurrentDate()} value={pileFormData.event_date} onChange={handleChange} />
              </div>

              <div className="dead-line-input-container">
                <label htmlFor="dead_line">Deadline</label>
                <input type="date" name="dead_line" id="dead_line" min={getCurrentDate()} required placeholder="26-6-1996" value={pileFormData.dead_line} onChange={handleChange} />
              </div>

              {/* <button className="button-attachment" type="button"><AiOutlinePlus /> Add attachment</button> */}

            </div>

            <div className="form-buttons">
              <Link to="../folders">Cancel</Link>
              <button className="create-button" style={uploadProgress !== 0 ? { background: "#CCCCCC" } : null} disabled={LoadingStatus || uploadProgress !== 0}>{ LoadingStatus == true ? "Typing..." : "Create" }</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}