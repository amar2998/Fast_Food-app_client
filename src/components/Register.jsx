import React, { useContext } from 'react'
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { LuGithub } from "react-icons/lu"
import { useForm } from 'react-hook-form';

import { AuthContext } from '../context/AuthProvider';
import useAxios from '../hooks/useAxios';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosPublic=useAxios();

  const { createUsers, updateUserprofile,signUpWithGmail } = useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();


  function extractNameFromEmail(email) {
    const namePart = email.split('@')[0];
    const name = namePart.replace(/[._]/g, ' '); // Replace dots and underscores with spaces
    return name.charAt(0).toUpperCase() + name.slice(1); // Capitalize the first letter
  }

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUsers(email, password).then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      updateUserprofile(data.email, data.photoURL).then(() => {
        const userINfo = {
          name: extractNameFromEmail(data.email),
          email: data.email,

        }
        axiosPublic.post('/user', userINfo)
          .then(response => {
            // console.log('Response data:', response.data);  // Handle success
            alert("Registeration successful");
            navigate(from, { replace: true })
          })
          .catch(error=>{
            alert(error);
          })
        
          
      })
    })
      .catch((error) => {

        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });


  }
  const handleLoginClick = () => {
    navigate('/login');

  }

  const handleregister = () => {
    signUpWithGmail()
      .then((result) => {
        const user=result.user;
        const userINfo={
          name:result?.user?.displayName,
          email:result?.user?.email,
        };
        axiosPublic.post('/user', userINfo)
        .then(response => {
          // console.log('Response data:', response.data);  // Handle success
          alert("Registeration successful");
          navigate("/");
        })
        .catch(error => {
          console.error('Error:', error);  // Handle error
        });
       
      })
      .catch((error) => {
        console.error("register failed", error);
      });
  };

  return (
    <div className=' max-w-md bg-white shadow w-full mx-auto items-center justify-center my-20'>

      <div className="modal-action mt-0 flex flex-col justify-center">
        <form className="card-body" method="dialog" onSubmit={handleSubmit(onSubmit)}>
          <h3 className=' font-bold text-lg text-center'>register</h3>
          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="email" className="input input-bordered" {...register("email")} />
          </div>
          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="password" className="input input-bordered" {...register("password")} />
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>

          <div className="form-control mt-6">
            <input type='submit' value="register" className="btn bg-cusblue text-white" />
          </div>
          <p className=' text-center my-2'>
            have an account{" "}
            <button className=" underline text-red-950 ml-1" onClick={handleLoginClick}>
              login</button>
            {/* <Model/> */}
          </p>


        </form >
        <div className=' text-center space-x-3 mb-2'>
          {/* social sign in */}
          <button className="btn btn-circle hover:bg-red-950 hover:text-white" onClick={handleregister}>
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-red-950 hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-red-950 hover:text-white">
            <LuGithub />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register 