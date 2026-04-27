import { useForm } from 'react-hook-form'
import { Link, useNavigate,Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { motion } from "motion/react"
import Img from "../../components/img/img.jsx"
import { useAuth } from '../../context/Authcontext.jsx'

const Login = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const navigate = useNavigate()
  const { setState } = useAuth()

  async function validation(data) {
    try {
      const response = await axios.post("http://localhost:3000/spotify/login", data, {
        withCredentials: true
      })
      if (response.data.success) {
        toast.success(response.data.message)
        navigate('/home', { replace: true })
        setState(true)
        console.log(response.data)
      }
    }
    catch (error) {
      setState(false)
      console.log(error.response)
      toast.error(error.response.data.message)
    }
  }

  return (

    <motion.div
  initial={{ scale: 0.5 }}
  animate={{ scale: 1 }}
  transition={{ duration: 0.4 }}
  className="min-h-screen w-full flex  lg:flex-row items-center justify-center gap-6 lg:gap-10 px-4"
>
  
  <div className="w-full max-w-md lg:max-w-lg">
    <Img />
  </div>

  <div className="w-full max-w-md">
    <form
      onSubmit={handleSubmit(validation)}
      className="p-6 sm:p-8 text-sm flex flex-col gap-5 shadow-xl rounded-2xl w-full"
    >
      <h1 className="text-2xl font-bold text-center">Mastify</h1>
      <h2 className="text-xl font-bold text-center lg:text-left">Login</h2>

      <div className="flex flex-col gap-1 relative">
        <label htmlFor="username" className="cursor-pointer">UserName</label>
        <input
          id="username"
          type="text"
          className="pl-2 py-2 border rounded-lg w-full"
          {...register('UserName', {
            required: { value: true, message: "* username is required" }
          })}
        />
        {errors.UserName && (
          <small className="text-red-600 text-xs">
            {errors.UserName.message}
          </small>
        )}
      </div>

      <div className="flex flex-col gap-1 relative">
        <label htmlFor="password" className="cursor-pointer">Password</label>
        <input
          id="password"
          type="password"
          className="pl-2 py-2 border rounded-lg w-full"
          {...register('Password', {
            required: { value: true, message: "* password is required" }
          })}
        />
        <Link to="/passwordreset" className="text-blue-500 font-bold text-xs">
          Forgot password
        </Link>
        {errors.Password && (
          <small className="text-red-600 text-xs">
            {errors.Password.message}
          </small>
        )}
      </div>

      <div className="flex flex-col gap-2 items-center">
        <button className="bg-red-600 py-2 px-4 rounded-md text-white w-full hover:bg-red-700 transition">
          Submit
        </button>
        <small className="text-center">
          Don't have an account{" "}
          <Link to="/register" className="text-red-500 font-semibold">
            Register now
          </Link>
        </small>
      </div>
    </form>
  </div>

  <Outlet />
</motion.div>
  );
}

export default Login