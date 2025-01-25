import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ isOverlayOpen, closeOverlay }) {
  const [ logindata, setislogindata ] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onHandleLoginChnage = (e) => {
    const {name, value} = e.target;
    setislogindata({ ...logindata, [name]: value });
  };
  const onHandleSubmitLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/login",logindata, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        closeOverlay();
        toast.success("Logged in successfully!");
        navigate("/chat");
      })
      .catch((err) => {
        console.error("Axios error", err.response?.data || err.message);
        toast.error("Login failed. Please check your credentials.");
      });
  };
  if (!isOverlayOpen) return null;
  return (
    <div className="relative">
      {isOverlayOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="relative bg-[#313338] px-16 py-16 rounded-lg shadow-lg w-full max-w-md">
            <button
              onClick={closeOverlay}
              className="absolute top-6 right-6 px-[6px] py-[2px] font-semibold rounded-full text-white hover:bg-[#2B2D31] text-xl"
            >
              <i className="ri-close-large-line"></i>
            </button>
            <div>
              <h2 className="text-center text-2xl text-white font-bold pb-[30px]">
                Login
              </h2>
              <form onSubmit={onHandleSubmitLogin}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={logindata.email}
                  onChange={onHandleLoginChnage}
                  required
                  className="border text-white border-gray-700 rounded-sm px-4 py-2 mb-4 w-full bg-[#383A40] outline-none"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={logindata.password}
                  onChange={onHandleLoginChnage}
                  required
                  className="border text-white border-gray-700 rounded-sm px-4 py-2 mb-4 w-full bg-[#383A40] outline-none"
                />
                {/* <h2 className="pb-[30px] text-white">Forgot your password?</h2> */}
                <button
                  type="submit"
                  className="px-4 py-3 bg-[#5865F2] text-white font-semibold rounded-md shadow-md hover:bg-[#4952AD] transition duration-300 ease-in-out w-full"
                >
                  Log in
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Login;