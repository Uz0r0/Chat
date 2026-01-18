import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios";

export const createChat = createAsyncThunk(
  "chat/createChat",
  async (user_id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/chats/", {
        type: "private",
        user_id: user_id,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const createGroupChat = createAsyncThunk(
  "chat/createGroup",
  async ({ name, participants }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/chats/", {
        type: "group",
        member_ids: participants,
        name: name,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const getChats = createAsyncThunk(
  "chat/getChats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/chats/");
      return res.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (chatId, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const res = await axiosInstance.get(`/chats/${chatId}/messages/`);
      return res.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const setMessage = createAsyncThunk(
  "chat/setMessages",
  async ({chatId, text, user_id, message_id} , { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/messages/${message_id}/`, {
        chat: chatId,
        text: text,
        forwarded_from: user_id,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const readMessage = createAsyncThunk(
  "chat/readMessage",
  async ({ chatId, lastMessageId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/chats/${chatId}/read/`, {
        last_read_message_id: lastMessageId, 
      });
      return { chatId, data: res.data };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    selectedChat: JSON.parse(localStorage.getItem("activeChatId")) || null,
    messages: [],
    chats: [],
    isMessagesLoading: false,
    editingMessage: null,
  },
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
      localStorage.setItem("activeChatId", JSON.stringify(action.payload));
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setEditingMessage: (state, action) => {
      state.editingMessage = action.payload;
    },
    clearEditingMessage: (state) => {
      state.editingMessage = null;
    },
    updateMessageStatus: (state, action) => {
      const message = state.messages.find(
        (m) => m.id === action.payload.message_id,
      );
      if (message) {
        message.status = action.payload.type;
      }
    },
    resetChat: (state) => {
      state.selectedChat = null;
      state.messages = [];
      state.users = [];
      localStorage.removeItem("activeChatId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChat.fulfilled, (state, action) => {
        const exists = state.chats.find((c) => c.id === action.payload.id);
        if (!exists) {
          state.chats.unshift(action.payload);
        }
        state.selectedChat = action.payload;
      })
      .addCase(createGroupChat.fulfilled, (state, action) => {
        state.chats.unshift(action.payload);
        state.selectedChat = action.payload;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.chats = action.payload;
      })
      .addCase(getMessages.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isMessagesLoading = false;
        state.messages = action.payload;
      })
      .addCase(setMessage.fulfilled, (state, action) => {
        const index = state.messages.findIndex(
          (m) => m.id === action.payload.id,
        );
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
        state.editingMessage = null;
      })
      .addCase(readMessage.fulfilled, (state, action) => {
        const { chatId } = action.meta.arg;
        const chatIndex = state.chats.findIndex((c) => c.id === chatId);
        if (chatIndex !== -1) {
          state.chats[chatIndex].unread_count = 0;
        }
      });
  },
});

export const {
  setSelectedChat,
  addMessage,
  setEditingMessage,
  clearEditingMessage,
  updateMessageStatus,
  resetChat,
} = chatSlice.actions;
export default chatSlice.reducer;
