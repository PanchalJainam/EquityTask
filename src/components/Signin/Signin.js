import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
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
      const userData = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );

      localStorage.setItem("auth", JSON.stringify(userData.data));
      setTimeout(() => {
        navigate("/");
      }, 1000);
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="px-10 sm:px-20  md:px-28 py-10">
        <div className="grid place-content-center ">
          <div className="p-2">
            <h2 className="text-2xl font-semibold text-purple-800">Signin</h2>
            <hr className="w-16 h-1 bg-purple-800" />

            <form>
              <div className="mt-5">
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
              </div>
              <p className="capitalize pt-2 pb-2">
                if you don`t have an account ?{" "}
                <Link to="/register">
                  <span className="text-purple-800 font-bold">
                    Register Here
                  </span>
                </Link>
              </p>

              <div className="mt-3 border-purple-500 border-2 rounded-md">
                <button
                  onClick={hanldeFormSubmit}
                  className="w-full py-2 font-bold text-violet-800 "
                >
                  SignIn
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
