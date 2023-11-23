import "../../../App.css"
import { PiQrCodeFill } from "react-icons/pi"
import { BsLink45Deg } from "react-icons/bs"
import { HiDownload } from "react-icons/hi"
import { AiOutlineMail } from "react-icons/ai"
import qrCodeImage from "../../../assets/qrcode.png"
import { Link, useOutletContext } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function ShareView() {
  const pileData = useOutletContext()
  console.log(pileData)

  const { t } = useTranslation()

  function handleLinkClick(event) {
    event.preventDefault()
  }

  return (
    <section className="share-page-container">
      <div className="share-page-qr-code">
        <h2><PiQrCodeFill/> {t("Share With a QR Code")}</h2>
        <p>{t("Share this QR code that will send people to your Pile Page URL")}</p>
        <div className="share-page-qr-code-container">
          <img src={qrCodeImage} alt="QR code image" />
          <div className="share-page-download-buttons">
            <a href="" download><HiDownload /> PNG</a>
            <a href="" download><HiDownload /> SVG</a>
          </div>
        </div>
      </div>

      <div className="share-page-link">
        <h2><BsLink45Deg /> {t("Share with a link")}</h2>
        <p>{t("Copy and share your pile URL")}</p>
        <div>
          <input type="text" value={`PileUp.com/dashboard/folders/pileview/${pileData.id}`}/>
          <button>{t("Copy")}</button>
        </div>
        <button className="edit-link">{t("Edit Link")}</button>
      </div>

      <div className="share-page-email">
        <h2><AiOutlineMail /> {t("Share via email")}</h2>
        <p>{t("Send invitations and track payments and responses")}</p>
        <Link onContextMenu={handleLinkClick} state={{pileId: pileData.id}} to="../../sendInvitation">{t("Send a custom invitation")}</Link>
      </div>

    </section>
  )
}