import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "@/store/authSlice";
import { Link } from "react-router-dom";
import { Loader2, User, Mail, Lock, UserPlus } from "lucide-react";
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
    if (!formData.username.trim()) return toast.error("Username is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (validateForm()) dispatch(register(formData));
  };

  return (
    <div className="h-screen bg-[#16212c] flex items-center justify-center p-6 transition-all duration-300">
      <div className="w-full max-w-sm">
        {/* Logo & Header */}
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20 mb-4">
            <img alt="Chat logo" src="/icon.png" className="h-12 w-12" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Join the Network
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Create your secure account to start chatting
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
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
                placeholder="Ultra Nagibator"
                className="w-full bg-[#1c2a38] border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors"
                size={18}
              />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-[#1c2a38] border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Password
              </label>
              <span className="text-[10px] text-blue-500 font-semibold uppercase tracking-tighter">
                Min. 6 chars
              </span>
            </div>
            <div className="relative group">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors"
                size={18}
              />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#1c2a38] border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSigningUp}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 mt-4 rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {isSigningUp ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                <UserPlus size={18} />
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-blue-500 font-bold hover:text-blue-400 transition-colors underline-offset-4 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
