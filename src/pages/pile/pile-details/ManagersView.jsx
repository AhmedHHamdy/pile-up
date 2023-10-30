import { useRef, useState } from "react"
import "../../../App.css"
import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai"
import { useOutletContext } from "react-router-dom"

export default function ManagersView() {
  const [isManagerFormOpen, setIsManagerFormOpen] = useState(false)
  const modelRef = useRef(null)

  const pileData = useOutletContext()
  console.log(pileData)

  const openManagerForm = () => {
    setIsManagerFormOpen(true)
  }

  const closeManagerForm = () => {
    setIsManagerFormOpen(false)
  }


  return (
    <section className="managers-container">
      <div className="managers-buttons-container">
        <div className="managers-select-input">
          <input type="checkbox" name="" id="" />
          <label htmlFor="">Select all</label>
        </div>

        <div className="managers-create-buttons">
          <button onClick={openManagerForm}><AiOutlinePlus /> Add a manager</button>
          <input type="search" placeholder="Search for a manager" />
        </div>
      </div>


      <div className="managers-list-container">
        <div className="managers-list-container-manager">
          <div className="managers-list-container-manager-checkbox">
            <input type="checkbox" name="" id="" />
          </div>
          
          <div className="managers-list-container-manager-info">
            <table>
              <colgroup span="4"></colgroup>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date Added</th>
                </tr>

                <tr>
                  <td>May Kenawi</td>
                  <td>name@example.com</td>
                  <td>11/08/2023</td>
                </tr>

                <tr>
                  <td>May Kenawi</td>
                  <td>name@example.com</td>
                <td>23/08/2023</td>
              </tr>
              </tbody>
            
            </table>
          </div>
          
        </div>
      </div>

      { isManagerFormOpen && <div className="model-overlay-manager-form">
        <div className="model-manager-form" ref={modelRef}>
          <div className="manager-form-header">
            <h1>Add a manager</h1>
            <button type="button" onClick={closeManagerForm}><AiFillCloseCircle /></button>
          </div>

          <form >
            <label htmlFor="">Name <span>*</span></label>
            <input type="text" placeholder="Enter a name" />

            <label htmlFor="">Email <span>*</span></label>
            <input type="text" placeholder="Enter an email" />

            <label htmlFor="">Date <span>*</span></label>
            <input type="text" placeholder="Enter a Date" />
            <button>Save</button>
          </form>
        </div>
      </div>}
    </section>
  )
}