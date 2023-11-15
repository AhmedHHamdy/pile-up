import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found-container">
      <h1>Oops, we couldn't find this page.</h1>
      <Link to={"/"}>Back to PileUp</Link>
    </section>
  )
}