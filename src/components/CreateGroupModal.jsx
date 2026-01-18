import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGroupChat } from "@/store/chatSlice";
import { X, Users } from "lucide-react";

export default function CreateGroupModal({ onClose }) {
  const dispatch = useDispatch();
  const { users, authUser } = useSelector((state) => state.auth);
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const toggleUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const handleCreate = () => {
    if (!groupName || selectedUsers.length === 0)
      return alert("Fill all fields!");

    dispatch(createGroupChat({ name: groupName, participants: selectedUsers }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#16212c] border border-gray-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#1c2a38]">
          <h2 className="text-white font-semibold flex items-center gap-2">
            <Users size={20} className="text-blue-500" /> New Group
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <input
            type="text"
            placeholder="Group Name..."
            className="w-full bg-[#1c2a38] border border-gray-700 rounded-xl p-3 text-white outline-none focus:ring-1 focus:ring-blue-500"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />

          <p className="text-xs text-gray-500 uppercase font-bold px-1">
            Select Participants
          </p>
          <div className="max-h-60 overflow-y-auto customSideBar-scrollbar space-y-1">
            {users
              .filter((u) => u.id !== authUser?.id)
              .map((user) => (
                <div
                  key={user.id}
                  onClick={() => toggleUser(user.id)}
                  className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all ${
                    selectedUsers.includes(user.id)
                      ? "bg-blue-600/20 border border-blue-600/50"
                      : "hover:bg-gray-800 border border-transparent"
                  }`}
                >
                  <img
                    src={`https://i.pravatar.cc/150?u=${user.id}`}
                    className="w-8 h-8 rounded-full"
                    alt=""
                  />
                  <span className="flex-1 text-gray-200 text-sm">
                    {user.username}
                  </span>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    readOnly
                    className="rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-0"
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="p-4 bg-[#1c2a38] flex gap-3">
          <button
            onClick={handleCreate}
            disabled={!groupName || selectedUsers.length === 0}
            className="flex-1 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-500 disabled:opacity-50 transition-all"
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
}
