import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useChat } from "@/hooks/useChat";
import { getMessages } from "@/store/chatSlice";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import ChatSkeleton from "./Skeletons/ChatSkeleton";

export default function ChatContainer() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  const {
    selectedChat,
    messages,
    isMessagesLoading,
    editingMessage,
  } = useSelector((state) => state.chat);
  const scrollRef = useRef(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const chatId = selectedChat?.id;
  const { sendMessage } = useChat(chatId);

  useEffect(() => {
    if (chatId) {
      dispatch(getMessages(chatId));
    }
  }, [chatId, dispatch]); 

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "auto",
      });
    }
  }, [messages.length]);

  if (!selectedChat)
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 bg-[#16212c] rounded-2xl border border-gray-800">
        <p>Select a chat to start messaging</p>
      </div>
    );

  return (
    <main className="flex-1 bg-[#16212c] rounded-2xl flex flex-col border border-gray-800 overflow-hidden">
      <ChatHeader />

      {isMessagesLoading ? (
        <ChatSkeleton />
      ) : messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-500 italic">
          <p>There are no messages in this chat yet...</p>
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar"
        >
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id || msg.message_id}
              msg={msg}
              authUser={authUser}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
            />
          ))}
        </div>
      )}

      <ChatInput key={editingMessage?.id} onSend={sendMessage} />
    </main>
  );
};
