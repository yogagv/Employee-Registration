import React, { useContext } from 'react'
import logo from '../assets/Colorful Creative Growth Concept Logo (1).png'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './adminpanel.css'
const AdminPanel = () => {

  const {user, dispatch} = useContext(AuthContext)

  const navigate = useNavigate();

  const handleLogout = () => {

    dispatch({type:'LOGOUT'})

    setTimeout(() => {
      navigate('/')
    },100)
  }

  return (
    <>
    <nav className='navbar container mx-auto p-4'>
                  <Link to='/'>
                  <div className="logo">
                  <img src={logo} alt="logo"/>
                  <h1 className='text-4xl'>Mayuras'</h1>
                  </div>
                  </Link>
                  <div className="links">
                      <ul>
                          <li><Link to='/'>Home</Link></li>
                          <li><Link to ="/adminList">Admin List</Link></li>
                          <li><Link to ="/empList">Employee List</Link></li>
                          {
                            user ? (<>
                            <p>{user.adminname}</p>
                            <li><Link onClick={handleLogout}>Logout</Link></li>
                            </>) 
                            : 
                            (<>
                            </>
                            )}
                      </ul>
                  </div>
              </nav>

              <h1 className='text-center text-4xl mt-5'>Admin Panel</h1>
              <div className="adminpanel">
                <h3 className='text-center'>Welcome to Admin Panel!</h3>
              </div>
    </>
  )
}

export default AdminPanel