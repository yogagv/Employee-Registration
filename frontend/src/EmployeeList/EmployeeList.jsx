import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/Colorful Creative Growth Concept Logo (1).png'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import useFetch from '../hooks/useFetch'
import { BASE_URL, token } from '../utils/config'
import './employesslist.css'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'

const EmployeeList = () => {

    const [employee, setEmployee] = useState([])

    const [empCount, setEmpCount] = useState(0)

    const [empSearch, setEmpSearch] = useState('')

    const [currentPage, setCurrentPage] = useState(1)

    const [totalPages, setTotalPages] = useState(1)

    const [limit, setLimit] = useState(5)

    const { user, dispatch }  = useContext(AuthContext)


    const navigate = useNavigate();

    const handleLogout = () => {

        dispatch({type: 'LOGOUT'});

        setTimeout(()=>{
            navigate('/')
        },100)
        
    }

    const {
        data: empData,
        loading,
        error
    } = useFetch(`${BASE_URL}/employee/allEmployees`);


   
    useEffect(() => {
        if(empData.length > 0) {
            setEmployee(empData)
            const count = empData.filter(emp => emp.role === "employee").length;
            setEmpCount(count);
            setTotalPages(Math.ceil(count / limit));
        }
    }, [empData])

     //for Delete employee 

    const handleDelete = async (id) => {

        try {

            const res = await fetch(`${BASE_URL}/employee/deleteEmployee/${id}`, { 
                method: "DELETE",
                headers: {'Authorization': `Bearer ${token}`} 
            });

            const data = await res.json();
            if(!res.ok) {
                toast.error(data.message);
                return;
            }

            toast.success(data.message); 

            //update local state (UI)
            setEmployee(prevEmp => prevEmp.filter(emp => emp._id !== id));

            setEmpCount(prevCount => prevCount - 1);

            const newTotalPages = Math.ceil((empCount - 1) / limit);
            setTotalPages(newTotalPages);

            if (employee.length === 1 && currentPage > 1 && currentPage > newTotalPages) {

                setCurrentPage(currentPage - 1);
            } else { 

                handleSubmit();
            }

            dispatch({type: 'DELETE', payload: id});
            
          } catch (error) {
            toast.error("Error deleting employee", error);
          }    
    }

    const handleSearch = async(e) => {

            setEmpSearch(e.target.value)
    }

    const handleSubmit = async() => {


        try{

            
            const res = await axios.get(`${BASE_URL}/employee/allEmployees`, {
                headers: {'Authorization': `Bearer ${token}`},
                params : {
                    search: empSearch,
                    sortBy: 'email',
                    order: 'desc',
                    page: currentPage,
                    limit: limit
                }

            })


            setEmployee(res.data.data);
            
            if (res.data.pagination) {
                setTotalPages(res.data.pagination.totalPages);
                setEmpCount(res.data.pagination.totalCount);
            }


            // const data = await res.json();

        }catch(error) {

                // toast.error(error);

                if (error.response && error.response.status === 404) {
                    setEmployee([]); // Important to update the state
                  } else {
                    toast.error("Something went wrong!");
                  }                
        }
    }

    // Handle page change
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    // For previous page
    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    
    // For next page
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }


    useEffect(() => {

        const delayDebounce = setTimeout(() => {
          handleSubmit(empSearch);
        }, 100);
    
        return () => clearTimeout(delayDebounce);
      }, [empSearch, currentPage, limit]);


      const renderPaginationButtons = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button 
                    key={i} 
                    onClick={() => goToPage(i)} 
                    className={`pagination-btn ${currentPage === i ? 'active-page' : ''}`}
                >
                    {i}
                </button>
            );
        }
        
        return pageNumbers;
    };

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
                          {user ? (<>
                            <p className=''>{user.adminname}</p>
                            <li><Link onClick={handleLogout}>Logout</Link></li>
                          </>) : (
                          <>
                          </>)}
                      </ul>
                  </div>
              </nav>

              <h1 className='text-center text-4xl mt-5'>Employee List</h1>
                            
            {loading && loading}
            {error && error}
            {!loading && !error && (
                        
                        <div className="emptable">
                            <div className='empinfo'>
                                <p>Employee Count: <span className="emplink"> {empCount} </span></p>
                                <Link to={`/empRegister/${user?._id}`} className='emplink'>Create Employee</Link>
                            </div>
                            
                            <div className='empsearch'>
                                <form action="" onSubmit={handleSubmit}>
                                    <input type="search" placeholder="Search Employee" className="search" value={empSearch} onChange={handleSearch}/>
                                </form>
                            </div>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Profile Pic</th>
                                        <th>Email</th>
                                        <th>Mobno</th>
                                        <th>Designation</th>
                                        <th>Gender</th>
                                        <th>Create Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employee.length > 0 ? (
                                    
                                        employee.map((empdata) => (
                                    <tr key={empdata._id}>
                                        <td>{empdata.empname}</td>
                                        <td>{<img src={empdata.empImage} alt="Employee Profile" className='w-18 h-18' />}</td>
                                        <td>{empdata.email}</td>
                                        <td>{empdata.mobno}</td>
                                        <td>{empdata.designation}</td>
                                        <td>{empdata.gender}</td>
                                        <td>{new Date(empdata.createdAt).toLocaleDateString("en-GB",{
                                            day: "numeric",
                                            month: "numeric",
                                            year: "numeric"
                                        })}</td>
                                        <td className='font-bold'>
                                        {<Link to={`/empList/edit/${empdata._id}`} className='actionbtn'> Edit</Link>} | 
                                        {<button className='actionbtn' onClick={() => handleDelete(empdata._id)}>Delete</button>} 
                                        
                                        </td>
                                    </tr>
                                ))

                                    ) : (<tr>
                                        <td colSpan="8" className="text-center text-danger py-3">
                                          No employee found
                                        </td>
                                      </tr>)
                                
                            }
                                </tbody>
                            </table>

                            {/* Pagination controls */}
                    {employee.length > 0 && (
                        <div className="pagination flex justify-center">
                            <button 
                                onClick={goToPrevPage} 
                                disabled={currentPage === 1}
                                className="pagination-btn gap-5"
                            >
                                &laquo; Prev
                            </button>
                            
                            {renderPaginationButtons()}
                            
                            <button 
                                onClick={goToNextPage} 
                                disabled={currentPage === totalPages}
                                className="pagination-btn gap-5"
                            >
                                  Next   &raquo;
                            </button>
                            
                            <div className="pagination-info">
                                Page {currentPage} of {totalPages}
                            </div>
                        </div>
                    )}

                             <ToastContainer position="top-right" className='mt-20'/>
                        </div>
                    
            ) 
            }
    </>
  )
}

export default EmployeeList