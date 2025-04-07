import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import logo from '../assets/Colorful Creative Growth Concept Logo (1).png';
import Register from '../assets/signup-image.jpg'
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import { FaMobileScreenButton } from "react-icons/fa6";
import { MdOutlineWorkOutline } from "react-icons/md";
import { TbGenderBigender } from "react-icons/tb";
import { FaFileImage } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL, token } from '../utils/config';
import { AuthContext } from '../context/AuthContext';
import './employeeregister.css'


const EmployeeRegister = () => {
  
  const [credentials, setCredentials] = useState({

    empname: undefined,
    email: undefined,
    password: undefined,
    mobno: undefined,
    designation: undefined,
    gender: undefined,
    empImage: undefined,

  })

  const {id} = useParams();

  const {user, dispatch} = useContext(AuthContext)

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {

    setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}));

    setErrors((prev)=>({...prev, [e.target.id]: ""}))

  }

  //reset the values once user signed up

  const validateForm = () => {

    let errors = {}

    if(!credentials.empname) {

      errors.empname = 'Employee name Required!';
    }

    if(!credentials.email) {

      errors.email = 'Email is Required!';
    }

    if(!credentials.password) {

      errors.password = 'Password is Required!'
    }

    if(!credentials.mobno) {

      errors.mobno = 'Mobile no is Required!'
    }

    if(!credentials.designation) {

      errors.designation = 'Designation is Required!'
    }

    if(!credentials.gender) {

        errors.gender = 'Gender is Required!'
    }

    if(!credentials.empImage) {

      errors.empImage = 'image is Required! only upload png, jpg, jpeg'
    }

    setErrors(errors);

    return Object.keys(errors).length === 0 ;

  }


  useEffect(()=>{
      setCredentials({
        empname: "",
        email: "",
        password: "",
        mobno: "",
        designation: "",
        gender: "",
        empImage: "",
      })
  },[])


  const handleLogout = () => {

    dispatch({ type: 'LOGOUT' });

    setTimeout(() => {
      navigate('/')
    }, 100)

  }


  const handleSubmit = async (e) => {
        
    e.preventDefault();

    if(validateForm()) {

      if(!token) {
        toast.error(errors.message)
        return;
      }

      try {


        const res = await fetch(`${BASE_URL}/empAuth/registerEmployee/${id}`, {
          method: 'POST',
          headers: {'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(credentials)
        })

        const result = await res.json()

        if(!res.ok) {

          toast.error(result.message)
          return;
        }

         toast.success(result.message)

      }catch(error) {
          
        toast.error("Error creating employee", error)
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
                          <li><Link to='/empList'>Employee List</Link></li>
                          {user ? (<>
                           <p>{user.adminname}</p>
                           <li><Link to={handleLogout}>Logout</Link></li>
                          </>) : 
                          (<>
                          </>)}
                      </ul>
                  </div>
              </nav>

      <h1 className='text-center text-4xl mt-5'>Employee Registration</h1>
      <p className='text-center mt-2'>Create your Account!!!</p>
      <div className="form-data flex-2">
        <div className='form-details'>
          <h3 className='text-4xl p-5 m-4 text-center'>Sign Up</h3>
          <form action="" onSubmit={handleSubmit}>

            <div className='form-input'>
              <FaRegUser className='icon' />
              <input 
              type="text" 
              placeholder='Enter your name' 
              id='empname'
              onChange={handleChange}  />
              </div>
              <div>
              {errors.empname && <span className="error">{errors.empname}</span>}
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

            <div className='form-input mt-2'>
              <MdOutlineWorkOutline className='icon' />
              <select
              id='designation'
              onChange={handleChange}
              defaultValue="">
              <option value="" disabled className=''>Select your Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Team Lead">Team Lead</option>
              <option value="Sr. Developer">Sr. Developer</option>
              <option value="Developer">Developer</option>
              <option value="SDE I">SDE I</option>
              <option value="SDE II">SDE II</option>
              <option value="Accountant">Accountant</option>
              </select>
              </div>
              <div>
              {errors.designation && <span className="error">{errors.designation}</span>}
            </div>
            
            <div className='form-input gender-input mt-3 mb-3'>
              <TbGenderBigender className='icon' />
              <div className="radio-group">
              <label>
              <input
              type="radio"
              name="gender"
              id="gender"
              value="Male"
              onChange={handleChange}/>
              Male
              </label>
              <label>
              <input
              type="radio"
              name="gender"
              id="gender" 
              value="Female"
              onChange={handleChange}/>
              Female
              </label>
              <label>
              <input
              type="radio"
              name="gender"
              id="gender"
              value="Thirdgender"
              onChange={handleChange}/>
              Thirdgender
              </label>
  </div>
              </div>
              <div>
              {errors.gender && <span className="error">{errors.gender}</span>}
            </div>

            <div className='form-input'>
              <FaFileImage className='icon' />
              <input 
              type="url" 
              id='empImage'
              placeholder='Enter image url'
              accept="image/png, image/jpeg, image/jpg" 
              onChange={handleChange} />
              </div>
              <div>
              {errors.empImage && <span className="error">{errors.empImage}</span>}
            </div>


            <button className='submit mt-7 ml-20 px-5 py-2 border border-indigo-500 text-indigo-800 rounded-md hover:bg-indigo-900 hover:text-white'>Register</button>
            <p className='mt-6'>Already Have an Account ?
              <Link to='/empLogin' className='text-indigo-800'>  Sign in</Link>
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

export default EmployeeRegister