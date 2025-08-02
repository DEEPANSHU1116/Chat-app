import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from '../context/Authprovider';
import { Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleSendOtp = async () => {
    try {
      // Check if the email already exists
      const checkResponse = await axios.post("/api/otp/check-email", { email });
      if (checkResponse.status === 200) {
        // Proceed to send OTP
        await axios.post("/api/otp/send-otp", { email });
        toast.success("OTP sent to your email");
        setOtpSent(true);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        toast.error("Email already exists. Please use another email.");
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    }
  };
  

  const handleVerifyOtp = async () => {
    try {
      await axios.post("/api/otp/verify-otp", { email, otp });
      toast.success("OTP verified successfully");
      setIsVerified(true);
    } catch (error) {
      toast.error("Invalid OTP or expired");
    }
  };

  const handleSignup = async (data) => {
    if (!isVerified) {
      toast.error("Please verify your email first");
      return;
    }
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword
    };
    try {
      const response = await axios.post("/api/user/signup", userInfo);
      if (response.data) {
        toast.success("Signup successful");
        setRedirectToLogin(true);
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.error || "Unknown error occurred."}`);
      }
    }
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    handleSignup(data);
  };

  if (redirectToLogin) {
    return <Navigate to="/login" />; // Redirect to login page
  }

  return (
    <>
      <div className='flex h-screen justify-center items-center bg-gray-900'>
        <form onSubmit={handleSubmit(onSubmit)} className='border m-3 border-white px-6 py-2 rounded-md space-y-3 w-96'>
          <h1 className='text-2xl text-center text-gray-300'>
            Chat
            <span className='text-green-500 font-semibold'>App</span>
          </h1>
          <h2 className='text-xl text-white font-bold'>Signup</h2>
          <br />

          {/* FullName */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
              />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Fullname"
              {...register("fullname", { required: true })}
            />
          </label>
          {errors.fullname && <span className='font-semibold text-red-500 text-sm'>This field is required</span>}

          {/* Email */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
              />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
              />
            </svg>
            <input
              type="email"
              className="grow"
              placeholder="Email"
              {...register("email", { required: true })}
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
          </label>
          {errors.email && <span className='font-semibold text-red-500 text-sm'>This field is required</span>}

          {/* OTP Section */}
          {otpSent && !isVerified && (
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                className="input input-bordered"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                type="button"
                className="text-white bg-blue-500 px-2 py-2 rounded-lg cursor-pointer"
                onClick={handleVerifyOtp}
              >
                Verify OTP
              </button>
            </div>
          )}
          {!otpSent && (
            <div className='flex flex-col'>
                <button
              type="button"
              className="text-white bg-blue-500 px-2 py-2 rounded-lg cursor-pointer"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
            </div>
          )}

          {/* Password */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </label>
          {errors.password && <span className='font-semibold text-red-500 text-sm'>This field is required</span>}

          {/* Confirm Password */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Confirm Password"
              {...register("confirmPassword", { required: true, validate: validatePasswordMatch })}
            />
          </label>
          {errors.confirmPassword && <span className='font-semibold text-red-500 text-sm'>{errors.confirmPassword.message}</span>}

          {/* Text & Button */}
          <div className='flex justify-between'>
            <p className='text-gray-300'>Have an account?
              <Link to="/login" className='text-blue-500 underline cursor-pointer ml-1'>Login</Link>
            </p>
            <input type="submit" value="Signup" className='text-white bg-green-500 px-3 py-1 rounded-lg cursor-pointer hover:bg-green-700' />
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;

