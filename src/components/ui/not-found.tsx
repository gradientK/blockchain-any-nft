import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>The page you're looking for doesn't exist</p>
      <Link to="/">Return Home</Link>
    </div>
  )
}