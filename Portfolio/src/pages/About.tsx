import { Link } from 'react-router-dom'

export default function About() {
  return (
    <section id="center">
      <div>
        <h1>About</h1>
        <p>This page is rendered via React Router.</p>
        <p>
          <Link to="/">Go back home</Link>
        </p>
      </div>
    </section>
  )
}
