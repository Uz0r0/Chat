export const UserCard = ({ user, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(user)}
      className="flex items-center gap-3 p-3 mb-1 rounded-xl cursor-pointer transition-all hover:bg-[#1c2a38] text-gray-400"
    >
      <div className="relative shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-700 bg-gray-600">
          <img
            src={`https://i.pravatar.cc/150?u=${user.id}`}
            alt="avatar"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${user.username}`;
            }}
          />
        </div>
        <div
          className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-[#16212c] rounded-full 
          ${user.status?.is_online ? "bg-green-500" : "bg-gray-500"}`}
        />
      </div>

      <div className="hidden md:block flex-1 min-w-0">
        <p className="font-semibold text-sm text-gray-100 truncate">
          {user.username}
        </p>
        <p className="text-[11px] text-gray-500 truncate">
          {user.status?.is_online ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};
