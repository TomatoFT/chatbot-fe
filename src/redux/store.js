import { createStore } from 'redux';

const initialState = {
  chats: [{ id: 1, name: 'Chat 1', messages: [] }],
  currentChatIndex: 0,
  nextChatId: 2, // Add nextChatId to track the next chat ID
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      const updatedChats = [...state.chats];
      updatedChats[state.currentChatIndex].messages = [
        ...updatedChats[state.currentChatIndex].messages,
        action.payload,
      ];
      return { ...state, chats: updatedChats };
    case 'NEW_CHAT':
      return {
        ...state,
        chats: [
          ...state.chats,
          { id: state.nextChatId, name: `Chat ${state.nextChatId}`, messages: [] },
        ],
        currentChatIndex: state.chats.length,
        nextChatId: state.nextChatId + 1, // Increment nextChatId
      };
    case 'SET_CURRENT_CHAT':
      return { ...state, currentChatIndex: action.payload };
    case 'RENAME_CHAT':
      const renamedChats = [...state.chats];
      renamedChats[action.payload.index].name = action.payload.name;
      return { ...state, chats: renamedChats };
    case 'DELETE_CHAT':
      const filteredChats = state.chats.filter((_, index) => index !== action.payload);
      return {
        ...state,
        chats: filteredChats,
        currentChatIndex: state.currentChatIndex > 0 ? state.currentChatIndex - 1 : 0,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;