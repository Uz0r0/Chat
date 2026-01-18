import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "@/store/chatSlice";
import { Send } from "lucide-react";

export default function ChatInput({ onSend }) {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  const { editingMessage, selectedChat } = useSelector((state) => state.chat);
  const [text, setText] = useState(editingMessage?.text || "");

  const handleSendMessage = () => {
    if (!text.trim()) return;

    if (editingMessage) {
      dispatch(
        setMessage({
          message_id: editingMessage.id,
          chatId: selectedChat.id,
          text: text,
          user_id: authUser.id,
        }),
      );
    } else {
      onSend(text);
    }

    setText(""); 
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="p-2.5 md:p-4 border-t border-gray-800">
      <div className="rounded-xl flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          placeholder="Message..."
          onKeyDown={handleKeyDown}
          className="flex-1 bg-[#1c2a38] outline-none rounded-xl text-sm py-3 px-1 md:px-2"
        />
        <button
          onClick={handleSendMessage}
          disabled={!text.trim()}
          className={`text-white bg-[#0768c9] rounded-full p-2 cursor-pointer z-20 transition-all 
            ${
              !text.trim()
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#0656a3]"
            }`}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};
