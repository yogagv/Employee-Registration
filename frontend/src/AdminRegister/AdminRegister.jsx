import React, { useEffect, useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import { FaMobileScreenButton } from "react-icons/fa6";
import Register from '../assets/signup-image.jpg'
import './adminregister.css'
import { Link, useNavigate  } from 'react-router-dom';
import { BASE_URL } from '../utils/config.js'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import logo from '../assets/Colorful Creative Growth Concept Logo (1).png'

const AdminRegister = () => {

  const [credentials, setCredentials] = useState({
    adminname: undefined,
    email: undefined,
    password: undefined,
    mobno: undefined
  })

  const [errors, setErrors] = useState({});


  const navigate = useNavigate();

  const handleChange = (e) => {
      
    setCredentials((prev)=>({...prev, [e.target.id]: e.target.value}))

    //for clearing error message once user enters the value
    setErrors((prev) => ({...prev, [e.target.id]: ""}))
  } 


  //reset the values once user singned up

  useEffect(() => {
    setCredentials({
        adminname: "",
        email: "",
        password: "",
        mobno: ""
    });
}, []);


  const validateForm = () => {

    let errors = {}

    if(!credentials.adminname) {

      errors.adminname = 'Admin name Required!';
    }
       
    
    if(!credentials.email) {
    
        errors.email ='Email is Required!'; 
    }
    
    
    if(!credentials.password) {
    
        errors.password = 'Password is Required.'
    }
    
    if(!credentials.mobno) {
    
        errors.mobno = 'Mobile no is Required.';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;

  }

 


  const handleClick = async (e) => {

        e.preventDefault();

        if(validateForm()) {

        try {

          const res = await fetch(`${BASE_URL}/auth/registerAdmin`,{
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(credentials)
          })

          const result = await res.json()

          if (!res.ok) {
            //this validates from backend
              toast.error(result.message);
              return;
            }

          toast.success(result.message);

          setTimeout(()=>{
            navigate('/adminLogin');
          },3000)

        } catch(error) {

            toast.error('Something went wrong. Please try again.', error) 
        }
      } 
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
                          <li><Link to ="/adminLogin">Admin Login</Link></li>
                      </ul>
                  </div>
              </nav>

      <h1 className='text-center text-4xl mt-5'>Admin Registration</h1>
      <p className='text-center mt-2'>Create your Account!!!</p>
      <div className="form-data flex-2">
        <div className='form-details'>
          <h3 className='text-4xl p-5 m-4 text-center'>Sign Up</h3>
          <form action="" onSubmit={handleClick}>

            <div className='form-input'>
              <FaRegUser className='icon' />
              <input 
              type="text" 
              placeholder='Enter your name' 
              id='adminname'
              onChange={handleChange}  />
              </div>
              <div>
              {errors.adminname && <span className="error">{errors.adminname}</span>}
            </div>

            <div className='form-input'>
              <MdOutlineMail className='icon' />
              <input 
              type="text" 
              placeholder='Enter your email' 
              id='email' 
              onChange={handleChange} />
              </div>
              <div>
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className='form-input'>
              <TbPassword className='icon' />
              <input 
              type="password" 
              placeholder='Enter your password' 
              id='password' 
              onChange={handleChange} />
              </div>
              <div>
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <div className='form-input'>
              <FaMobileScreenButton className='icon' />
              <input 
              type="text" 
              placeholder='Enter your mobileno' 
              id='mobno' 
              onChange={handleChange} />
              </div>
              <div>
              {errors.mobno && <span className="error">{errors.mobno}</span>}
            </div>

            <button className='submit mt-7 ml-20 px-5 py-2 border border-indigo-500 text-indigo-800 rounded-md hover:bg-indigo-900 hover:text-white'>Register</button>
            <p className='mt-6'>Already Have an Account ?
              <Link to='/' className='text-indigo-800'>  Sign in</Link>
            </p>
          </form>
        </div>
        <div className='form-image'>
          <img src={Register} alt="logo" />
        </div>
      </div>

      {/* Add ToastContainer here */}
      <ToastContainer position="top-right" className='mt-20'/>
    </>
  )
}

export default AdminRegister