import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { refetch, data: isAdmin = false, isLoading: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            if (!user?.email) return false;  // Return false if no email is available
            const res = await axiosSecure.get(`/user/admin/${user?.email}`);
            console.log(res.data);  // Check if res.data contains the admin field
            return res.data?.admin; // Return false if admin is undefined
        },
         // Run the query only if email is available
    });

    return [isAdmin, isAdminLoading, refetch];
};

export default useAdmin;
