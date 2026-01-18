import MessageMenu from "./MessageMenu";

export default function MessageBubble({ msg, authUser, openMenuId, setOpenMenuId }) {
  const senderId = msg.sender?.id || msg?.sender_id;
  const isMyMessage = String(senderId) === String(authUser?.id);
  const idDeleted = msg?.text === "This message has been deleted"

  return (
    <div
      className={`relative flex flex-col ${
        isMyMessage ? "items-end" : "items-start"
      } space-y-1 w-full max-w-full  p-1`}
    >
      <div className={`flex items-center gap-2 ${isMyMessage ? "flex-row-reverse" : "flex-row"}`} >
        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-700 bg-gray-800">
          <img
            src={`https://i.pravatar.cc/150?u=${senderId}`}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-[10px] text-gray-500 font-medium">
          {isMyMessage ? "Вы" : msg.sender?.username || "Пользователь"}
        </span>
      </div>
      <div
        className={`${
          isMyMessage
            ? "bg-blue-600 rounded-br-none group"
            : "bg-[#1c2a38] rounded-bl-none"
        } p-3 pb-1.5 text-sm max-w-[70%] md:max-w-[50%] rounded-2xl relative `}
      >
        {isMyMessage && (
          <MessageMenu
            msg={msg}
            openMenuId={openMenuId}
            setOpenMenuId={setOpenMenuId}
          />
        )}
        <div className="flex flex-wrap items-end justify-end gap-x-2">
          <p
            className={`flex-1 wrap-break-word leading-relaxed min-w-full ${idDeleted ? "italic" : null}`}
          >
            {msg?.text}
          </p>
          <div className="flex items-center gap-1 ml-auto leading-none select-none ">
            {msg?.is_edited && !idDeleted && (
              <span className="text-[12px] opacity-70 italic">edited</span>
            )}
            <div className={`text-[9px] mt-1 opacity-80 text-right`}>
              {new Date(msg?.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
