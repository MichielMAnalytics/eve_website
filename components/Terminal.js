import React, { useState, useRef, useEffect } from 'react';

const Terminal = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [conversationId, setConversationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Start the game when component mounts
    startGame();
  }, []);

  const startGame = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      setConversationId(data.conversation_id);
      addMessage('system', data.message);
    } catch (error) {
      console.error('Error starting game:', error);
      addMessage('error', 'Failed to start the challenge. Please try again.');
    }
  };

  const addMessage = (type, content) => {
    setMessages(prev => [...prev, { type, content, timestamp: Date.now() }]);
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    setIsLoading(true);
    addMessage('user', message);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          conversation_id: conversationId
        }),
      });
      
      const data = await response.json();
      addMessage('assistant', data.response);
    } catch (error) {
      console.error('Error:', error);
      addMessage('error', 'Sorry, I encountered an error processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of your Terminal component code
  // Update the render section to show messages and handle input
}; 