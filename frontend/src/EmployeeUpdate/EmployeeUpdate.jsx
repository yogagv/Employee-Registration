import React, { useContext, useState } from 'react'
import logo from '../assets/Colorful Creative Growth Concept Logo (1).png'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Register from '../assets/signup-image.jpg'
import { BASE_URL, token } from '../utils/config';
import { toast, ToastContainer } from 'react-toastify';
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import { FaMobileScreenButton } from "react-icons/fa6";
import { MdOutlineWorkOutline } from "react-icons/md";
import { TbGenderBigender } from "react-icons/tb";
import { FaFileImage } from "react-icons/fa";

const EmployeeUpdate = () => {

  const [employeeUpdate, setEmployeeUpdate] = useState({

    empname: undefined,
    email: undefined,
    password: undefined,
    mobno: undefined,
    designation: undefined,
    gender: undefined,
    empImage: undefined,

  });

  const { id } = useParams();
  
  const {user, dispatch} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {

    dispatch({type:'LOGOUT'})

    setTimeout(() => {
      navigate('/')
    },100)

  }

  const handleChange = (e) => {

      setEmployeeUpdate((prev) => ({...prev, [e.target.id]:e.target.value}))      
  }

  const handleSubmit = async(e) => {

      e.preventDefault();


      try {

        const res = await fetch(`${BASE_URL}/employee/updateEmployee/${id}`,{
          method:'PUT',
          headers: {'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(employeeUpdate)
          })

          const result = await res.json()

          if(!res.ok) {

            toast.error(result.message)
            return;
           }

           toast.success(result.message)

           setTimeout(()=>{
            navigate('/empList')
           },1000)

      } catch(error) {

          toast.error("Error creating employee", error)
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

                  <h1 className='text-center text-4xl mt-5'>Employee Edit</h1>
      <p className='text-center mt-2'>Edit your Employee Details!!!</p>
      <div className="form-data flex-2">
        <div className='form-details'>
          <h3 className='text-4xl p-5 m-4 text-center'>Edit</h3>
          <form action="" onSubmit={handleSubmit}>

            <div className='form-input'>
              <FaRegUser className='icon' />
              <input 
              type="text" 
              placeholder='Enter your name' 
              id='empname'
              onChange={handleChange}  />
              </div>

            <div className='form-input'>
              <MdOutlineMail className='icon' />
              <input 
              type="text" 
              placeholder='Enter your email' 
              id='email'
              disabled 
              onChange={handleChange} />
              </div>

            <div className='form-input'>
              <TbPassword className='icon' />
              <input 
              type="password" 
              placeholder='Enter your password' 
              id='password' 
              onChange={handleChange} />
              </div>
    
            <div className='form-input'>
              <FaMobileScreenButton className='icon' />
              <input 
              type="text" 
              placeholder='Enter your mobileno' 
              id='mobno' 
              onChange={handleChange} />
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
            
            <div className='form-input gender-input mt-3 mb-3'>
              <TbGenderBigender className='icon' />
              <div className="radio-group">
              <label>
              <input
              type="radio"
              name="gender"
              id="male"
              value="Male"
              onChange={handleChange}/>
              Male
              </label>
              <label>
              <input
              type="radio"
              name="gender"
              id="female" 
              value="Female"
              onChange={handleChange}/>
              Female
              </label>
              <label>
              <input
              type="radio"
              name="gender"
              id="thirdgender"
              value="Thirdgender"
              onChange={handleChange}/>
              Thirdgender
              </label>
  </div>
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

            <button className='submit mt-7 ml-20 px-5 py-2 border border-indigo-500 text-indigo-800 rounded-md hover:bg-indigo-900 hover:text-white'>Update</button>
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

export default EmployeeUpdate