import { Link, useNavigate, Navigate } from "react-router-dom"
import pileupLogo from "../../../assets/pileup_logo.png"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useAuth } from "../../../context/AuthProvider"
import { useTranslation } from "react-i18next"

export default function Signup() {
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/

  const { token } = useAuth()

  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
  })

  const navigate = useNavigate()
  

  if (token) {
    console.log(token)
    return <Navigate to="/" />
  }


  const [validPassword, setValidPassword] = useState(false);
  const [validMatch, setValidMatch] = useState(false)

  const userRef = useRef()
  const errRef = useRef()

  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [formData])

  function handleChange(event) {
    const {name, value} = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })

    if (name === "password") {
      const isPasswordValid = PWD_REGEX.test(value);
      setValidPassword(isPasswordValid);
    } else if (name === "password_confirmation") {
      setValidMatch(value === formData.password);
    }
  }

  console.log(formData)
  console.log(validPassword)

  async function handleSubmit(event) {
    event.preventDefault();



    try {

      if (!validPassword) {
        setErrMsg('Password does not meet the requirements')
        return
      }

      if (!validMatch) {
        setErrMsg('Passwords do not match')
        return;
      }



      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/auth/register`, formData)
      const data = response.data.data
      console.log(data)
      
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: ''
      })

      if (data.token) {
        navigate("/login")
      }

    } catch (err) {
      console.error(err.response.data.message);
      setErrMsg(err.response.data.message)
    }
  }


  return (
    <div className="signup-section">
      <img src={pileupLogo} alt="Pileup-logo" />
      <section className="signup-section-container">
        <div className="signup-section-text">
          <h1>{t("Welcome!")}</h1>
          <p>{t("Already have an account?")} <Link to="/login">{t("Login")}</Link></p>
        </div>
        
        <p ref={errRef} className={errMsg ? "err-msg" : "offscreen"} aria-live="assertive">{errMsg}</p>

        <form onSubmit={handleSubmit} className="signup-section-form">
          <div className="signup-section-userinfo">
            <div className="first-name-input">
              <label htmlFor="first_name">{t("First Name")}</label>
              <input type="text" name="first_name" id="firstName" required onChange={handleChange} ref={userRef} value={formData.first_name} />
            </div>

            <div className="last-name-input">
              <label htmlFor="last_name">{t("Last Name")}</label>
              <input type="text" name="last_name" id="lastName" required onChange={handleChange} value={formData.last_name} />
            </div>
          </div>

          <label htmlFor="email">{t("Email")}</label>
          <input type="email" name="email" id="email" onChange={handleChange} required value={formData.email} />

          <label htmlFor="phone">{t("Phone")}</label>
          <input type="text" name="phone" id="phone" onChange={handleChange} required value={formData.phone} />

          <label htmlFor="password">{t("Password")} <span>({t("min. 8 Char")})</span></label>
          <input type="password" name="password" id="password" onChange={handleChange} required value={formData.password} />

          <label htmlFor="password_confirmation">{t("Confirm Password")}</label>
          <input type="password" name="password_confirmation" id="password_confirmation" required onChange={handleChange} value={formData.password_confirmation} />

          <button>{t("Join")}</button>
        </form>
      </section>
    </div>
  )
}