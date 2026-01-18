import { useDispatch, useSelector } from "react-redux";
import { setEditingMessage, setMessage } from "@/store/chatSlice";
import { EllipsisVertical } from "lucide-react";

export default function MessageMenu({ msg, openMenuId, setOpenMenuId }) {
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isMenuOpen = openMenuId === msg.id;
  const idDeleted = msg.text === "This message has been deleted";

  const toggleMenu = (e) => {
    e.stopPropagation();
    if (isMenuOpen) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(msg.id); 
    }
  };

  return (
    <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-100 group-hover:opacity-100 transition-opacity duration-200">
      <div className="dropdown dropdown-left">
        <button
          onClick={toggleMenu}
          className={`${idDeleted ? "hidden" : "block"}  p-1 hover:bg-gray-700/50 cursor-pointer rounded-full transition-colors`}
        >
          <EllipsisVertical
            size={18}
            className="text-gray-400 hover:text-white"
          />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 bottom-full mb-2 z-50 w-32 bg-[#1c2a38] border border-gray-700 rounded-lg shadow-2xl py-1 text-xs">
            <button
              onClick={() => {
                dispatch(setEditingMessage(msg));
                setOpenMenuId(null);
              }}
              className="w-full text-left px-3 py-2 hover:bg-blue-600 text-white"
            >
              Change
            </button>
            <button
              onClick={() => {
                dispatch(
                  setMessage({
                    message_id: msg.id,
                    chatId: msg.chat,
                    text: "This message has been deleted",
                    user_id: authUser.id,
                  }),
                );
                setOpenMenuId(null);
              }}
              className="w-full text-left px-3 py-2 hover:bg-red-500 text-red-400 hover:text-white"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
