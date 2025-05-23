import React , { useContext, useEffect, useState } from 'react'
import logo from '../assets/Colorful Creative Growth Concept Logo (1).png'
import { MdOutlineMail } from 'react-icons/md'
import { TbPassword } from 'react-icons/tb'
import Signin from '../assets/signin-image.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'
const EmployeeLogin = () => {

  const [credentials, setCredentials] = useState({

    email: undefined,
    password: undefined

  });

  const [errors, setErrors] = useState({});

  const {dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  

  const handleChange = (e) => {

    setCredentials((prev)=>({...prev, [e.target.id]: e.target.value}));

    setErrors((prev)=>({...prev, [e.target.id]: ""}))
  }

  //reset the values once user logged in
  
    useEffect(() => {
      setCredentials({
          email: "",
          password: "",
      });
  }, []);

  const validateForm = () => {

    let errors = {}

    if(!credentials.email) {

      errors.email = 'Email is Required!';
    }

    if(!credentials.password) {

      errors.password = 'Password is Required!';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }    



  const handleClick = async (e) => {

    e.preventDefault();

    dispatch({type: 'LOGIN_START'});

    if(validateForm()) {

      try {

        const res = await fetch(`${BASE_URL}/empAuth/loginEmployee`,{
          method: 'POST',
          headers: {'content-type':'application/json'},
          credentials:'include',
          body: JSON.stringify(credentials)
        });

        const result = await res.json();

        if(!res.ok) {
          toast.error(result.message)
          return;
        }

        dispatch({

          type: 'LOGIN_SUCCESS',
          payload: result.data,
          token: result.token,
          role: result.role,

        })

          toast.success(result.message);

          setTimeout(()=>{
            navigate(`/empPanel/${result.data._id}`);
          },100)

      } catch(error) {

        dispatch({type: 'LOGIN_FAILURE', payload: error.message});
        toast.error('Something went wrong!', error)

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
                      </ul>
                  </div>
              </nav>

              <h1 className='text-center text-4xl mt-5'>Employee Login</h1>
          <div className="form-data flex-2">
            
            <div className='form-details'>
              <h3 className='text-4xl p-5 m-4 text-center'>Signin</h3>
              <form action="" onSubmit={handleClick}>
    
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

                <button className='submit mt-7 ml-20 px-5 py-2 border border-indigo-500 text-indigo-800 rounded-md hover:bg-indigo-900 hover:text-white'>
                  Signin</button>
                </form>
                </div>
                 <div className='form-image'>
                          <img src={Signin} alt="logo" />
                        </div>
                </div>

                <ToastContainer position="top-right" className='mt-20'/>

    </>
  )
}

export default EmployeeLogin