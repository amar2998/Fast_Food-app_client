import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { AuthContext } from '../../context/AuthProvider'

const Update = () => {
    const{updateUserprofile}=useContext(AuthContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      const onSubmit = (data) =>{
        const name=data.name;
        const photoURL=data.photoURL;
        updateUserprofile(name,photoURL).then(()=>{
            alert("profile updated")
        }).catch((error)=>{
            alert("error occure")
            console.log(error);
        })

      }
  return (
    <div className=' flex items-center justify-center h-screen'>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body " onSubmit={handleSubmit(onSubmit)}>
      <h3 className=' font-bold'>update your Profile</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Name" className="input input-bordered" {...register("name")} required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">upload photo</span>
          </label>
          <input type="text" {...register("photoURL")} placeholder="photoURL" className="input input-bordered" required />
          {/* <input type="file" className="file-input file-input-bordered file-input-accent w-full max-w-xs" /> */}
        {/* we will upload the image later */}
        </div>
        <div className="form-control mt-6">
          <button className="btn  bg-cusblue text-white">Update</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Update