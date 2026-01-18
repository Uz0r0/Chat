import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChats,
  createChat,
  setSelectedChat,
  readMessage,
} from "@/store/chatSlice";
import { getProfile, getUsers } from "@/store/authSlice";
import { Link } from "react-router-dom";
import { MessageSquare, Search, Plus } from "lucide-react";
import { UserCard } from "./UserCard";
import { ChatCard } from "./ChatCard";
import CreateGroupModal from "./CreateGroupModal";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { chats, selectedChat } = useSelector(
    (state) => state.chat,
  );
  const { authUser, users } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getChats());
    dispatch(getUsers());
    dispatch(getProfile());
  }, [dispatch]);

  const existingChatUserIds = chats
    .filter((c) => c.type === "private")
    .map((c) => {
      const recipient = c.members?.find((m) => m.id !== authUser?.id);
      return recipient?.id;
    });

  const filteredChats = chats.filter((chat) => {
    if (chat.type === "group") {
      return chat.name?.toLowerCase().includes(searchTerm.toLowerCase());
    }

    const recipient = chat.members?.find((m) => m.id !== authUser?.id);
    return recipient?.username
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const globalUsers = users.filter((u) => {
    const isNotMe = u.id !== authUser?.id;
    const noExistingChat = !existingChatUserIds.includes(u.id);
    const matchesSearch = u.username
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return isNotMe && noExistingChat && matchesSearch;
  });  

  const handleSelect = (item, type) => {
    if (type === "user") {
      dispatch(createChat(item.id));
      setSearchTerm(""); 
    } else {
      dispatch(setSelectedChat(item));
      if (item?.unread_count > 0 && item?.last_message?.id) {
        dispatch(
          readMessage({
            chatId: item.id,
            lastMessageId: item.last_message.id,
          }),
        );
      }
    }
  };

  return (
    <aside className="w-20 md:w-80 bg-[#16212c] flex flex-col border-r border-gray-800 rounded-2xl transition-all duration-300 ease-in-out">
      <div className="p-3 md:p-4 space-y-1.5 md:space-y-3 ">
        <div className="flex items-center justify-center md:justify-between text-gray-400">
          <div className="hidden md:flex items-center gap-2">
            <MessageSquare size={24} className="text-blue-500" />
            <span className="font-bold text-lg hidden md:inline text-white">
              Chats
            </span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg shadow-blue-900/20 cursor-pointer "
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="hidden md:block">
          <div className="relative">
            <Search
              className="absolute left-3 top-2.5 text-gray-500"
              size={18}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full bg-[#1c2a38] rounded-xl py-2 pl-10 pr-4 text-sm outline-none text-white focus:ring-1 focus:ring-blue-500 border border-transparent focus:border-blue-500/50"
            />
          </div>
        </div>

        <div className="md:hidden flex justify-center">
          <button className="p-2 text-gray-500 hover:text-white hidden md:block">
            <Search size={20} />
          </button>
        </div>
      </div>

      <hr className="border-gray-800 mx-2.5 mb-3" />

      {isModalOpen && (
        <CreateGroupModal onClose={() => setIsModalOpen(false)} />
      )}

      <div className="flex-1 overflow-y-auto customSideBar-scrollbar px-2 space-y-1">
        {filteredChats.length > 0 && (
          <div className="mb-4">
            <p className="hidden md:block text-[10px] uppercase font-bold text-gray-500 px-3 mb-2 tracking-wider">
              Recent Chats
            </p>
            {filteredChats.map((chat) => (
              <ChatCard
                key={chat.id}
                chat={chat}
                authUserId={authUser?.id}
                isSelected={selectedChat?.id === chat.id}
                onSelect={(item) => handleSelect(item, "ne user", chat)}
              />
            ))}
          </div>
        )}

        {globalUsers.length > 0 && (
          <div className="mb-4">
            <p className="hidden md:block text-[10px] uppercase font-bold text-gray-500 px-3 mb-2 tracking-wider">
              Global Search
            </p>
            {globalUsers.map((user) => (
              <UserCard
                key={`user-${user.id}`}
                user={user}
                onSelect={(user) => handleSelect(user, "user")}
              />
            ))}
          </div>
        )}
      </div>

      <Link to="/profile" className="md:p-2 border-t border-gray-800 mt-auto">
        <div className="flex items-center justify-center md:justify-start gap-3 cursor-pointer hover:bg-gray-800/50 p-2 rounded-xl transition-all">
          <img
            src={`https://i.pravatar.cc/150?u=${authUser?.id}`}
            className="w-10 h-10 rounded-full border border-gray-700"
            alt="avatar"
          />
          <div className="hidden md:block min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {authUser?.username}
            </p>
            <p className="text-xs text-gray-500 truncate">My Profile</p>
          </div>
        </div>
      </Link>
    </aside>
  );
};
