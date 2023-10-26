import "../../../App.css"

export default function VerifyResetCode() {
  return (
    <section className="verify-reset-code-container">
      <h1>Enter Code</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input type="username" name="username" id="email" placeholder="email"/>

        <label htmlFor="reset_code">Code</label>
        <input type="text" name="reset_code" id="reset_code" placeholder="####" />
      </form>
    </section>
  )
}