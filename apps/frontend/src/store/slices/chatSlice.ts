import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState, Message } from '@/types';

const initialState: ChatState = {
  messages: [],
  activeModel: null,
  isLoading: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setActiveModel: (state, action: PayloadAction<string>) => {
      state.activeModel = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    updateLastMessage: (state, action: PayloadAction<string>) => {
      if (state.messages.length > 0) {
        const lastMessage = state.messages[state.messages.length - 1];
        if (lastMessage.role === 'assistant') {
          lastMessage.content = action.payload;
        }
      }
    },
  },
});

export const {
  addMessage,
  setActiveModel,
  setLoading,
  clearMessages,
  updateLastMessage,
} = chatSlice.actions;
export default chatSlice.reducer;