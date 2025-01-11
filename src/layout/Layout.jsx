import React, { useContext } from 'react'
import Router from '../router/Router'
import { Navbar } from '../components/Navbar'
import '../App.css'
import Footer from '../components/Footer'
import { AuthContext } from '../context/AuthProvider'
import Loader from '../components/Loader'
import { useLocation } from 'react-router-dom'
const Layout = () => {
  const { loading } = useContext(AuthContext)
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (

    <div className=' min-h-screen '>
      {
        loading ? (<Loader />) : (
          <div>
          {
            !isDashboard && <Navbar/>
          }
            {/* <Navbar /> */}
            <div className=' min-h-screen'>
              <Router />

            </div>
            {

               !isDashboard && <Footer />
            }
          </div>
        )
      }


    </div>



  )
}

export default Layout