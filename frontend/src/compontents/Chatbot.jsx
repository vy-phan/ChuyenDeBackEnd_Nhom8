import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import useMangaData from '../hooks/useMangaData';
import getGenreData from '../hooks/useGenres';
import rehypeRaw from 'rehype-raw';

const ChatWindow = ({ onClose }) => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false); 
  const { mangaData , genres } = useMangaData();


  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  const apiKey = import.meta.env.VITE_GEMNI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "Bạn là một chatbot chuyên gia về gợi ý truyện tranh manga của Nhật Bản , bạn sẽ là người cố vấn đưa ra truyện phù hợp với người dùng. Chỉ trả lời các câu hỏi liên quan đến truyện tranh , manga nhật bản . Nếu câu hỏi không liên quan, từ chối trả lời người dùng và yêu cầu họ chỉ trả lời liên quan tới truyện tranh , manga nhật bản.",
  });

  const templateManga = (mangaData, genres) => {
    const mangaDatabase = mangaData.map((manga) => {
      return `Tên truyện: ${manga.title} - Thể loại: ${getGenreData(manga.genres, genres).map((genre) => genre.name).join(', ')} - Miêu tả: ${manga.description} - Tình trạng: ${manga.status} - Số chương: ${manga.chapters.length} hiện có . Link truyện http://localhost:5173/manga/${manga._id}`;
    }).join('\n');
    return mangaDatabase;
  }

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  }

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    try {
      setLoading(true);
      const prompt = `
        Đây là các truyện tranh có sẵn của bạn: ${templateManga(mangaData, genres)}
        
        Dựa vào thông tin trên, hãy trả lời câu hỏi sau của người dùng. 
        Khi đề cập đến một bộ truyện, hãy sử dụng CHÍNH XÁC đường dẫn từ "Link truyện" trong dữ liệu, 
        và tạo thẻ a với format:
        <a href="[link truyện từ dữ liệu]" class="text-blue-500 hover:underline">[Tên truyện]</a>
        
        Câu hỏi: ${userInput}
      `;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      const newHistory = [
        ...chatHistory,
        { role: "user", text: userInput },
        { role: "assistant", text: response.text() }
      ];
      
      setChatHistory(newHistory);
      // Save to localStorage after each message
      localStorage.setItem('chatHistory', JSON.stringify(newHistory));
      
    } catch (error) {
      toast.error(`Lỗi: ${error.message}`);
    } finally {
      setLoading(false);
      setUserInput("");
    }
  }

  return (
    <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-xl z-40">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800">Chat Bot</h3>
        <div className="flex gap-2">
          <button
            onClick={() => {
              localStorage.removeItem('chatHistory');
              setChatHistory([]);
            }}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Xóa lịch sử
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="h-[400px] overflow-y-auto p-4">
        {chatHistory.map((message, index) => (
          message.role === "assistant" ? (
            <div key={index} className="flex items-start mb-4">
              <div className="rounded-lg p-3 max-w-[80%] border-0 shadow-sm bg-gray-100">
                <ReactMarkdown 
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = props.href;
                        }}
                        className="text-blue-500 hover:underline cursor-pointer"
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="text-gray-800" {...props} />
                    ),
                    span: ({ node, ...props }) => (
                      <span className="text-gray-800" {...props} />
                    ),
                    div: ({ node, ...props }) => (
                      <div className="text-gray-800" {...props} />
                    )
                  }}
                  className="text-gray-800"
                >
                  {message.text}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <div key={index} className="flex items-end justify-end mb-4">
              <div className="rounded-lg p-3 max-w-[80%] border-0 shadow-sm bg-blue-100">
                <p className="text-gray-800">
                  {message.text}
                </p>
              </div>
            </div>
          )
        ))}
      </div>

      <div className="px-4 py-3 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white border-gray-300 text-gray-800 placeholder-gray-500"
            onChange={handleUserInput}
            value={userInput}
          />
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;