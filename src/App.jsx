import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Header from "./components/Header"

import Auth from "../pages/Auth"
import Createpost from "../pages/Createpost"
import Myblog from "../pages/Myblog"
import About from "../pages/About"

import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import PostDetails from "../pages/postdetails"

function App() {


  return (
    <>
    
<ToastContainer position="bottom-right" autoClose={3000} />
     <Header/>
   
     <Routes>
        <Route path='/' element={<Home />} />
       
        <Route path='/create' element={<Createpost />} />
        <Route path='/myblogs' element={<Myblog />} />
        <Route path='/about' element={<About />} />
        <Route path="/postdetails/:blogid" element={<PostDetails />} />
        <Route path='/login' element={<Auth register={false} />} />
        <Route path='/register' element={<Auth register={true} />} />
      </Routes>
    </>
  )
}

export default App
