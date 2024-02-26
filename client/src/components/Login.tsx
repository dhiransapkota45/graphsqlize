import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { LOGIN } from "../grapql/mutation";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });

  const [login] = useMutation(LOGIN);

  const submitHandler = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const response = await login({
        variables: {
          loginInput: credentials,
        },
      });
      if (response?.data) {
        localStorage.setItem("token", response?.data?.login?.token);
        localStorage.setItem(
          "refresh_token",
          response?.data?.login?.refresh_token
        );

        location.href = "/todo";
      }
    } catch (error) {
      console.log("error occured", error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold mb-8">Login</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              onChange={(e) =>
                setCredentials({ ...credentials, userName: e.target.value })
              }
              value={credentials.userName}
              type="text"
              id="username"
              placeholder="Your Username"
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
            Login
          </button>

          {/* create a url to sign in page here saying dont have a account?signin */}
          <p
            onClick={() => navigate("/signup")}
            className="text-left text-sm text-gray-500 mt-3 hover:text-blue-600 cursor-pointer"
          >
            Don't have an account? Sign Up
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
