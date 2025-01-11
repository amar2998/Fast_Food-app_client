import React from 'react'
import { TbBowlSpoonFilled } from "react-icons/tb";
import { useForm } from "react-hook-form"
import useAxios from '../../hooks/useAxios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import swal from 'sweetalert';



const AddMenu = () => {
    const {
        register,
        handleSubmit,
        reset
      } = useForm()
      const AxiosPublic=useAxios();
      const Axiossecure=useAxiosSecure();

      const imagehost="4f38c41e127e4e99c1479ffef382d243";
    //   console.log(imagehost)
    const imagehost_Api=`https://api.imgbb.com/1/upload?key=${imagehost}`;

      const onSubmit =async (data) =>{
            const imagefile={image:data.image[0]}
                const hostingIMage=await AxiosPublic.post(imagehost_Api,imagefile,{
                    headers:{
                        'content-type':"multipart/form-data"
                    }
                })
                // console.log(hostingIMage);
                if(hostingIMage.data){
                    if(hostingIMage.data.success){
                        const menunew={
                            name:data.name,
                            category:data.category,
                            price:parseFloat(data.price),
                            recipe:data.recipe,
                            image:hostingIMage.data.data.display_url

                        }
                        // console.log(menunew);
                        const postMenu= await Axiossecure.post("/menu",menunew);
                        if(postMenu.status===200){
                            reset();
                            swal("Good job!", "Your item is saved !", "success");
                        }
                    }
                }
      }                                                                                                     
 
    return (
        <div className=' w-full md:w-[870px] px-4 mx-auto'>
            <h2 className=' text-2xl font-semibold my-4 '> Upload a new <span className=' text-cusblue'>Menu</span></h2>
            {/* form input */}
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className=' form-control w-full'>

                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Recepi name</span>

                            </div>
                            <input type="text" placeholder="Recipi name" className="input input-bordered w-full " {...register("name", { required: true })} />

                        </label>
                    </div>
                    <div className=' flex items-center gap-4'>
                        {/* categories */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category</span>

                            </label>
                            <select className="select select-bordered" {...register("category", { required: true })}>
                                {/* <option disabled>Pick one category</option> */}
                                <option value={"salad"}>salad</option>
                                <option value={"drinks"}>drinks</option>
                                <option value={"popular"}>popular</option>
                                <option value={"dessert"}>dessert</option>
                                <option value={"pizza"}>pizza</option>
                                <option value={"soup"}>soup</option>
                                <option value={"offered"}>offered</option>
                            </select>

                        </div>
                        {/* price */}
                        <div className=' form-control w-full'>

                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Price</span>

                                </div>
                                <input type="number" placeholder="Recipi price" className="input input-bordered w-full " {...register("price", { required: true })}/>

                            </label>
                        </div>

                    </div>
                    {/* text area */}
                    <div>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Description</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </div>
                            <textarea className="textarea textarea-bordered h-24" placeholder="description " {...register("recipe", { required: true })}></textarea>

                        </label>
                        {/* file input */}
                    </div>
                    <div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Pick a file</span>

                            </label>
                            <input type="file" className="file-input file-input-bordered w-full max-w-xs" {...register("image", { required: true })} />

                        </div>

                    </div>
                    <div className="flex md:justify-center">
                        <button className='btn bg-cusblue text-white px-6'><TbBowlSpoonFilled />add item</button>
                    </div> 
                </form>
            </div>
        </div>
    )
}

export default AddMenu