import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthProvider';
import swal from 'sweetalert'


const Card = ({ item }) => {
    const navigate=useNavigate();
    
    const [isheartfilled, setheartFilled] = useState(false);
    const { user } = useContext(AuthContext)
    const { name, image, price, recipe, _id } = item
    // console.log(user);
    const handlefill = () => {
        setheartFilled(!isheartfilled);
    }
    
   const handleAddToCart=async()=>{
    // console.log(item._id);
    // console.log(user.email);
    if(user && user?.email){
        
        const data={
            menuItemId:_id,
            name:name,
            image:image,
            price:price,
            quantity:1,
            email:user.email,
        }
    
            try {
                const response=await fetch(`${import.meta.env.VITE_BASE_URL}/carts`,{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(data)
                });
                if(response.ok){
                    const result=await response.json();
                    swal('Success', 'Item Added to Cart','success');
                    console.log(result);
                }
                else{
                    swal('Error','Failed to add item to cart','error');
                }
            } catch (error) {
                console.log(error);
            }
    }
    else{
        swal({
            title: "Don't have an account?",
            text: "Click to create an account",
            icon: "warning",
            dangerMode: true,
        })
        .then(() => {
            navigate("/register");
        });
    }

    }
   
    return (

        <div className="card bg-base-100 w-86 shadow-xl relative">
           
            <Link to={`/menu/${item._id}`}>
                <figure>
                    <img
                        src={item.image}
                        alt="food"
                        className=' hover:scale-105 transition-all duration-200 md:h-72' />

                </figure>
            </Link>
            <div className="card-body">
                <Link to={`/menu/${item._id}`}>
                    {" "}
                    <h2 className="card-title">{item.name}</h2></Link>
               {/*  can optimize */}
                <div className="card-actions justify-end justify-between items-center mt-2">
                    <h5 className='font-semibold'><span className='text-sm text-red-700'>$</span> {item.price}</h5>
                    <button className="btn bg-cusblue text-white" onClick={() => handleAddToCart(item)}>Add to cart</button>
                </div>
            </div>
        </div>

    )
}

export default Card