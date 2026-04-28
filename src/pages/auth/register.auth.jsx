import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import Img from "../../components/img/img.jsx";
import axiosInstance from "../../components/api/axios.jsx";
import { useNavigate } from "react-router-dom";

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { Role: "" } });

   const navigate = useNavigate();
  
  const [disable, setDisable] = useState(false);

  async function handleRegister(data) {
    try {
      setDisable(true);
      const response = await axiosInstance.post("/spotify/register", data);

      if (response?.data?.success) {
        toast.success(response.data.message || "Registered successfully");
         navigate("/login", { replace: true });
        reset();
      }
    } catch (error) {
      setDisable(false);
      toast.error(
        error?.response?.data?.message || "Registration failed"
      );
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4 }}
className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 px-4"    >
      <div className="w-full max-w-md lg:max-w-lg">
        <Img />
      </div>

      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="p-6 sm:p-8 text-sm flex flex-col gap-5 shadow-xl rounded-2xl w-full"
        >
          <h1 className="text-2xl font-bold text-center">Mastify</h1>
          <h2 className="text-xl font-bold text-center lg:text-left">
            Register
          </h2>

          <div className="flex flex-col gap-1">
            <label htmlFor="username">UserName</label>
            <input
              id="username"
              type="text"
              className="pl-2 py-2 border rounded-lg w-full"
              {...register("UserName", {
                required: "* username is required",
              })}
            />
            {errors.UserName && (
              <small className="text-red-600 text-xs">
                {errors.UserName.message}
              </small>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="pl-2 py-2 border rounded-lg w-full"
              {...register("Email", {
                required: "* email is required",
              })}
            />
            {errors.Email && (
              <small className="text-red-600 text-xs">
                {errors.Email.message}
              </small>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              className="py-2 border rounded-lg w-full"
              {...register("Role", {
                required: "* Role is required",
              })}
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="artist">Artist</option>
            </select>
            {errors.Role && (
              <small className="text-red-600 text-xs">
                {errors.Role.message}
              </small>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="pl-2 py-2 border rounded-lg w-full"
              {...register("Password", {
                required: "* password is required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/,
                  message: "* 6+ chars, 1 uppercase & number",
                },
              })}
            />
            {errors.Password && (
              <small className="text-red-600 text-xs">
                {errors.Password.message}
              </small>
            )}
          </div>

          <div className="flex flex-col gap-2 items-center">
            <button
              type="submit"
              disabled={disable}
              className={`w-full py-2 rounded-md text-white font-semibold transition ${
                disable
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {disable ? "Registering..." : "Register"}
            </button>

            <small className="text-center">
              Already registered?{" "}
              <Link to="/login" className="text-red-500 font-semibold">
                Login
              </Link>
            </small>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default Register;
