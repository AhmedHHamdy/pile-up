import "../../../App.css"
import { AiOutlinePlus } from "react-icons/ai"

export default function ManagersView() {
  return (
    <section className="managers-container">
      <div className="managers-buttons-container">
        <div className="managers-select-input">
          <input type="checkbox" name="" id="" />
          <label htmlFor="">Select all</label>
        </div>

        <div className="managers-create-buttons">
          <button><AiOutlinePlus /> Add a manager</button>
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
    </section>
  )
}