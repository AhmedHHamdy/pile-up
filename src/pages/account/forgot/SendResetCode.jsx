import { useEffect, useState } from "react"
import "../../../App.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SendResetCode() {
  const [resetCodeFormContainer, setResetCodeFormContainer] = useState(true) 
  const [resetPasswordFormContainer, setResetPasswordFormContainer] = useState(false)
  const [enterResetCodeFormContainer, setEnterResetCodeFormContainer] = useState(false) 

  const [emailForm, setEmailForm] = useState({username: ''})
  const [resetCodeForm, setResetCodeForm] = useState({username: '', reset_code: ''})
  const [resetPasswordForm, setResetPasswordForm] = useState({username: '', reset_code: '', password: '', password_confirmation:''})

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/
  const [validPassword, setValidPassword] = useState(false);
  const [validMatch, setValidMatch] = useState(false)

  const navigate = useNavigate()

  console.log(resetPasswordForm)

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('https://main.mahmoud.social/api/v1/auth/send-reset-code', emailForm)
    .then(res => {
      console.log(res)
      if (res.status == 200) {
        setResetCodeForm({...resetCodeForm, username: emailForm.username})
        setResetCodeFormContainer(false)
        setResetPasswordFormContainer(true)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }


  function handleResetCodeSubmit(event) {
    event.preventDefault()
    axios.post('https://main.mahmoud.social/api/v1/auth/send-reset-code', resetCodeForm)
    .then(res => {
      console.log(res)
      if (res.status == "200") {
        console.log(res)
        setResetPasswordForm({...resetPasswordForm, username: resetCodeForm.username, reset_code:resetCodeForm.reset_code})
        setResetPasswordFormContainer(false)
        setEnterResetCodeFormContainer(true)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }


  function handlePasswordChange(event) {
    const {name, value} = event.target
    setResetPasswordForm(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })

    if (name === "password") {
      const isPasswordValid = PWD_REGEX.test(value);
      setValidPassword(isPasswordValid);
      // setValidMatch(isPasswordValid && value === resetPasswordForm.password_confirmation);
    } else if (name === "password_confirmation") {
      setValidMatch(value === resetPasswordForm.password );
    }
  }


  function handleResetPasswordSubmit(event) {
    event.preventDefault()
    console.log(validMatch, validPassword)
  
    if (!validPassword) {
      toast.error('Password must meet these criteria: At least 1 lowercase letter, 1 uppercase letter, 1 digit and be 8-24 characters long.')
      return;
    }


    if (!validMatch) {
      toast.error('Passwords do not match')
      return;
    }



    if (validMatch && validPassword) {
      axios.post('https://main.mahmoud.social/api/v1/auth/reset-password', resetPasswordForm)
      .then(res => {
        console.log(res)
        if (res.status == "200") {
          console.log(res)
          setResetPasswordForm({...resetPasswordForm, username: resetCodeForm.username, reset_code:resetCodeForm.reset_code})
          setResetPasswordFormContainer(false)
          setEnterResetCodeFormContainer(true)
          toast.success("Password Changed")
          navigate('/login', { replace: true });
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  return (
    <section>
      <ToastContainer />
      {resetCodeFormContainer &&
        <section className="send-reset-code-container">
          <h1>Reset Your Password</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" name="username" id="email" placeholder="Email" required value={emailForm.username} onChange={(event) => setEmailForm({...emailForm, username: event.target.value})}/>
            <button>Continue</button>
          </form>
        </section> 
      }

      {resetPasswordFormContainer && 
        <section className="verify-reset-code-container">
          <h1>Enter Code</h1>
          <form onSubmit={handleResetCodeSubmit}>
            <label htmlFor="email">Email</label>
            <input type="username" name="username" id="email" placeholder="email" required value={resetCodeForm.username} onChange={(event) => setResetCodeForm({...resetCodeForm, username: event.target.value})}/>

            <label htmlFor="reset_code">Code</label>
            <input type="text" name="reset_code" id="reset_code" placeholder="####" required value={resetCodeForm.reset_code} onChange={(event) => setResetCodeForm({...resetCodeForm, reset_code: event.target.value})} />
            <button>Continue</button>
          </form>
        </section>
      }

      {enterResetCodeFormContainer && 
        <section className="reset-password-container">
          <h1>Reset Your Password</h1>
          <form onSubmit={handleResetPasswordSubmit}>
            <label htmlFor="password">New Password</label>
            <input type="password" name="password" id="password" placeholder="Enter new password" value={resetPasswordForm.password} onChange={handlePasswordChange} required />

            <label htmlFor="password_confirmation">Password Confirmation</label>
            <input type="password" name="password_confirmation" id="password_confirmation" placeholder="Confirm new password" value={resetPasswordForm.password_confirmation} onChange={handlePasswordChange} required />
            <button>Save</button>
          </form>
        </section>
      }
    </section>
  )
}