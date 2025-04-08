import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/Colorful Creative Growth Concept Logo (1).png'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import useFetch from '../hooks/useFetch'
import { BASE_URL, token } from '../utils/config'
import { toast, ToastContainer } from 'react-toastify'

const AllAdmin = () => {

  const [admin, setAdmin] = useState([])

  const { user, dispatch } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleLogout = () => {

    dispatch({ type: 'LOGOUT' });

    setTimeout(() => {
      navigate('/')
    }, 100)

  }

  const {
    data: adminData,
    loading,
    error
  } = useFetch(`${BASE_URL}/admin/allAdmin`);


  //for Delete Admin 

  useEffect(() => {
    if (adminData) {
      setAdmin(adminData)
    }
  }, [adminData])


  const handleDelete = async (id) => {

    try {
      const res = await fetch(`${BASE_URL}/admin/deleteAdmin/${id}`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);

      //update local state (UI)
      setAdmin(prevAdm => prevAdm.filter(adm => adm._id !== id));

      dispatch({ type: 'DELETE', payload: id });

    } catch (error) {
      toast.error("Error deleting admin", error);
    }


  }

  return (
    <>
      <nav className='navbar container mx-auto p-4'>
        <Link to='/'>
          <div className="logo">
            <img src={logo} alt="logo" />
            <h1 className='text-4xl'>Mayuras'</h1>
          </div>
        </Link>
        <div className="links">
          <ul>
            <li><Link to='/'>Home</Link></li>
            {user ? (<>
              <p className=''>{user.adminname}</p>
              <li><Link onClick={handleLogout}>Logout</Link></li>
            </>) : (
              <>
              </>)}
          </ul>
        </div>
      </nav>

      <h1 className='text-center text-4xl mt-5'>Admin List</h1>

      {loading && <p>Loading</p>}
      {error &&  <p>Error</p>}
      {!loading && !error && (

        <div className="emptable">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobno</th>
                <th>Create Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                admin.map((admindata) => (
                  <tr key={admindata._id}>
                    <td>{admindata.adminname}</td>
                    <td>{admindata.email}</td>
                    <td>{admindata.mobno}</td>
                    <td>{new Date(admindata.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric"
                    })}</td>
                    <td className='font-bold'>
                      {<Link to={`/adminList/edit/${admindata._id}`} className='actionbtn'> Edit</Link>} |
                      {<button className='actionbtn' onClick={() => handleDelete(admindata._id)}>Delete</button>}

                    </td>
                  </tr>
                ))

              }
            </tbody>
          </table>

          <ToastContainer position="top-right" className='mt-20' />
        </div>

      )
      }
    </>
  )
}

export default AllAdmin