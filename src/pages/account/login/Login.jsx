import { Link, useNavigate, Navigate } from "react-router-dom"
import pileupLogo from "../../../assets/pileup_logo.png"
import { useState, useRef, useEffect, useContext } from "react"
import axios from "axios"
import { useAuth } from "../../../context/AuthProvider"
import { useTranslation } from "react-i18next"

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const { setToken, token } = useAuth()

  const { t } = useTranslation()

  if (token) {
    console.log(token)
    return <Navigate to="/" />
  }

  const navigate = useNavigate()

  const userRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [formData])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/auth/login`, formData)
      const data = response.data.data
      console.log(response)
      
      setToken(data.token)
  
      if (data.token) {
        navigate('/dashboard/folders')
      }

    } catch (err) {
      console.log(err.response.data.message)
      if (err.response.data.message == "الحقل اسم المُستخدم غير موجود") {
        setErrMsg("Wrong Password or Email")
      } else if (err.response.data.message == "يجب أن يكون طول نص كلمة المرور على الأقل 6 حروفٍ/حرفًا") {
        setErrMsg('The length of the password must be at least 6 characters')
      } else {
        setErrMsg(err.response.data.message)
      }
      errRef.current.focus()
    }

  }


  return (
    <div className="login-section">
      <img src={pileupLogo} alt="pileup-logo" />
      <section className="login-section-container">
        <div className="login-section-text">
          <h1>{t("Welcome Back!")}</h1>
          <p>{t("Don't have an account?")} <Link to="/signup">{t("Create one")}</Link></p>
        </div>

        <p ref={errRef} className={errMsg ? "err-msg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        
        <form className="login-section-form" onSubmit={handleSubmit}>
          <label htmlFor="userName">{t("Email")}</label>
          <input type="email" name="username" id="userName" onChange={handleChange} ref={userRef} value={formData.username} required />

          <label htmlFor="password">{t("Password")}</label>
          <input type="password" name="password" id="password" onChange={handleChange} value={formData.password} required />

          <Link to="/sendResetCode">{t("Forgot your password?")}</Link>

          <button>{t("Continue")}</button>
        </form>
      </section>
    </div>
  )
}