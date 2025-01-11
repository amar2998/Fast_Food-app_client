import React from 'react'
import useMenu from '../../hooks/useMenu'
import { Link } from 'react-router-dom';
import { BiCalendarEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import swal from 'sweetalert';
import useAxiosSecure from '../../hooks/useAxiosSecure'


const UpdateMenu = () => {
    const [menu, , refetch] = useMenu();
    const axiosSecure=useAxiosSecure();


    const handleDeleteItem=(item)=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async(willDelete) => {
            if (willDelete) {
                const res=await axiosSecure.delete(`/menu/${item._id}`)
              swal("Poof! Your  item has been deleted!", {
                icon: "success",
              });
              refetch();
            } else {
              swal("Your item  is safe!");
            }
          });
        
    }
    // console.log(menu);
    return (
        <div className=' w-full md:w-[870px] px-4 mx-auto'>
            <h2 className=' text-2xl font-semibold my-4 '> Manage all <span className=' text-cusblue'>Menu</span></h2>
            {/* menu item table */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                               #
                            </th>
                            <th>image</th>
                            <th>Name</th>
                          
                            <th>Prices</th>
                            <th>edit</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            menu.map((item,index)=>(
                                
                                <tr key={index}>
                                    <th>
                                        {index+1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.image}
                                                        alt="image " />
                                                </div>
                                            </div>
                                        
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                        
                                    </td>
                                    <td>{item.price}</td>
                                    <th>
                                       <Link to={`/dashboard/manage-item/${item._id}`}>

                                        <button className="btn btn-ghost btn-xs bg-cusblue text-white"><BiCalendarEdit /></button>
                                       </Link>
                                    </th>
                                    <th>
                                        <button onClick={()=>handleDeleteItem(item)} className="btn btn-ghost btn-xs bg-red-600 text-white "><MdDelete /></button>
                                    </th>
                                </tr>
                            
                            ))
                        }
                        
                        
                    </tbody>
                
                  
                </table>
            </div>
        </div>
    )
}

export default UpdateMenu