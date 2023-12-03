import { useEffect, useState } from "react"
import "../../App.css"
import axios from "axios"
import { Link } from "react-router-dom"
import { AiFillCloseCircle } from "react-icons/ai"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useAuth } from "../../context/AuthProvider";

export default function Profile() {
  const [passwordFormOpen, setPasswordFormOpen] = useState(false)

  const { t } = useTranslation()

  const { token } = useAuth()

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/
  const [validPassword, setValidPassword] = useState(false);

  const [loadingStatus, setLoadingStatus] = useState(true)
  const [error, setError] = useState(null)

  const openPasswordForm = () => {
    setPasswordFormOpen(true)
  }

  const closePasswordForm = () => {
    setPasswordFormOpen(false)
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then(res => {
            setLoadingStatus(false)
            setFormData(res.data.data)
          })
          .catch(err => {
            setLoadingStatus(false)
            console.log(err); // Log any errors that occur
            setError(err.message)
          })
  }, [])

  // const [formData, setFormData] = useState({
  //   first_name: '',
  //   last_name: '',
  //   email: '',
  //   phone: '',
  //   image: null
  // })


  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
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

    if (name === "password") {
      const isPasswordValid = PWD_REGEX.test(value);
      setValidPassword(isPasswordValid);
    }
  }

  function handlePasswordFormSubmit(event) {
    event.preventDefault()
    if (formPassword.password == formPassword.password_confirmation && validPassword) {
      axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/profile/update-password`, formPassword)
          .then(res => {
            console.log(res)
            setFormPassword({
              old_password: '',
              password: '',
              password_confirmation: ''
            })
            closePasswordForm()
            toast.success("Password Changed")
          })
          .catch(err => {
            console.log(err)
            toast.error(err.message)
          })
    } else {
      toast.error("Please make sure your passwords match, and it follows the password change requirements (Password: 8-24 chars, at least 1 lowercase, 1 uppercase, 1 digit.)")
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

  function handleFileChange(event) {
    const selectedFile = event.target.files[0]
    setFormData((previousFormData) => ({
      ...previousFormData,
      image: selectedFile
    }))
  }

  function handleSubmit(event) {
    event.preventDefault();

    let inputNames = ["first_name", "last_name", "email", "phone"]
    const formDataa = new FormData(); // Create a new FormData object
  
    // Append the fields from pileFormData
    for (const key of inputNames) {
      formDataa.append(key, formData[key]);
    }
  
    // Append the file data
    // formDataa.append("image", formData.image);

    console.log(formDataa)

    axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/profile`, formDataa, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        console.log(res);
        toast.success('Saved')
      })
      .catch(err => {
        console.error(err);
        toast.error(err.message)
        // console.error(err.response.data.message);
        // setErrMsg(err.response.data.message)
      });
  }


  if (loadingStatus) {
    return (
      <Box sx={{ display: 'flex', justifyContent:"center", gridColumn: "8", alignSelf: "center", marginTop: "3rem" }}>
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
      <section className="profile-container">
        <ToastContainer />
        <div className="profile-header">
          <h1>{t("Edit Profile")}</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="profile-form">

          <img src={formData.image} alt="" />
 
          <label htmlFor="first_name">{t("First Name")}</label>
          <input type="text" name="first_name" id="firstName" onChange={handleChange} value={formData.first_name} />

          <label htmlFor="last_name">{t("Last Name")}</label>
          <input type="text" name="last_name" id="lastName" onChange={handleChange} value={formData.last_name} />

          <label htmlFor="email">{t("Email")}</label>
          <input type="email" name="email" id="email" onChange={handleChange} value={formData.email} />

          <label htmlFor="phone">{t("Phone")}</label>
          <input type="text" name="phone" id="phone" onChange={handleChange} value={formData.phone} />

          {/* <label htmlFor="image">Image</label>
          <input type="file" name="image" id="image" onChange={handleFileChange}  /> */}

          <button>{t("Save Profile")}</button>
        </form>

        <button className="change-password" onClick={openPasswordForm}>{t("Change Password")}</button>
        
        {passwordFormOpen && 
        <div className="model-overlay-password-form">
          <div className="model-password-form password-form">
            <div className="password-form-header">
              <h1>{t("Change Password")}</h1>
              <button type="button" onClick={closePasswordForm}><AiFillCloseCircle /></button>
            </div>

            <form onSubmit={handlePasswordFormSubmit}>
              <label htmlFor="old_password">{t("Old Password")}</label>
              <input type="password" name="old_password" id="old_password" onChange={handleChangePassword} required value={formPassword.old_password} />

              <label htmlFor="password">{t("Password")}</label>
              <input type="password" name="password" id="password" onChange={handleChangePassword} required value={formPassword.password} />

              <label htmlFor="password_confirmation">{t("Confirm Password")}</label>
              <input type="password" name="password_confirmation" id="password_confirmation" required onChange={handleChangePassword} value={formPassword.password_confirmation} />
              <button>{t("Save")}</button>
            </form>
          </div>
        </div>}
      </section>
  )
}