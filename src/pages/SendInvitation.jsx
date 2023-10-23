import { Link } from "react-router-dom"
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoIosArrowBack } from "react-icons/io"

export default function sendInvitation() {
  const [value, setValue] = useState('');

  return (
    <section className="invitation-form-container">
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
                <p>contact1, contact2, contact3, contact4, contact5, contact7، contact1, contact2, contact3, contact4, contact5, contact7، contact1, contact2, contact3, contact4, contact5, contact7</p>
                <button>Add recipients</button>

              </div>

              <section className="invite-message-container">
                <div className="invite-message-container-from-input">
                  <label htmlFor="">From <span>*</span></label>
                  <input type="text" placeholder="My Pile 01" />
                </div>


                <div className="invite-message-container-from-select">
                  <label htmlFor="invitation-selection">Subject <span>*</span></label>
                  <select name="invitation" id="invitation-selection">
                    <option value="pie 01">Pie 01</option>
                  </select>
                </div>

                <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
              </section>

            </div>

            <div className="form-buttons">
              <Link to="../pileview/share">Cancel</Link>
              <button>Create</button>
            </div>
          </form>
      </div>
    </section>
  )
}