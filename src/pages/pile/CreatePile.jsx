import "../../App.css"
import { Link } from "react-router-dom"
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AiOutlinePlus } from "react-icons/ai"


export default function CreatePile() {
  const [value, setValue] = useState('');


  return (
    <section className="pile-form-container">
      <div className="pile-form">
        <h1>Create Pile</h1>
        <div className="form-container">
          <form>
            <div className="from-elements-container">
              {/* <div className="input-banner-container">
                <label for="file-input" class="custom-file-upload">
                    <div class="upload-icon">
                        <img src="" alt="Upload Icon"/>
                    </div>
                    Upload File
                </label>
              </div> */}
              <input className="input-banner-container" type="file" />

              <div className="title-input-container">
                <label htmlFor="">Title <span>*</span></label>
                <input type="text" placeholder="My Pile 01" />
              </div>

              <div className="folder-input-container">
                <label htmlFor="folder-selection">Folder <span>*</span></label>
                <select name="folders" id="folder-selection">
                  <option value="folder01">My Folder 01</option>
                  <option value="folder02">My Folder 02</option>
                  <option value="folder03">My Folder 03</option>
                </select>

              </div>

              <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />


              <button className="button-attachment"><AiOutlinePlus /> Add attachment</button>

            </div>

            <div className="form-buttons">
              <Link to="..">Cancel</Link>
              <button>Create</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}