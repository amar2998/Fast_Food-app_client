import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useQuery } from '@tanstack/react-query';


const UseCart = () => {
    const {user}=useContext(AuthContext);
    const token=localStorage.getItem('access-token')
    const {refetch,data:cart=[]}=useQuery({
        queryKey:['carts',user?.email],
        queryFn:async ()=>{
            const res=await fetch(`${import.meta.env.VITE_BASE_URL}/carts?email=${user?.email}`,{
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
            return res.json();

        },

    })
  return [cart,refetch]
}

export default UseCart