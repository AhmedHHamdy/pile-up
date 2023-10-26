import "../../../App.css"

export default function ResetPassword() {
  return (
    <section className="reset-password-container">
      <h1>Reset Your Password</h1>
      <form>
        <label htmlFor="password">New Password</label>
        <input type="password" name="password" id="password" placeholder="Enter new password" />

        <label htmlFor="password_confirmation">Password Confirmation</label>
        <input type="password" name="password_confirmation" id="password_confirmation" placeholder="Confirm new password" />
      </form>
    </section>
  )
}