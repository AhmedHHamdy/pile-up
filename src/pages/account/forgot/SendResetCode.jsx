import "../../../App.css"

export default function SendResetCode() {
  return (
    <section className="send-reset-code-container">
      <h1>Reset Your Password</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" name="username" id="email" placeholder="Email" />
      </form>
    </section>
  )
}