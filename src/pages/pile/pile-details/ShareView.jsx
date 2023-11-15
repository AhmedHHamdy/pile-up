import "../../../App.css"
import { PiQrCodeFill } from "react-icons/pi"
import { BsLink45Deg } from "react-icons/bs"
import { HiDownload } from "react-icons/hi"
import { AiOutlineMail } from "react-icons/ai"
import qrCodeImage from "../../../assets/qrcode.png"
import { Link, useOutletContext } from "react-router-dom"

export default function ShareView() {
  const pileData = useOutletContext()
  console.log(pileData)

  function handleLinkClick(event) {
    event.preventDefault()
  }

  return (
    <section className="share-page-container">
      <div className="share-page-qr-code">
        <h2><PiQrCodeFill/> Share With a QR Code</h2>
        <p>Share this QR code that will send people to your Pile Page URL</p>
        <div className="share-page-qr-code-container">
          <img src={qrCodeImage} alt="QR code image" />
          <div className="share-page-download-buttons">
            <a href="" download><HiDownload /> PNG</a>
            <a href="" download><HiDownload /> SVG</a>
          </div>
        </div>
      </div>

      <div className="share-page-link">
        <h2><BsLink45Deg /> Share with a link</h2>
        <p>Copy and share your pile URL</p>
        <div>
          <input type="text" />
          <button>Copy</button>
        </div>
        <button className="edit-link">Edit Link</button>
      </div>

      <div className="share-page-email">
        <h2><AiOutlineMail /> Share via email</h2>
        <p>Send invitations and track payments and responses</p>
        <Link onContextMenu={handleLinkClick} state={{pileId: pileData.id}} to="../../sendInvitation">Send a custom invitation</Link>
      </div>

    </section>
  )
}