import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { LuGithub } from "react-icons/lu";
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthProvider';
// import axios from 'axios';
import useAxios from '../hooks/useAxios';
import useAuth from '../hooks/useAuth';



const Model = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signUpWithGmail, login } = useAuth()
  const [errormsg, setErrormsg] = useState("");
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    const axiosPublic=useAxios();

    login(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userINfo = {
          name: data.name,
          email: data.email,

        }
        axiosPublic.post('/user', userINfo)
          .then(response => {
            console.log('Response data:', response.data);  // Handle success
            
          })
          alert("login  successful");
          navigate(from, { replace: true })
          
        
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrormsg("Provide a correct email and password. " + errorMessage);
      });
  };

  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to register page
  };

  // Google sign in
  const handleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        alert("login  successful");
        navigate("/");
        const user=result.user;
        const userINfo={
          name:result?.user?.displayName,
          email:result?.user?.email,
        };
        axiosPublic.post('/user', userINfo)
        .then(response => {
          console.log('Response data:', response.data);  
        })

     
      })
      .catch((error) => {
        console.error("login  failed", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Please login</h3>

          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
          </div>

          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="password" className="input input-bordered" {...register("password", { required: true })} />
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>

          {errormsg && <p className="text-red-600 text-xs italic">{errormsg}</p>}

          {/* login */}
          <div className="form-control mt-6">
            <input type="submit" value="Login" className="btn bg-cusblue text-white" />
          </div>

          <p className="text-center my-2">
            Don't have an account?{" "}
            <span className="underline text-red cursor-pointer" onClick={handleRegisterClick}>
              Register Now
            </span>
          </p>
        </form>

        {/* Social login */}
        <div className="text-center space-x-3 mb-2">
          <button className="btn btn-circle" onClick={handleLogin}>
            <FaGoogle />
          </button>
          <button className="btn btn-circle">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle">
            <LuGithub />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Model;
