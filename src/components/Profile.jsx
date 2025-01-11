import React, { useContext } from 'react'
import avatar from "../assets/images/avatar.png"
import { AuthContext } from '../context/AuthProvider'
import { Link, useNavigate } from 'react-router-dom';


const Profile = ({ user }) => {
    const {logout}=useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
         // Debugging step

        logout()
            .then(() => {
                console.log("Logout successful"); // Debugging step
                alert("Logged out successfully");
                navigate('/');

            })
            .catch((err) => {
                console.log("Logout error:", err); // Debugging step
                alert("Error during logout: " + err.message);
            });
    };
    return (
        <div><div className="drawer drawer-end z-50">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">

                        {
                            user.photoURL ? <img
                                alt="Tailwind CSS Navbar component"
                                src={user.photoURL} />: <img
                                alt="Tailwind CSS Navbar component"
                                src={avatar}/>
                            }
                    </div>
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li><a href='/update-Profile'>Profile</a></li>
                    <li><a href='/order'>Order</a></li>
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li><a onClick={handleLogout}>Logout</a></li>
                </ul>
            </div>
        </div></div>
    )
}

export default Profile