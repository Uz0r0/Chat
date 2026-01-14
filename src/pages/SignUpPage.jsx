import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../store/authSlice";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";

function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { isSigningUp } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const validateForm = () => {
    if (!formData.username.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false; 
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)){
      toast.error("Invalid email format");
      return false; 
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) dispatch(register(formData));
  };

  return (
    <div className="h-screen items-center">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Chat logo"
            src="../../public/icon.png"
            className="mx-auto h-16 w-auto"
          />
          <h2 className="my-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Welcome to Chat
          </h2>
          <p className="text-base text-center text-gray-500">
            Create your own account
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignUp} className="space-y-6">
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
                  type="username"
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
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="youremail@gmail.com"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block justify-between text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <p className="text-sm/6 font-semibold text-indigo-600">
                  At least 6 chars
                </p>
              </div>
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
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <span className="ml-2">Loading...</span>
                  </>
                ) : (
                  "Create account"
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-base text-gray-500">
            Already have an acount?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
