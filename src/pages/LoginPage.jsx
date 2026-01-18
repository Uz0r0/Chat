import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import { Link } from "react-router-dom";
import { Loader2, User, Lock, LogIn } from "lucide-react";
import toast from "react-hot-toast";

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { isLoggingIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const validateForm = () => {
    if (!formData.username.trim()) {
      toast.error("Username is required");
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(login(formData));
    }
  };

  return (
    <div className="h-screen bg-[#16212c] flex items-center justify-center p-6 ">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20 mb-4">
            <img alt="Chat logo" src="/icon.png" className="h-12 w-12" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Welcome back
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Establish a secure connection to your account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                Username
              </label>
              <div className="relative group">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Enter your identifier"
                  className="w-full bg-[#1c2a38] border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors"
                  size={18}
                />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-[#1c2a38] border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {isLoggingIn ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                <LogIn size={18} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            New user?{" "}
            <Link
              to="/signup"
              className="text-blue-500 font-bold hover:text-blue-400 transition-colors underline-offset-4 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
