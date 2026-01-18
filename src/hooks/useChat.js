import { useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addMessage, updateMessageStatus } from "../store/chatSlice";

export const useChat = (chatId) => {
  const dispatch = useDispatch();
  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const connectRef = useRef(null);

  const connect = useCallback(() => {
    const token = localStorage.getItem("token");

    if (!chatId || !token) return;

    if (socketRef.current) {
      socketRef.current.onclose = null;
      socketRef.current.close();
    }

    const wsUrl = `ws://localhost:8000/ws/chat/${chatId}/?token=${token}`;
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      if (reconnectTimeoutRef.current)
        clearTimeout(reconnectTimeoutRef.current);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const normalizedData = {
        ...data,
        id: data.id || data.message_id,
      };

      if (data.type === "message" || data.text) { 
        dispatch(addMessage(normalizedData));
        const msgId = normalizedData.id;
        if (msgId && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: "delivered", message_id: msgId }));
        }
      }
      if (data.type === "delivered" || data.type === "read") {
        dispatch(updateMessageStatus(data));
      }
    };

    socket.onclose = (e) => {
      if (e.code !== 1000) {
        reconnectTimeoutRef.current = setTimeout(() => {
          connectRef.current?.();
        }, 3000);
      }
    };

    socket.onerror = (err) => {
      console.error(err);
      socket.close(); 
    };
  }, [chatId, dispatch]);
  
  useEffect(() => {
    connectRef.current = connect;
  }, [connect]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current)
        clearTimeout(reconnectTimeoutRef.current);
      if (socketRef.current) {
        socketRef.current.onclose = null;
        socketRef.current.close(1000, "Component unmounted");
      }
    };
  }, [connect]);

  const sendMessage = (text) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: "message",
          chat: chatId,
          text: text,
        }),
      );
    } else {
      connect();
    }
  };

  return { sendMessage };
};
