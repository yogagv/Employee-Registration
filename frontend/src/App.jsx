import AdminLogin from "./AdminLogin/AdminLogin"
import AdminPanel from "./AdminPanel/AdminPanel"
import AdminRegister from "./AdminRegister/AdminRegister"
import AdminUpdate from "./AdminUpdate/AdminUpdate"
import AllAdmin from "./AllAdmin/AllAdmin"
import EmployeeList from "./EmployeeList/EmployeeList"
import EmployeeLogin from "./EmployeeLogin/EmployeeLogin"
import EmployeePanel from "./EmployeePanel/EmployeePanel"
import EmployeeRegister from "./EmployeeRegister/EmployeeRegister"
import EmployeeUpdate from "./EmployeeUpdate/EmployeeUpdate"
import Home from "./Home/Home"
import { Route, Routes } from "react-router-dom"
function App() {

  return (
    <>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adminRegister" element={<AdminRegister />} />
      <Route path="/adminLogin" element={<AdminLogin />} />
      <Route path="/adminPanel" element={<AdminPanel />} />
      <Route path="/empLogin" element={< EmployeeLogin/>} />
      <Route path="/empRegister/:id" element={<EmployeeRegister/>} />
      <Route path="/adminList" element={<AllAdmin />} />
      <Route path="/adminList/edit/:id" element={<AdminUpdate />} />
      <Route path="/empList" element={<EmployeeList/>} />
      <Route path="/empList/edit/:id" element={<EmployeeUpdate/>} />
      <Route path="empPanel/:id" element={<EmployeePanel/>} />
    </Routes>
    </>

  )
}

export default App
