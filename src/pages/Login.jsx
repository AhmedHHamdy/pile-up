import { Link } from "react-router-dom"
import pileupLogo from "../assets/pileup_logo.png"

export default function Login() {
  return (
    <div className="login-section">
      <img src={pileupLogo} alt="pileup-logo" />
      <section className="login-section-container">
        <div className="login-section-text">
          <h1>Welcome Back!</h1>
          <p>Don't have an account? <Link to="/signup">Create one</Link></p>
        </div>
        
        <form className="login-section-form">
          <label htmlFor="">Email</label>
          <input type="email" name="" id="" />

          <label htmlFor="">Password</label>
          <input type="password" />

          <Link>Forgot your password?</Link>

          <button>Continue</button>
        </form>
      </section>
    </div>
  )
}