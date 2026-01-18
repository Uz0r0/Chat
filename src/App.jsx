import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "./store/authSlice"; 
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import SignUpPage from "@/pages/SignUpPage";
import LoginPage from "@/pages/LoginPage";

const App = () => {
  const dispatch = useDispatch();
  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!authUser) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  if (isCheckingAuth) {
    return (
      <div className="flex bg-[#16212c] items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;
