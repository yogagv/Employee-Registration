import React from 'react'
import logo from '../assets/Colorful Creative Growth Concept Logo (1).png'
import './home.css'
import AdminLogin from '../AdminLogin/AdminLogin'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
const Home = () => {


  return (
    <>
        <nav className='navbar container mx-auto p-4'>
            <Link to='/'>
            <div className="logo">
            <img src={logo} alt="logo"/>
            <h1 className='text-4xl'>Mayuras'</h1>
            </div>
            </Link>
            <div class="hamburger">
            <div class="line1"></div>
            <div class="line2"></div>
            </div>
            <div className="links">
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to ="/empLogin">Employee Login</Link></li>
                </ul>
            </div>
        </nav>
            <AdminLogin />
    </>
  )
}

export default Home