import { useTranslation } from "react-i18next"
import "../../../App.css"
import { HiDownload } from "react-icons/hi"

export default function ReportsView() {

  const { t } = useTranslation()

  return (
    <section className="reports-container">
      <div className="reports-buttons-container">

        <div className="reports-download-button">
          <button><HiDownload /> {t("Download")}</button>

          <select name="payment" id="payment">
            <option value="">Payments</option>
          </select>
        </div>
      </div>

      <div className="reports-list-container-manager-info">
          <section className="table-container">
            <table className="table-orders">
              <thead>
                <tr>
                  <th>{t("Name")}</th>
                  <th>{t("Email")}</th>
                  <th>{t("Date")}</th>
                  <th>{t("Amount")}</th>
                  <th>{t("Method")}</th>
                  <th>{t("Status")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>May Kenawi</td>
                  <td>name@example.com</td>
                  <td>11/08/2023</td>
                  <td>EGP 1000</td>
                  <td>Method</td>
                  <td>Status</td>
                </tr>

                <tr>
                  <td>May Kenawi</td>
                  <td>name@example.com</td>
                  <td>23/08/2023</td>
                  <td>EGP 1000</td>
                  <td>Method</td>
                  <td>Status</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
     </section>
  )
}