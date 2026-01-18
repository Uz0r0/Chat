export const ChatCard = ({ chat, isSelected, onSelect, authUserId }) => {
  const isGroup = chat.type === "group";
  const recipient = !isGroup
    ? chat.members?.find((m) => m.id !== authUserId)
    : null;
  const name = isGroup? chat.name : recipient?.username;
  const avatarId = isGroup ? chat.id : recipient?.id;
  const subText =
    chat.last_message?.text ||
    (isGroup ? "Group conversation" : "No messages yet");

  return (
    <div
      onClick={() => onSelect(chat)}
      className={`flex items-center gap-3 p-2.5 mb-1 rounded-xl cursor-pointer transition-all
        ${isSelected ? "bg-blue-600 text-white shadow-lg" : "hover:bg-[#1c2a38] text-gray-400"}`}
    >
      <div className="relative shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-700 bg-gray-600">
          <img
            src={
              isGroup
                ? `https://ui-avatars.com/api/?name=${name}&background=random`
                : `https://i.pravatar.cc/150?u=${avatarId}`
            }
            alt="avatar"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${name}`;
            }}
          />
        </div>
        {!isGroup && (
          <div
            className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-[#16212c] rounded-full ${recipient?.is_online ? "bg-green-500" : "bg-gray-500"}`}
          />
        )}
      </div>

      <div className="hidden md:block flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p
            className={`font-semibold text-sm truncate ${isSelected ? "text-white" : "text-gray-100"}`}
          >
            {name}
          </p>
        </div>
        <p
          className={`text-[11px] truncate ${isSelected ? "text-blue-100" : "text-gray-500"}`}
        >
          {subText}
        </p>
      </div>
      {chat?.unread_count > 0 && (
        <div
          className={`ml-2 px-1.5 py-0.5 min-w-4.5 h-4.5 flex items-center justify-center rounded-full text-[10px] font-bold transition-colors
              ${
                isSelected
                  ? "bg-white text-blue-600" 
                  : "bg-blue-600 text-white" 
              }`}
        >
          {chat?.unread_count > 99 ? "99+" : chat?.unread_count}
        </div>
      )}
    </div>
  );
};
