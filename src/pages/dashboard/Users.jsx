import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { BsFillTrash2Fill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import useAxiosSecure from '../../hooks/useAxiosSecure';
const Users = () => {
  const axiosSecure=useAxiosSecure()
  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/user');
      return res.data;

    },

  })



  // console.log(users);
  const handleMakeAdmin=user=>{
      axiosSecure.patch(`/user/admin/${user._id}`).then(res=>{
        alert(`${user.name} is now admin`)
      })
      refetch();
  }

  const handleDELETEuser=user=>{
    axiosSecure.delete(`/user/${user._id}`).then(res=>{
      alert(`${user.name} is removed from the database`);
      refetch();

    })
  }

  return (
    <div>
      <div className=' flex items-center justify-between  m-4'>
        <h5>All User</h5>
        <h5>Total users:<span className=' text-cusblue'>{users.length}</span></h5>


      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className=' bg-cusblue text-white rounded-lg'>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>ACtion</th>

              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {
                users.map((user, index) => {
                  return (

                    <tr key={index}>
                      <th>{index}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role==='admin'?"admin":<button className='btn btn-xs btn-circle bg-blue-500 text-white' onClick={()=> handleMakeAdmin(user)}><RiAdminFill /></button>}</td>
                      <td>
                        <button className=' btn btn-xs bg-orange-700 text-white' onClick={()=>handleDELETEuser(user)}>
                          <BsFillTrash2Fill />
                        </button>
                      </td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Users