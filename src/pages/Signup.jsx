import { Link } from "react-router-dom"
import pileupLogo from "../assets/pileup_logo.png"
import { useState } from "react"
import axios from "axios"

export default function Signup() {
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

  console.log(formData)

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('https://main.mahmoud.social/api/v1/auth/register', formData)
      .then(res => {
        console.log(res);
        // Check for validation errors in the response and provide user feedback if needed
        if (res.data.errors) {
          // Handle validation errors here, for example:
          // setErrorMessages(res.data.errors);
          console.log(res.data.errors)
        }
      })
      .catch(error => {
        console.error(error);
      });
  }


  return (
    <div className="signup-section">
      <img src={pileupLogo} alt="Pileup-logo" />
      <section className="signup-section-container">
        <div className="signup-section-text">
          <h1>Welcome!</h1>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
        
        <form onSubmit={handleSubmit} className="signup-section-form">
          <div className="signup-section-userinfo">
            <div className="first-name-input">
              <label htmlFor="first_name">First name</label>
              <input type="text" name="first_name" id="firstName" onChange={handleChange} />
            </div>

            <div className="last-name-input">
              <label htmlFor="last_name">Last name</label>
              <input type="text" name="last_name" id="lastName" onChange={handleChange} />
            </div>
          </div>

          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={handleChange} />

          {/* <label htmlFor="userName">Username <span>(only letters, numbers, and underscores)</span></label>
          <input type="text" name="userName" id="userName" onChange={handleChange} /> */}

          <label htmlFor="phone">phone</label>
          <input type="text" name="phone" id="phone" onChange={handleChange} />

          <label htmlFor="password">Password <span>(min. 8 char)</span></label>
          <input type="password" name="password" id="password" onChange={handleChange} />

          <label htmlFor="password_confirmation">Confirm Password</label>
          <input type="password" name="password_confirmation" id="password_confirmation" onChange={handleChange} />

          <button>Join</button>
        </form>
      </section>
    </div>
  )
}