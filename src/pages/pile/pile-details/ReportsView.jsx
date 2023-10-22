import "../../../App.css"
import { HiDownload } from "react-icons/hi"

export default function ReportsView() {
  return (
    <section className="reports-container">
      <div className="reports-buttons-container">

        <div className="reports-download-button">
          <button><HiDownload /> Download</button>

          <select name="payment" id="payment">
            <option value="">Payments</option>
          </select>
        </div>
      </div>

      <div className="reports-list-container-manager-info">
            <table>
              <colgroup span="4"></colgroup>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                </tr>

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
          </div>
    </section>
  )
}