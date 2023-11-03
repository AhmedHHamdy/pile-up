import { Link, useNavigate } from "react-router-dom"
import pileupLogo from "../../../assets/pileup_logo.png"
import { useState, useRef, useEffect, useContext } from "react"
import axios from "axios"
import { useAuth } from "../../../context/AuthProvider"

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const { setToken } = useAuth()
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
      if (!err.response) {
        setErrMsg("No Server Response")
      } else if (err.response.status == 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.response.status == 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login Failed')
      }
      errRef.current.focus()
    }

  }

  return (
    <div className="login-section">
      <img src={pileupLogo} alt="pileup-logo" />
      <section className="login-section-container">
        <div className="login-section-text">
          <h1>Welcome Back!</h1>
          <p>Don't have an account? <Link to="/signup">Create one</Link></p>
        </div>

        <p ref={errRef} className={errMsg ? "err-msg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        
        <form className="login-section-form" onSubmit={handleSubmit}>
          <label htmlFor="userName">Username</label>
          <input type="text" name="username" id="userName" onChange={handleChange} ref={userRef} value={formData.username} required />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" onChange={handleChange} value={formData.password} required />

          <Link to="/sendResetCode">Forgot your password?</Link>

          <button>Continue</button>
        </form>
      </section>
    </div>
  )
}