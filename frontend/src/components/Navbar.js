import { Link } from 'react-router-dom'
import  {useLogout}  from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';
const Navbar = () => {
  const {user} = useAuthContext(); // Use destructuring to extract user from the context
  const  logout  = useLogout(); // Make sure to destructure logout from useAuthContext

  const handleClick = () => {
    logout(); // Call the logout function
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1  style={{color:"#1aac83"}}>Fit Pro</h1>
        </Link>
        <nav>
          {user && (<div>
            <span>{user.email}</span>
            <button onClick={handleClick}>Logout</button>
          </div>)}
         {!user && ( <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>)}
        </nav>
      </div>
    </header>
  )
}

export default Navbar