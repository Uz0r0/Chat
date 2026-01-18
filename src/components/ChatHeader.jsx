import { useSelector } from "react-redux";

export default function ChatHeader() {
  const { authUser } = useSelector((state) => state.auth);
  const { selectedChat } = useSelector((state) => state.chat);
  const isGroup = selectedChat.type === "group";
  const recipient = !isGroup
    ? selectedChat.members?.find((m) => m.id !== authUser?.id)
    : null;
  const name = isGroup
    ? selectedChat.name || "Group Chat"
    : recipient?.username || "Unknown";
  const avatarId = isGroup ? selectedChat.id : recipient?.id;
  
  const showMembers = (array) => {
    let members = [];
    for(const {username} of array){
      members.push(username);
    }
    
    return members.join(", ")
  }

  if (!selectedChat) return null;

  return (
    <div>
      <div className="p-3 md:p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden">
            <img
              src={
                isGroup
                  ? `https://ui-avatars.com/api/?name=${name}&background=random`
                  : `https://i.pravatar.cc/150?u=${avatarId}`
              }
            />
          </div>
          <div>
            <p className="font-bold text-xs md:text-sm">{name}</p>
            {!isGroup || (
              <p className="text-[10px] md:text-xs text-blue-400">
                {" "}
                {showMembers(selectedChat.members)}{" "}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
