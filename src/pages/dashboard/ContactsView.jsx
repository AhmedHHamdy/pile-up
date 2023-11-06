import { useEffect, useState } from "react";
import "../../App.css"
import axios from "axios";

export default function ContactsView() {
  const [contactsData, setContactsData] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/contacts/list`)
          .then(res => {
            console.log(res)
            setContactsData(res.data.data)
          })
          .catch(err => {
            console.log(err)
          })
  }, [])


  return (
    <>
    <table className="table-orders">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {contactsData.map(contact => {
          return (
            <tr>
              <td>{contact.id}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
            </tr>
          );
        })}
      </tbody>
    </table>

    </>
  )
}