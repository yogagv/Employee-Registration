import React, { useContext } from 'react'
import logo from '../assets/Colorful Creative Growth Concept Logo (1).png'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import './employeepanel.css'
const EmployeePanel = () => {

    const {user, dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {

        dispatch({type:'LOGOUT'})
    
        setTimeout(() => {
            navigate('/')
        }, 100);
        
      }

      const { id } = useParams();

    const {
        data: empData,
        loading,
        error
        } = useFetch(`${BASE_URL}/employee/singleEmployee/${id}`)

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
                              {
                                user ? (<>
                                <p>{user.empname}</p>
                                <li><Link onClick={handleLogout}>Logout</Link></li>
                                </>) 
                                : 
                                (<>
                                </>
                                )}
                          </ul>
                      </div>
                  </nav>
                
                <h1 className='text-center text-4xl mt-5'>Employee Data</h1>

                {loading && <p>Loading</p>}
                {error && <p>Error</p>}
                {!loading && !error && (

                    <div className="emptable">
                    <table >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Profile Pic</th>
                            <th>Email</th>
                            <th>Mobno</th>
                            <th>Designation</th>
                            <th>Gender</th>
                            <th>Created At</th>
                            <th>Created By</th>
                            <th>Updated By</th>
                            <th>Updated Fields</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={empData._id}>
                            <td>{empData.empname}</td>
                            <td>{<img src={empData.empImage} alt="Employee Profile" className='w-18 h-18' />}</td>
                            <td>{empData.email}</td>
                            <td>{empData.mobno}</td>
                            <td>{empData.designation}</td>
                            <td>{empData.gender}</td>
                            <td>{new Date(empData.createdAt).toLocaleDateString("en-GB",{
                                day: "numeric",
                                month: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true
                            })}</td>
                            <td>{empData.createdBy?.name} ({empData.createdBy?.role})</td>
                            <td>{empData.updatedBy?.name && empData.updatedBy?.role 
                                ? `${empData.updatedBy.name} (${empData.updatedBy.role})`
                                : "Not Updated"}</td>
                            <td>{empData.updatedFields?.join(", ") || "No changes"}</td>
                            </tr>
                            </tbody>
                            </table>
                            </div>
                )}


    </>
  )
}

export default EmployeePanel