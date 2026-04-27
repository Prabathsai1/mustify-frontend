import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Img from "../../components/img/img.jsx";
import axiosInstance from "../../components/api/axios.jsx";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  async function passwordreset(data) {
    try {
      const response = await axiosInstance.post(
        "/spotify/resetpassword",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response?.data?.message || "Password reset successful");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Password reset failed"
      );
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 px-4"
    >
      <div className="w-full max-w-md lg:max-w-lg">
        <Img />
      </div>

      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(passwordreset)}
          className="p-6 sm:p-8 text-sm flex flex-col gap-5 shadow-xl rounded-2xl w-full"
        >
          <h1 className="text-2xl font-bold text-center">Mastify</h1>
          <h2 className="text-xl font-bold text-center lg:text-left">
            Reset Password
          </h2>

          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="cursor-pointer">
              UserName
            </label>
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
            <label htmlFor="password" className="cursor-pointer">
              New Password
            </label>
            <input
              id="password"
              type="password"
              className="pl-2 py-2 border rounded-lg w-full"
              {...register("ResetPassword", {
                required: "* New password is required",
              })}
            />
            {errors.ResetPassword && (
              <small className="text-red-600 text-xs">
                {errors.ResetPassword.message}
              </small>
            )}
          </div>

          <div className="flex flex-col gap-2 items-center">
            <button className="bg-blue-500 py-2 px-4 w-full rounded-md text-white font-semibold hover:bg-blue-600 transition">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default RegisterForm;