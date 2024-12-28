import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import { FaRobot } from 'react-icons/fa';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);
  const currentChatIndex = useSelector((state) => state.currentChatIndex);
  const [input, setInput] = useState('');
  const [newChatName, setNewChatName] = useState('');
  const [editingChatIndex, setEditingChatIndex] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const messages = useMemo(() => chats[currentChatIndex].messages, [chats, currentChatIndex]);

  const handleSend = () => {
    if (input.trim()) {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: { text: input, sender: 'user' },
      });
      setInput('');
      // Simulate a bot response
      setTimeout(() => {
        dispatch({
          type: 'ADD_MESSAGE',
          payload: { text: 'Hello! How can I help you?', sender: 'bot' },
        });
      }, 1000);
    }
  };

  const handleNewChat = () => {
    dispatch({ type: 'NEW_CHAT' });
  };

  const handleChatSelect = (index) => {
    dispatch({ type: 'SET_CURRENT_CHAT', payload: index });
  };

  const handleRenameChat = (index) => {
    if (newChatName.trim()) {
      dispatch({ type: 'RENAME_CHAT', payload: { index, name: newChatName } });
      setNewChatName('');
      setEditingChatIndex(null);
    }
  };

  const handleDeleteChat = (index) => {
    dispatch({ type: 'DELETE_CHAT', payload: index });
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