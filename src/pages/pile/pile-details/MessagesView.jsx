import { useTranslation } from "react-i18next"
import "../../../App.css"
import { HiDownload } from "react-icons/hi"
import { useState, useEffect } from "react"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from "axios"

export default function MessagesView() {

  const [messagesList, setMessagesList] = useState([])
  console.log(messagesList)

  const [loadingStatus, setLoadingStatus] = useState(true)
  const [error, setError] = useState(null)

  const { t } = useTranslation()

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/piles/messages/31`)
        .then(res => {
          setLoadingStatus(false)
          console.log(res)
          setMessagesList(res.data.data)
        })
        .catch(err => {
          setLoadingStatus(false)
          console.log(err);
          setError(err.response.data.message)
        })
  }, [])

  if (loadingStatus) {
    return (
      <Box sx={{ display: 'flex', justifyContent:"center", alignSelf: "center", marginTop: "5rem" }}>
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
    <section className="reports-container" style={{ margin: "1rem 1rem" }}>
      <h1>{t("Messages")}</h1>
      <div className="reports-list-container-manager-info">
          <section className="table-container">
            <table className="table-orders">
              <thead>
                <tr>
                  <th>{t("Name")}</th>
                  <th>{t("Email")}</th>
                  <th>{t("title")}</th>
                  <th>{t("content")}</th>
                  <th>{t("Message Type")}</th>
                </tr>
              </thead>
              <tbody>
                {messagesList.map(m => {
                  return (
                    <tr key={m.id}>
                      <td>{m.user.first_name} {m.user.last_name}</td>
                      <td>{m.user.email}</td>
                      <td>{m.title}</td>
                      <td>{m.content}</td>
                      <td>{m.msg_type}</td>
                    </tr>
                  )
                })}

      
              </tbody>
            </table>
          </section>
        </div>
     </section>
  )
}