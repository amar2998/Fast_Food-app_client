import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import swal from 'sweetalert'


import Loader from './Loader';
import { AuthContext } from '../context/AuthProvider';

const MenuFood = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const { user } = useContext(AuthContext)
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const data = await fetch(`${import.meta.env.VITE_BASE_URL}/menu/${id}`);
                const actualdata = await data.json();
                setItem(actualdata);
            } catch (error) {
                console.error('Error fetching item:', error);
                
            }
        }
        
        fetchData();
        
    }, [id]);
    
    console.log(item)

    const handleAddToCart=async()=>{
        // console.log(item._id);
        // console.log(user.email);
        if(user && user?.email){
            
            const data={
                menuItemId:item._id,
                name:item.name,
                image:item.image,
                price:item.price,
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
        
        <div className=' mt-32 '>
        {
            item? <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-cusblue">{item.name}</h1>
                        <p className="py-6">
                         <span className=' font-semibold text-cusblue'>price:</span>  ${item.price}
                        </p>
                        <button className="btn bg-cusblue text-white" onClick={() => handleAddToCart(item)} >Add to cart</button>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            
                            <img src={item.image}/>
                           
                        </div>

                    </div>
                </div>
            </div>:(<Loader/>)
        }

        </div>
    )
}

export default MenuFood