import { Link } from "react-router-dom"
import pileupLogo from "../assets/pileup_logo.png"

export default function Signup() {
  return (
    <div className="signup-section">
      <img src={pileupLogo} alt="" />
      <section className="signup-section-container">
        <div className="signup-section-text">
          <h1>Welcome!</h1>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
        
        <form className="signup-section-form">
          <div className="signup-section-userinfo">
            <div className="first-name-input">
              <label htmlFor="">First name</label>
              <input type="text" name="" id="" />
            </div>

            <div className="last-name-input">
              <label htmlFor="">Last name</label>
              <input type="text" name="" id="" />
            </div>
          </div>

          <label htmlFor="">Email</label>
          <input type="email" name="" id="" />

          <label htmlFor="">Username <span>(only letters, numbers, and underscores)</span></label>
          <input type="email" name="" id="" />

          <label htmlFor="">Password <span>(min. 8 char)</span></label>
          <input type="password" />

          <button>Join</button>
        </form>
      </section>
    </div>
  )
}