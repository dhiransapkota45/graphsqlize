import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  return (
    <div>
      {/* create a sign up page */}
      <div className="flex justify-center items-center h-screen">
        <div className="w-96 bg-white rounded-lg shadow-xl p-6">
          <h1 className="text-3xl font-bold mb-8">Sign Up</h1>
          <form>
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                value={credentials.username}
                type="text"
                name="username"
                id="username"
                placeholder="Your Email"
                className="border w-full p-3 rounded outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                value={credentials.password}
                type="password"
                name="password"
                id="password"
                placeholder="Your Password"
                className="border w-full p-3 rounded outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded"
            >
              Sign Up
            </button>

            {/* create a url to sign in page here saying dont have a account?signin */}
            <p onClick={()=>navigate("/login")} className="text-left text-sm text-gray-500 mt-3 hover:text-blue-600 cursor-pointer">
              Already have an account? Sign In
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
