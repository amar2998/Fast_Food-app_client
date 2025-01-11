import React from 'react'
import { MdDashboard } from "react-icons/md";
import { Link, Outlet } from 'react-router-dom'
import { ImUsers } from "react-icons/im";
import { FaShoppingBasket } from "react-icons/fa";
import { BiSolidDish } from "react-icons/bi";
import { RiEditBoxFill } from "react-icons/ri";
import logo from '../assets/images/logo.png'
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
import Model from '../components/Model'
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader'

const shareLink = (
  <>
    <li>
      <Link to="/"><MdDashboard />
        Home
      </Link>
    </li>
    <li>
      <Link to="/menu"><FaShoppingBasket/>
        Menu
      </Link>
    </li>
    <li>
      <Link to="/order"><FaLocationArrow />
        Order Tracking
      </Link>
    </li>
    <li>
      <Link to="/menu"><FaCircleQuestion />
        customer Support
      </Link>
    </li>
  </>
);
const DashBoardLayout = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const { loading } = useAuth();

  // Handle loading states for both authentication and admin check
  if (loading || isAdminLoading) {
    return <div>
      <Loader/>
    </div>;  // You can replace this with a spinner or a better loading component
  }

  return (
    <div>
      {
        isAdmin ? (
          <div className="drawer sm:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
              {/* Page content here */}
              <div className=' flex items-center justify-between mx-4'>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden md:hidden">
                  <MdOutlineDashboardCustomize />
                </label>
                <button className='btn rounded-full px-6 bg-cusblue flex items-center gap-2 text-white sm:hidden'>
                  <ImUsers /> Log out
                </button>
              </div>
              <div className=' mt-5 md:mt-5 mx-4'>
                <Outlet />
              </div>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li>
                  <Link to={'/dashboard'} className=' flex justify-start mb-3'>
                    <img src={logo} style={{ height: "50px", width: "50px" }} />
                    <span className="badge badge-accent">admin</span>
                  </Link>
                </li>
                <hr></hr>
                <li className='mt-3'><Link to="/dashboard"><MdDashboard />Dashboard</Link></li>
                <li><Link to="/dashboard/users"><ImUsers />All Users</Link></li>
               
                <li><Link to="/dashboard/add-menu"><BiSolidDish />Add Menu</Link></li>
                <li className=' mb-3'><Link to="/dashboard/manage-item"><RiEditBoxFill />Manage Items</Link></li>
                <hr></hr>
                {shareLink}
              </ul>
            </div>
          </div>
        ) : (
          <Model />  // This should render if the user is not an admin
        )
      }
    </div>
  );
};

export default DashBoardLayout;


