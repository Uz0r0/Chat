import { LogOut, Send, User, MessageSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

function HomePage() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default HomePage;
