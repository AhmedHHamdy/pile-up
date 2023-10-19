import "../App.css"
import { AiOutlinePlus } from "react-icons/ai"
import { Link } from "react-router-dom"
import Pile from "../components/Pile"
import File from "../components/file"

export default function FolderView() {
  return (
    <section className="folder-view">
      <section className="folder-creation-section">
        <div className="create-pile-div">
          <Link className="create-pile-button" to="/createpile">Create a Pile</Link>
        </div>

        <div className="folders-section">
          <div className="create-folder-section">
            <h2>My Folders</h2>
            <button>
              <AiOutlinePlus />
            </button>
          </div>
          <input type="text" placeholder="Search for a folder or a pile" />
          <div className="create-folder-container">
            <h3>Create a Folder...</h3>
            <File />
          </div>
        </div>
      </section>

      <section className="folder-container">
        <section className="folder-container-top">
          <h1>My Folder 01</h1>
          <div>
            <section>
              <input type="checkbox" id="selectAll" name="selectAll" />
              <label for="selectAll">Select all</label>
            </section>

            <section>
              <label for="sort">Sort By:</label>
              <select name="sort" id="sort">
                <option value="name">Name</option>
                <option value="date">Date</option>
              </select>
            </section>
          </div>
        </section>


        <div>
          <Pile />
          <div className="no-pile-view">
            <div>
              <h2>This folder is empty</h2>
              <p>Drag a pile into this folder or create a new pile</p>
            </div>
            <Link className="create-pile-button" to="../createpile">Create a Pile</Link>
            <button className="quick-tour-button">Take a quick tour</button>
          </div>
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
    </section>
  )
}