import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Signup({ isOverSignuplayOpen, closeOverlay ,openLogin}) {
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onHandleChnage = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/signup", formdata, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("successful signup",res.data)
        closeOverlay();
        openLogin();
        // navigate("/login");
        toast.success("Signed up successfully! Welcome!");
        setformdata({name:"",email:"",password:""})
      })
      .catch((err) => {
        console.error("Axios Error :", err.response?.data || err.message);
        toast.error("Signup failed. Please try again.");
      });
  };

  if (!isOverSignuplayOpen) return null;
  return (
    <div className="relative">
      {isOverSignuplayOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="relative bg-[#313338] px-16 py-16 rounded-lg shadow-lg w-full max-w-md">
            <button
              onClick={closeOverlay}
              className="absolute top-6 right-6 px-[6px] py-[2px] font-semibold rounded-full text-white hover:bg-[#2B2D31] text-xl"
            >
              <i className="ri-close-large-line"></i>
            </button>
            <h2 className="text-center text-2xl text-white font-bold pb-[30px]">
              Create an account
            </h2>
            <form onSubmit={onHandleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={onHandleChnage}
                value={formdata.name}
                required
                className="border text-white border-gray-700 rounded-sm px-4 py-2 mb-4 w-full bg-[#383A40] outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={onHandleChnage}
                value={formdata.email}
                required
                className="border border-gray-700 text-white rounded-sm px-4 py-2 mb-4 w-full bg-[#383A40] outline-none"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={onHandleChnage}
                value={formdata.password}
                required
                className="border border-gray-700 text-white rounded-sm px-4 py-2 mb-4 w-full bg-[#383A40] outline-none"
              />
              <h2 className="pb-[30px] text-white">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 underline">
                  Log in
                </Link>
              </h2>
              <button
                type="submit"
                className="px-4 py-3 bg-[#5865F2] text-white font-semibold rounded-md shadow-md hover:bg-[#4952AD] transition duration-300 ease-in-out w-full"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      )}
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Signup;
