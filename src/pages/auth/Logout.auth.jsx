import axiosInstance from "../../components/api/axios.jsx"
import { toast } from 'react-toastify'
export async function Logout(Navigate,setState){
try{
    const response=await axiosInstance.post("/spotify/home/music/logout")
        if(response.data.success){
        toast.success(response.data.message)
        setState(false)
        localStorage.clear();
        Navigate("/login" ,{replace:true})
        }
    }
    catch(error){
     toast.error(error?.response?.data.message)
    }
}
