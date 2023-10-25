import { useState } from "react"
import "../../App.css"
import axios from "axios"
import { Link } from "react-router-dom"

export default function Profile() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
  })

  function handleChange(event) {
    const {name, value} = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })

  }

  function handleSubmit(event) {
    event.preventDefault();

    // if (!validMatch) {
    //   setErrMsg('Passwords do not match')
    //   return;
    // }

    if (!validPassword) {
      setErrMsg('Password does not meet the requirements')
    }

    axios.post('https://main.mahmoud.social/api/v1/auth/register', formData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err.response.data.message);
        setErrMsg(err.response.data.message)
      });
  }

  return (
      <section className="profile-container">
        <div className="profile-header">
          <h1>Edit Profile</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="profile-form">
 
          <label htmlFor="first_name">First name</label>
          <input type="text" name="first_name" id="firstName" onChange={handleChange} value={formData.first_name} />

          <label htmlFor="last_name">Last name</label>
          <input type="text" name="last_name" id="lastName" onChange={handleChange} value={formData.last_name} />


          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={handleChange} value={formData.email} />

          {/* <label htmlFor="userName">Username <span>(only letters, numbers, and underscores)</span></label>
          <input type="text" name="userName" id="userName" onChange={handleChange} /> */}

          <label htmlFor="phone">phone</label>
          <input type="text" name="phone" id="phone" onChange={handleChange} value={formData.phone} />

          {/* <label htmlFor="password">Password <span>(min. 8 char)</span></label>
          <input type="password" name="password" id="password" onChange={handleChange} required value={formData.password} />

          <label htmlFor="password_confirmation">Confirm Password</label>
          <input type="password" name="password_confirmation" id="password_confirmation" required onChange={handleChange} value={formData.password_confirmation} /> */}

          <button>Save Profile</button>
        </form>
      </section>
  )
}