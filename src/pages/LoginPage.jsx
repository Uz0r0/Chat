import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { isLoggingIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const validateForm = () => {
    if (!formData.username.trim()){
      toast.error("Full name is required");
      return false; 
    }
    if (!formData.password){
      toast.error("Password is required");
      return false; 
    } 
    if (formData.password.length < 6){
      toast.error("Password must be at least 6 characters");
      return false; 
    }

    return true;
  };

  const handleLogin = (e) => { 
    e.preventDefault();

    const success = validateForm();
    if (success === true) dispatch(login(formData));
  };

  return (
    <div className="h-screen items-center">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Chat logo"
            src="/icon.png"
            className="mx-auto h-16 w-auto"
          />
          <h2 className="my-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Glad to see you again
          </h2>
          <p className="text-base text-center text-gray-500">
            Log in to your account
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                User Name
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Ultra Nagibator"
                  autoComplete="username"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••"
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md cursor-pointer bg-indigo-600 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <span className="ml-2">Loading...</span>
                  </>
                ) : (
                  "Log in"
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-base text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Create new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
