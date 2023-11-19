const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold mb-8">Login</h1>
        <form>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
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
          <p className="text-left text-sm text-gray-500 mt-3 hover:text-blue-600 cursor-pointer">
            Don't have an account? Sign Up
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
