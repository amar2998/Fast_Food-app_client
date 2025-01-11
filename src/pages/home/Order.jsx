import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const Order = () => {




  const { user } = useAuth();
  // console.log(user?.email);
  const token = localStorage.getItem('access-token')

  const { refetch, data: orders = [] } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:6001/payment?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      return res.json();

    },

  })


  console.log(orders)
  const functionDate = (date) => {
    const data = new Date(date);
    const formatdate = data.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return formatdate;
  }

  const handledelete = async (item) => {
    const id = item._id
    try {
      const response = await fetch(`http://localhost:6001/payment/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${token}`
        },
      })
      if (response.ok) {
        alert("item deleted successfully");
        refetch();
      }
      else {
        alert("fail to delete the item");
      }
    } catch (error) {
      alert(error);

    }

  }
  const handleDone = async (item) => {
    const data={...item,status:'Done'}
    try {
      const respo = await fetch(`http://localhost:6001/payment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`

        },
        body: JSON.stringify(data)
      })
      if (respo.ok) {
        alert("item updeted successfully");
        refetch();
      }
      else {
        alert("fail to updated the item")
      }

    } catch (error) {
      alert(error);

    }


  }


  return (
    <div className=' max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div className='bg-gradient-to-r from-[#fafafa] from-0% to-[#fcfcfc] to-100%'>
        <div className='py-36 flex flex-col justify-center items-center gap-8'>


          {/* text */}
          <div className='md:w-1/2 space-y-7 px-4 flex justify-center'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'> <span className=' text-cusblue'>Ordered Items</span></h2>

          </div>
        </div>
      </div>
      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className=' bg-cusblue text-white rounded-sm'>
                <th>#</th>
                <th>Order date</th>
                <th>Transaction ID</th>
                <th>Total price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>


            <tbody>
              {/* row 1 */}

              {
                orders.length > 0 ? (
                  orders.map((item, index) => (

                    <tr key={index}>

                      <td className=' font-medium '>{index + 1}</td>

                      <td>

                        {functionDate(item.createdAt)}

                      </td>
                      <td className=' font-medium'>
                        {item.transaction_id}
                      </td>
                      <td>
                        ${item.price}

                      </td>
                      <td style={{ backgroundColor: item.status === 'Done' ? 'green' : 'red' }}>{item.status}</td>
                      <td>
                        <button style={{ display: item.status === 'Done' ? "none" : 'inline',borderRadius:"12px" }} onClick={() => handledelete(item)}>cancel</button>
                        

                          <button style={{ marginLeft: "23px", display: item.status === 'Done' ? "none" : 'inline',borderRadius:"12px" }} onClick={() => handleDone(item)}>done</button>
                        
                      </td>
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



    </div>
  )
}

export default Order