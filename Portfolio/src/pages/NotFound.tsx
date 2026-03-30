import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section id="center">
      <div>
        <h1>404</h1>
        <p>Page not found.</p>
        <p>
          <Link to="/">Go to home</Link>
        </p>
      </div>
    </section>
  )
}
