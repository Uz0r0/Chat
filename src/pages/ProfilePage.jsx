import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "@/store/authSlice";
import { logout } from "@/store/authSlice";
import { resetChat } from "@/store/chatSlice";
import { Link } from "react-router-dom";
import { Loader, User, Mail, Shield, LogOut, ArrowLeft} from "lucide-react";

function ProfilePage() {
  const dispatch = useDispatch();
  const { authUser, isProfileLoading } = useSelector((state) => state.auth);

  useEffect(() => {
      dispatch(getProfile());
    }, [dispatch]);

  if (isProfileLoading) return (
    <div className="bg-[#16212c] flex items-center justify-center h-screen ">
      <Loader className="size-10 animate-spin" />
    </div>
  );

  return (
    <main className="flex-1 bg-[#16212c] flex flex-col overflow-hidden min-h-screen">
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-[#1c2a38] px-4 py-2 rounded-xl border border-gray-800"
        >
          <ArrowLeft size={18} />
          <span className="hidden md:inline text-sm font-medium">
            Back to Chats
          </span>
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 shadow-xl">
                <img
                  src={`https://i.pravatar.cc/300?u=${authUser?.id}`}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {authUser?.username}
              </h2>
              <p className="text-blue-500 text-sm font-medium flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Online Status
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="bg-[#1c2a38] p-4 rounded-2xl border border-gray-800 flex items-center gap-4 transition-all hover:border-gray-700">
              <div className="p-3 bg-blue-600/10 rounded-xl text-blue-500">
                <User size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  Username
                </p>
                <p className="text-gray-200 font-medium truncate">
                  {authUser?.username}
                </p>
              </div>
            </div>

            <div className="bg-[#1c2a38] p-4 rounded-2xl border border-gray-800 flex items-center gap-4 transition-all hover:border-gray-700">
              <div className="p-3 bg-purple-600/10 rounded-xl text-purple-500">
                <Mail size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  Email Address
                </p>
                <p className="text-gray-200 font-medium truncate">
                  {authUser?.email || "No email provided"}
                </p>
              </div>
            </div>

            <div className="bg-[#1c2a38] p-4 rounded-2xl border border-gray-800 flex items-center gap-4 transition-all hover:border-gray-700">
              <div className="p-3 bg-green-600/10 rounded-xl text-green-500">
                <Shield size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  Account Status
                </p>
                <p className="text-gray-200 font-medium italic">
                  Verified Member
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => {
                dispatch(resetChat());
                dispatch(logout());
              }}
              className="w-full flex items-center justify-center gap-2 p-4 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-2xl border border-red-600/20 transition-all font-bold shadow-lg shadow-red-900/10"
            >
              <LogOut size={20} />
              Log Out   
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
