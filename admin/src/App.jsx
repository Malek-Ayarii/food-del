import Navbar from "./components/Navbar/Navbar.jsx"
import SideBar from "./components/Sidebar/SideBar"
import List from "./pages/List/List.jsx"
import Order from "./pages/orders/Order.jsx"
import Add from "./pages/Add/Add.jsx"
import { Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const url = "http://localhost:4000";

  return (
    <>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <SideBar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Order url={url} />} />
        </Routes>
      </div>
    </>
  )
}

export default App
