import React from 'react';
import { FaComments } from 'react-icons/fa';

const ChatbotIcon = ({ onClick }) => {
  return (
    <div
      className="fixed bottom-9 right-6 z-50 cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg">
        <FaComments size={24} />
      </div>
    </div>
  );
};

export default ChatbotIcon;