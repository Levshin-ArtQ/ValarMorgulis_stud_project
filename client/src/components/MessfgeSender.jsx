// client/src/components/MessageSender.js
import React, { useState } from 'react';
import axios from 'axios';

const MessageSender = ({ senderId, recipientId }) => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const result = await axios(`/api/messages/${senderId}/${recipientId}`);
      setMessages(result.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post('/api/messages', {
        playerFrom: senderId,
        playerTo: recipientId,
        messageText
      });
      setMessageText('');
      fetchMessages(); // Обновление списка сообщений после отправки
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h2>Send Message</h2>
      <textarea
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Write your message here..."
      />
      <button onClick={sendMessage}>Send</button>

      <h2>Messages</h2>
      <button onClick={fetchMessages}>Refresh Messages</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>From:</strong> {msg.playerFrom} <strong>To:</strong> {msg.playerTo} <br />
            {msg.messageText}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageSender;
