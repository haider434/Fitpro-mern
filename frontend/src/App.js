import { BrowserRouter, Routes,Navigate,Route } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const {user} = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={user ? <Home />: <Navigate to='/login'  replace={true}/>}
            />
            <Route 
              path="/login" 
              element={!user ? <Login />: <Navigate to='/'  replace={true}/>}
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup />: <Navigate to='/'  replace={true}/>} 
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
