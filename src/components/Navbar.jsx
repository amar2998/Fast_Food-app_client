import React, { useContext, useEffect, useState } from 'react';
import logo from "../assets/images/logo.png";
import { FaRegUserCircle } from "react-icons/fa";

import Profile from './Profile';
import { Link, useNavigate } from 'react-router-dom';
import UseCart from '../hooks/UseCart';
import useAuth from '../hooks/useAuth';

export const Navbar = () => {
  const { user } = useAuth();
  const [cart, refetch] = UseCart();
  const [sticky, setSticky] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const offSet = window.scrollY;
      if (offSet > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to login page
  };

  const navItems = (
    <>
      <li><a href='/'>Home</a></li>
      <li>
        <details>
          <summary>Menu</summary>
          <ul className="p-2">
            <li><a href='/menu'>All</a></li>
            <li><a href='/salad'>Salsa</a></li>
            <li><a href='/popular'>popular</a></li>
          </ul>
        </details>
      </li>
      
      <li><a href='/offer'>Offers</a></li>
    </>
  );

  return (
    <header className='max-w-screen-3xl fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out'>
      <div className={`navbar xl:px-24 ${sticky ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out" : ""}`}>
        <div className="navbar-start">
          <div className="dropdown justify-center">
            <label tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {navItems}
            </ul>
          </div>
          <a href='/'><img src={logo} alt='logo' width={100} height={40} /></a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navItems}
          </ul>
        </div>
        <div className="navbar-end">
          {/* button for notification */}
          
          {/* cart items */}
          <Link to="/cart-page">
            <label tabIndex={1} role="button" className="btn btn-ghost btn-circle mr-3 flex items-center lg:flex hidden">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="badge badge-sm indicator-item">{cart.length}</span>
              </div>
            </label>
          </Link>
          {/* Login / Profile button */}
          {user ? (
            <Profile user={user} />
          ) : (
            <button
              onClick={handleLoginClick}
              className="btn rounded-3xl bg-cusblue px-6 text-white flex items-center gap-2"
            >
              <FaRegUserCircle /> login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
