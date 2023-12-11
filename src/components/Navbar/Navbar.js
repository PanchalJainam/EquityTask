import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth"));

  const handleAuth = () => {
    navigate("/");
    localStorage.clear();
  };

  return (
    <>
      <div className="px-10 sm:px-12 md:px-28 py-2">
        <div className="flex justify-between">
          <Link to="/">
            <div>
              <h2 className="text-2xl font-semibold text-blue-600">
                The Learning Umbrella
              </h2>
              <p className="text-xs">Power house of Learning</p>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            {auth ? (
              <>
                <button className=" w-10 h-10 text-xl rounded-full bg-blue-500 first-letter:capitalize text-center text-white font-bold">
                  {auth.email.slice(0, 1)}
                </button>
                <button
                  onClick={handleAuth}
                  className="px-5 py-1 rounded-full border-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {" "}
                <Link to="/register">
                  <button className="px-5 py-1 rounded-full border-2">
                    Registration
                  </button>
                </Link>
                <Link to="/login">
                  <button className="px-5 py-1 rounded-full border-2">
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
