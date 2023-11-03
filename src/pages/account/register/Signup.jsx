import { Link, useNavigate } from "react-router-dom"
import pileupLogo from "../../../assets/pileup_logo.png"
import { useEffect, useRef, useState } from "react"
import axios from "axios"

export default function Signup() {
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
  })

  const navigate = useNavigate()
  
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
          <h1>Welcome!</h1>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
        
        <p ref={errRef} className={errMsg ? "err-msg" : "offscreen"} aria-live="assertive">{errMsg}</p>

        <form onSubmit={handleSubmit} className="signup-section-form">
          <div className="signup-section-userinfo">
            <div className="first-name-input">
              <label htmlFor="first_name">First name</label>
              <input type="text" name="first_name" id="firstName" required onChange={handleChange} ref={userRef} value={formData.first_name} />
            </div>

            <div className="last-name-input">
              <label htmlFor="last_name">Last name</label>
              <input type="text" name="last_name" id="lastName" required onChange={handleChange} value={formData.last_name} />
            </div>
          </div>

          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={handleChange} required value={formData.email} />

          <label htmlFor="phone">phone</label>
          <input type="text" name="phone" id="phone" onChange={handleChange} required value={formData.phone} />

          <label htmlFor="password">Password <span>(min. 8 char)</span></label>
          <input type="password" name="password" id="password" onChange={handleChange} required value={formData.password} />

          <label htmlFor="password_confirmation">Confirm Password</label>
          <input type="password" name="password_confirmation" id="password_confirmation" required onChange={handleChange} value={formData.password_confirmation} />

          <button>Join</button>
        </form>
      </section>
    </div>
  )
}