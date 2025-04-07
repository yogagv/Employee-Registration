import React, { useContext } from 'react'
import logo from '../assets/Colorful Creative Growth Concept Logo (1).png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './adminpanel.css'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
const AdminPanel = () => {

  const {user, dispatch} = useContext(AuthContext)

  const navigate = useNavigate();

  const handleLogout = () => {

    dispatch({type:'LOGOUT'})

    setTimeout(() => {
      navigate('/')
    },100)
  }

  const { id } = useParams()

  const {
    data:adminData,
    loading,
    error
        } = useFetch(`${BASE_URL}/admin/singleAdmin/${id}`)

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
              {loading && <p>Loading</p>}
                {error && <p>Error</p>}
                {!loading && !error && (

                    <div className="emptable">
                    <table >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobno</th>
                            <th>Created At</th>
                            <th>Created By</th>
                            <th>Updated By</th>
                            <th>Updated Fields</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={adminData._id}>
                            <td>{adminData.adminname}</td>
                            <td>{adminData.email}</td>
                            <td>{adminData.mobno}</td>
                            <td>{new Date(adminData.createdAt).toLocaleDateString("en-GB",{
                                day: "numeric",
                                month: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true
                            })}</td>
                            <td>{adminData.createdBy?.name} ({adminData.createdBy?.role})</td>
                            <td>{adminData.updatedBy?.name && adminData.updatedBy?.role 
                                ? `${adminData.updatedBy.name} (${adminData.updatedBy.role})`
                                : "Not Updated"}</td>
                            <td>{adminData.updatedFields?.join(", ") || "No changes"}</td>
                            </tr>
                            </tbody>
                            </table>
                            </div>
                )}
    </>
  )
}

export default AdminPanel