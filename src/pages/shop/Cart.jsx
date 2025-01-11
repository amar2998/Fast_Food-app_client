import React, { useContext, useState } from 'react'
import UseCart from '../../hooks/UseCart'
import { FaTrash } from "react-icons/fa";
import swal from 'sweetalert';
import { AuthContext } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';
const Cart = () => {


  const [cart, refetch] = UseCart();
  const { user } = useContext(AuthContext);
  // const [cartItems, setCartItems] = useState([]);

  //calculate price
  const calculatePrice = (item) => {
    let data = Math.abs(item.price * item.quantity);
    return data;
  }

  //deletebutton
  const handleDelete = (item) => {
    swal({
      title: "Are you sure?",
      text: "confirm that you want to delete !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          fetch(`${import.meta.env.VITE_BASE_URL}/carts/${item._id}`, {
            method: "DELETE"
          }).then((res) => res.json()).then((data) => {
            if (cart.length > 0) {
              refetch();
              swal(" Cart has been deleted!", {
                icon: "success",
              });
            }
          })
        } else {
          swal("Your cart file is safe!");
        }
      });
  }

  const handleMinus = (item) => {
    if (item.quantity > 1) {
      fetch(`${import.meta.env.VITE_BASE_URL}/carts/${item._id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ quantity: item.quantity - 1 })
      })
        .then((res) => res.json())
        .then((data) => {
          refetch(); // Refetch after updating the cart
        });
    } else {
      alert("Item quantity cannot be less than 1");
    }
  }

  // Increase item quantity
  const handlePlus = (item) => {
    fetch(`${import.meta.env.VITE_BASE_URL}/carts/${item._id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ quantity: item.quantity + 1 })
    })
      .then((res) => res.json())
      .then((data) => {
        refetch(); // Refetch after updating the cart
      });
  }
  const calculateTotalPrice = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);  // Initial value of total is 0

  const orderTotal = calculateTotalPrice;



  return (
    <div className='section-container '>
      <div className='bg-gradient-to-r from-[#fafafa] from-0% to-[#fcfcfc] to-100%'>
        <div className='py-36 flex flex-col justify-center items-center gap-8'>


          {/* text */}
          <div className='md:w-1/2 space-y-7 px-4 flex justify-center'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'> <span className=' text-cusblue'>Cart Items</span></h2>

          </div>
        </div>
      </div>
      {/* cart items */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className=' bg-cusblue text-white rounded-sm'>
                <th>#</th>
                <th>Dishes</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>


            <tbody>
              {/* row 1 */}

              {
                cart.length > 0 ? (
                  cart.map((item, index) => (

                    <tr key={index}>

                      <td className=' font-medium '>{index + 1}</td>

                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={item.image}
                                alt="item image" />
                            </div>
                          </div>

                        </div>
                      </td>
                      <td className=' font-medium'>
                        {item.name}
                      </td>
                      <td>
                        <button className='btn btn-xs p-4 ' onClick={() => handleMinus(item)}>-</button>
                        <input
                          type='number'
                          value={item.quantity}
                          readOnly
                          className="w-10 text-center mx-2 overflow-hidden"
                        />
                        <button className='btn btn-xs p-4' onClick={() => handlePlus(item)}>+</button>

                      </td>
                      <td >${calculatePrice(item).toFixed(2)}</td>
                      <th>
                        <button className="btn btn-ghost btn-xs text-red-600" onClick={() => handleDelete(item)}><FaTrash />
                        </button>
                      </th>
                    </tr>
                  ))) : (<tr>
                    <td colSpan="6" className="text-center font-bold  text-white bg-gray-600">
                      <span>Cart is empty</span>
                    </td>
                  </tr>)
              }

            </tbody>
            {/* foot */}

          </table>
        </div>
      </div>
      <div className=' my-12 flex flex-col md:flex-row justify-between items-center'>
        <div className=' md:w-1/2 space-y-3'>
          <h3 className=' font-medium'>Customer details</h3>
          <p>Name:{user.displayName}</p>
          <p>Email:{user.email}</p>
          <p>user_id:{user.uid}</p>
        </div>
        <div className=' md:w-1/2 space-y-3'>
          <h3 className=' font-medium'>Cart details</h3>

          <p>Total Items:{cart.length}</p>
          <p>Total Price ${orderTotal.toFixed(2)}</p>
          <Link to={"/payment"}>

            <button className='btn bg-cusblue text-white'> proceed to Pay</button>
          </Link>
        </div>

      </div>
      {/* <div className=' md:w-1/2 space-y-3'></div> */}
    </div>
  )
}

export default Cart