import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/services/api';
interface Message {
    _id: string;
    ticketId: string;
    content: string;
    sender: string;
    ticketNumber: number;
    createdAt: string;
    updatedAt: string;
}

const MessagePage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { ticketNumber } = useParams<{ ticketNumber: any }>();
  const [loading, setLoading] = useState<boolean>(true);
  const handleGetMessageById = async () => {
    const data = { ticketNumber: Number(ticketNumber) };
    try {
      setLoading(true);
      const response = await api.post('/tickets/getMessageById', data);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }  finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetMessageById();
  }, [ticketNumber]);
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  return (
<div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Ticket Discussion #{ticketNumber}
          </h1>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Active
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-4 rounded-lg shadow-sm max-w-[80%] ${
                message.sender === 'admin'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-white rounded-bl-none'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'admin' ? 'bg-blue-600' : 'bg-gray-200'
                }`}>
                  {message.sender.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className={`font-medium ${message.sender === 'admin' ? 'text-white' : 'text-gray-900'}`}>
                    {message.sender}
                  </span>
                  <span className={`text-xs ${message.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {new Date(message.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <p className={`${message.sender === 'admin' ? 'text-white' : 'text-gray-700'}`}>
                {message.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default MessagePage;