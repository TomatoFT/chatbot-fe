import React from 'react';
import { FaPencilAlt, FaTrash, FaCheck, FaTimes, FaPlus } from 'react-icons/fa';

const ChatList = ({
  chats,
  currentChatIndex,
  handleChatSelect,
  handleRenameChat,
  handleDeleteChat,
  handleNewChat,
  setEditingChatIndex,
  editingChatIndex,
  newChatName,
  setNewChatName,
}) => {
  return (
    <nav className="fixed md:relative w-full md:w-80 bg-blue-600 text-white flex flex-col p-4 transform -translate-x-full md:translate-x-0 transition-transform duration-200 ease-in-out h-screen overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-blue-500 [&::-webkit-scrollbar-thumb]:bg-blue-700 [&::-webkit-scrollbar-thumb]:rounded-full">
      <button
        onClick={handleNewChat}
        className="bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-700 w-full flex items-center justify-center gap-2"
      >
        <span>New Chat</span>
        <FaPlus />
      </button>
      {chats.map((chat, index) => (
        <div key={index} className="mb-2 flex items-center justify-between">
          {editingChatIndex === index ? (
            <div className="flex-1 flex items-center">
              <input
                type="text"
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
                placeholder={chat.name}
                className="p-2 rounded flex-1 bg-gray-100 focus:outline-none text-black mr-2"
                autoFocus
              />
              <div className="flex items-center space-x-2">
                <FaCheck
                  onClick={() => handleRenameChat(index)}
                  className="cursor-pointer text-green-500 hover:text-green-700"
                />
                <FaTimes
                  onClick={() => {
                    setEditingChatIndex(null);
                    setNewChatName('');
                  }}
                  className="cursor-pointer text-red-500 hover:text-red-700"
                />
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => handleChatSelect(index)}
                className={`p-2 rounded text-left w-full ${
                  index === currentChatIndex ? 'bg-blue-700' : 'bg-blue-500'
                } hover:bg-blue-700`}
              >
                {chat.name}
              </button>
              <div className="flex items-center space-x-2 ml-2">
                <FaPencilAlt
                  onClick={() => {
                    setEditingChatIndex(index);
                    setNewChatName(chat.name);
                  }}
                  className="cursor-pointer hover:text-gray-300"
                />
                <FaTrash
                  onClick={() => handleDeleteChat(index)}
                  className="cursor-pointer hover:text-gray-300"
                />
              </div>
            </>
          )}
        </div>
      ))}
    </nav>
  );
};

export default ChatList;