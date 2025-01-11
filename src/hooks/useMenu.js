// import React from 'react'

import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios"
// import axios from "axios";

const useMenu = () => {
    const AxiosPublic=useAxios();
    const {data:menu=[],isPending:loading,refetch}=useQuery({
            queryKey:['menu'],
            queryFn:async()=>{
                const res=await AxiosPublic.get('/menu');
                console.log(res.data);
                return res.data;
            },
    })
  return [menu,loading,refetch]
}

export default useMenu