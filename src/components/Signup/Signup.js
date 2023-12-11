import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const hanldeFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const authData = await axios.post(
        "http://localhost:5000/api/auth/register",
        data
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
      console.log(authData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="px-10 sm:px-20 md:px-28 py-10">
        <div className="grid place-content-center ">
          <form method="post">
            <div className="pt-3">
              <label htmlFor="name">Enter Name :</label>
              <br />
              <input
                type="text"
                name="name"
                value={data?.name}
                onChange={handleInputChange}
                className="w-full outline-none border-2 rounded-md border-gray-500 bg-transparent pl-2 py-1"
              />
            </div>

            <div className="pt-3">
              <label htmlFor="name">Enter Email :</label>
              <br />
              <input
                type="email"
                name="email"
                value={data?.email}
                onChange={handleInputChange}
                className="w-full outline-none border-2 rounded-md border-gray-500 bg-transparent pl-2 py-1"
              />
            </div>

            <div className="pt-3">
              <label htmlFor="name">Enter Password :</label>
              <br />
              <input
                type="password"
                name="password"
                value={data?.password}
                onChange={handleInputChange}
                className="w-full outline-none border-2 rounded-md  border-gray-500 bg-transparent pl-2 py-1"
              />
            </div>

            <div className="pt-3">
              <label htmlFor="name">Enter Confirm Password :</label>
              <br />
              <input
                type="password"
                name="cpassword"
                value={data?.cpassword}
                onChange={handleInputChange}
                className="w-full outline-none border-2 rounded-md  border-gray-500 bg-transparent pl-2 py-1"
              />
            </div>

            <p className="capitalize pt-2 pb-2">
              Already have an account ?{" "}
              <Link to="/login">
                <span className="text-purple-800 font-bold">Login Here</span>
              </Link>
            </p>

            <div className="mt-3 border-purple-500 border-2 rounded-md">
              <button
                onClick={hanldeFormSubmit}
                className="w-full py-2 font-bold text-violet-800 "
              >
                SignUp
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
