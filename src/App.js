import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import { FaRobot } from 'react-icons/fa';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import Login from './components/Login';
import Register from './components/Register';
import { getChats, createChat, updateChat, deleteChat } from './api/chatApi'; // Import chatApi functions

function App() {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);
  const currentChatIndex = useSelector((state) => state.currentChatIndex);
  const [input, setInput] = useState('');
  const [newChatName, setNewChatName] = useState('');
  const [editingChatIndex, setEditingChatIndex] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('User is authenticated');
      setIsAuthenticated(true);
      fetchChats();
    }
  }, []);

  const fetchChats = async () => {
    try {
      const chats = await getChats();
      dispatch({ type: 'SET_CHATS', payload: chats });
    } catch (error) {
      console.error('Failed to fetch chats:', error);
    }
  };

  const messages = useMemo(() => chats[currentChatIndex]?.messages || [], [chats, currentChatIndex]);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      dispatch({
        type: 'ADD_MESSAGE',
        payload: newMessage,
      });
      setInput('');
      await updateChatMessages(newMessage);
      // Simulate a bot response
      setTimeout(async () => {
        const botMessage = { text: 'Hello! How can I help you?', sender: 'bot' };
        dispatch({
          type: 'ADD_MESSAGE',
          payload: botMessage,
        });
        await updateChatMessages(botMessage);
      }, 1000);
    }
  };

  const updateChatMessages = async (message) => {
    try {
      console.log('currentChatIndex:', chats[currentChatIndex]);
      const updatedChat = await updateChat(chats[currentChatIndex].chat.id, {
        ...chats[currentChatIndex],
        messages: [...chats[currentChatIndex].messages, message],
      });
      dispatch({ type: 'UPDATE_CHAT', payload: updatedChat });
    } catch (error) {
      console.error('Failed to update chat:', error);
    }
  };

  const handleNewChat = async () => {
    try {
      const newChat = await createChat('New Chat', [], localStorage.getItem('user_id'));
      console.log('newChat:', newChat);
      dispatch({ type: 'NEW_CHAT', payload: newChat });
    } catch (error) {
      console.error('Failed to create new chat:', error);
    }
  };

  const handleChatSelect = (index) => {
    dispatch({ type: 'SET_CURRENT_CHAT', payload: index });
  };

  const handleRenameChat = async (index) => {
    if (newChatName.trim()) {
      try {
        const updatedChat = await updateChat(chats[index].id, newChatName);
        dispatch({ type: 'RENAME_CHAT', payload: { index, name: updatedChat.title } });
        setNewChatName('');
        setEditingChatIndex(null);
      } catch (error) {
        console.error('Failed to rename chat:', error);
      }
    }
  };

  const handleDeleteChat = async (index) => {
    try {
      await deleteChat(chats[index].id);
      dispatch({ type: 'DELETE_CHAT', payload: index });
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={<Register onRegister={handleRegister} />}
        />
        <Route
          path="/chat"
          element={
            isAuthenticated ? (
              <div className="min-h-screen bg-gray-100 flex overflow-hidden">
                <ChatList
                  chats={chats}
                  currentChatIndex={currentChatIndex}
                  handleChatSelect={handleChatSelect}
                  handleRenameChat={handleRenameChat}
                  handleDeleteChat={handleDeleteChat}
                  handleNewChat={handleNewChat}
                  setEditingChatIndex={setEditingChatIndex}
                  editingChatIndex={editingChatIndex}
                  newChatName={newChatName}
                  setNewChatName={setNewChatName}
                />
                <div className="flex-1 flex flex-col h-screen">
                  <header className="bg-blue-600 w-full py-4 text-white text-center flex items-center justify-center px-4">
                    <div className="flex items-center gap-2">
                      <FaRobot className="text-3xl" />
                      <h1 className="text-3xl font-bold">Chatbot UI</h1>
                    </div>
                  </header>
                  <ChatWindow
                    messages={messages}
                    input={input}
                    setInput={setInput}
                    handleSend={handleSend}
                  />
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;