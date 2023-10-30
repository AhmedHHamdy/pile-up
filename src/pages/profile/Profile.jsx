import { useEffect, useState } from "react"
import "../../App.css"
import axios from "axios"
import { Link } from "react-router-dom"
import { AiFillCloseCircle } from "react-icons/ai"

export default function Profile() {
  const [passwordFormOpen, setPasswordFormOpen] = useState(false)

  const openPasswordForm = () => {
    setPasswordFormOpen(true)
  }

  const closePasswordForm = () => {
    setPasswordFormOpen(false)
  }

  useEffect(() => {
    axios.get('https://main.mahmoud.social/api/v1/profile')
          .then(res => setFormData(res.data.data))
  }, [])

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    image: ''
  })

  console.log(formData)

  const [formPassword, setFormPassword] = useState({
    old_password: '',
    password: '',
    password_confirmation: ''
  })

  function handleChangePassword(even){
    const {name, value} = event.target
    setFormPassword(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  function handlePasswordFormSubmit(event) {
    event.preventDefault()
    if (formPassword.password == formPassword.password_confirmation) {
      axios.post("https://main.mahmoud.social/api/v1/profile/update-password", formPassword)
          .then(res => {
            console.log(res)
            setFormPassword({
              old_password: '',
              password: '',
              password_confirmation: ''
            })
            closePasswordForm()
          })
          .catch(err => console.log(err))
    } else {
      alert("password is not matching the confirmation")
    }
  }

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

    axios.post('https://main.mahmoud.social/api/v1/profile', formData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
        // console.error(err.response.data.message);
        // setErrMsg(err.response.data.message)
      });
  }

  return (
      <section className="profile-container">
        <div className="profile-header">
          <h1>Edit Profile</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="profile-form">

          <img src={formData.image} alt="" />
 
          <label htmlFor="first_name">First name</label>
          <input type="text" name="first_name" id="firstName" onChange={handleChange} value={formData.first_name} />

          <label htmlFor="last_name">Last name</label>
          <input type="text" name="last_name" id="lastName" onChange={handleChange} value={formData.last_name} />

          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={handleChange} value={formData.email} />

          <label htmlFor="phone">phone</label>
          <input type="text" name="phone" id="phone" onChange={handleChange} value={formData.phone} />

          {/* <label htmlFor="image">Image</label>
          <input type="file" name="image" id="image" onChange={handleChange}  /> */}

          <button>Save Profile</button>
        </form>

        <button className="change-password" onClick={openPasswordForm}>Change Password</button>
        
        {passwordFormOpen && 
        <div className="model-overlay-password-form">
          <div className="model-password-form password-form">
            <div className="password-form-header">
              <h1>Change Password</h1>
              <button type="button" onClick={closePasswordForm}><AiFillCloseCircle /></button>
            </div>

            <form onSubmit={handlePasswordFormSubmit}>
              <label htmlFor="old_password">Old Password</label>
              <input type="password" name="old_password" id="old_password" onChange={handleChangePassword} required value={formPassword.old_password} />

              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" onChange={handleChangePassword} required value={formPassword.password} />

              <label htmlFor="password_confirmation">Confirm Password</label>
              <input type="password" name="password_confirmation" id="password_confirmation" required onChange={handleChangePassword} value={formPassword.password_confirmation} />
              <button>Save</button>
            </form>
          </div>
        </div>}
      </section>
  )
}