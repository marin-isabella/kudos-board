import { Link } from 'react-router';
const NotFound = () => {
  return (
    <>
        <h1>404 Not Found</h1>
        <Link to="/">Back to Home</Link>
        <footer>
            <p>Copyright © 2025. Created by Isabella Marin.</p>
        </footer>
    </>
  )
}

export default NotFound;
