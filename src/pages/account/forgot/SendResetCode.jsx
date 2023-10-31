import { useEffect, useState } from "react"
import "../../../App.css"

export default function SendResetCode() {
  const [resetCodeForm, setResetCodeFrom] = useState(true) 
  const [enterResetCodeForm, setEnterResetCodeForm] = useState(true) 
  const [resetPasswordForm, setResetPasswordForm] = useState(true) 


  useEffect(() => {

  }, [])

  return (
    <section>
      {resetCodeForm &&
        <section className="send-reset-code-container">
          <h1>Reset Your Password</h1>
          <form>
            <label htmlFor="email">Email</label>
            <input type="email" name="username" id="email" placeholder="Email" />
            <button>Continue</button>
          </form>
        </section> 
      }

      {resetPasswordForm && 
        <section className="verify-reset-code-container">
          <h1>Enter Code</h1>
          <form>
            <label htmlFor="email">Email</label>
            <input type="username" name="username" id="email" placeholder="email"/>

            <label htmlFor="reset_code">Code</label>
            <input type="text" name="reset_code" id="reset_code" placeholder="####" />
            <button>Continue</button>
          </form>
        </section>
      }

      {enterResetCodeForm && 
        <section className="reset-password-container">
          <h1>Reset Your Password</h1>
          <form>
            <label htmlFor="password">New Password</label>
            <input type="password" name="password" id="password" placeholder="Enter new password" />

            <label htmlFor="password_confirmation">Password Confirmation</label>
            <input type="password" name="password_confirmation" id="password_confirmation" placeholder="Confirm new password" />
            <button>Save</button>
          </form>
        </section>
      }
    </section>
  )
}