'use client'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import TicketModal from "@/components/modal/TicketModal"
import { logout } from "@/redux/features/authSlice"
import { RootState } from '@/redux/store';
import api from "@/services/api"
import io from 'socket.io-client'
import '../CSS/createButton.css'

interface Message {
  _id: string
  ticketId: string
  content: string
  sender: string
  ticketNumber: string
  createdAt: string
  updatedAt: string
}

interface Ticket {
  _id: string
  createdBy: string
  server: string
  content: string
  issues: string[]
  problems: string[]
  description: string
  status: string
  ticketNumber: string
  createdAt: string
  updatedAt: string
}

interface TicketData {
  ticket: Ticket
  messages: Message[]
}

const socket = io('https://telegram-app-backend-phi.vercel.app/');
export default function Component() {
  const [tickets, setTickets] = useState<TicketData[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)

  const username = localStorage.getItem('username')
  const dispatch = useDispatch()
  const router = useNavigate()
  const isloading = useSelector(
    (state: RootState) => state.ticket.loading
  );
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.post('/tickets/getMessage', { username })
        setTickets(response.data)
      } catch (error) {
        console.error('Error fetching tickets:', error)
      }
    }
    fetchTickets()
    
    socket.on('connect', () => {
      console.log('Connected to server')
    })  

    socket.on('newMessage', (message: Message) => {
      console.log(message);
      setTickets(prevTickets => 
        prevTickets.map(ticketData => 
          ticketData.ticket._id === message.ticketId
            ? { ...ticketData, messages: [...ticketData.messages, message] }
            : ticketData
        )
      )
    })
    console.log("======>")
    return () => {
      socket.off('connect')
      socket.off('newMessage')
    }
  }, [username, isloading])
  useEffect(()=>{
    console.log(tickets);
  }, [tickets])

  const selectedTicket = tickets.find((ticket) => ticket.ticket._id === selectedTicketId)

  const handleLogout = () => {
    dispatch(logout())
    router("/")
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedTicket) return

    try {
      const messageData = {
        ticketId: selectedTicket.ticket._id,
        content: newMessage,
        sender: "user",
        ticketNumber: selectedTicket.ticket.ticketNumber
      }
      console.log(messageData);
      socket.emit('sendMessage', messageData);
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex w-full justify-center bg-[#17212b]">
    <div className="flex h-screen w-full max-w-[1440px]">
      {/* Sidebar - Telegram style dark */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-96 bg-[#17212b] border-r border-l border-b border-[#232e3c]`}>
        <div className="p-6 h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              My Tickets
            </h2>
            <button
              className="px-4 py-2 bg-[#3390ec] hover:bg-[#3b9aef] text-white rounded-lg transition-all duration-300 flex items-center gap-2"
              onClick={() => setIsOpen(true)}
            >
              Create
            </button>
          </div>
          
          <div className="space-y-2">
            {tickets.map((ticketData) => (
              <div
                key={ticketData.ticket._id}
                className={`transition-all duration-300 cursor-pointer rounded-lg p-4 ${
                  ticketData.ticket._id === selectedTicketId 
                    ? "bg-[#2b5278]" 
                    : "hover:bg-[#232e3c]"
                }`}
                onClick={() => {
                  setSelectedTicketId(ticketData.ticket._id);
                  setIsSidebarOpen(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium flex items-center">Ticket
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ml-4 ${
                  'bg-blue-600'
                    }`}>
                      <p className=" text-xs">{ticketData.ticket.ticketNumber}</p>
                    </div>
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    ticketData.ticket.status === 'open'
                      ? 'bg-[#8774E1]/20 text-[#8774E1]'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {ticketData.ticket.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#0E1621]">
        {/* Header */}
        <div className="h-16 bg-[#17212b] border-b border-[#232e3c] flex items-center px-6">
          <Button
            className="md:hidden mr-4 text-[#3390ec] hover:bg-[#232e3c]"
            variant="ghost"
            onClick={toggleSidebar}
          >
            <svg />
          </Button>
          
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#3390ec]"></div>
              <h1 className="text-xl font-semibold text-white">
                {selectedTicket ? `Ticket  ${selectedTicket.ticket.ticketNumber}` : 'Select a ticket'}
              </h1>
            </div>
            <Button
              className="bg-[#3390ec] hover:bg-[#3b9aef] transition-all duration-300"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {selectedTicket?.messages.map((message) => (
              <div
                key={message._id}
                className={`flex ${message.sender === 'admin' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] ${
                  message.sender === 'admin'
                    ? 'bg-[#182533] rounded-br-xl rounded-bl-xl rounded-tr-xl'
                    : 'bg-[#2b5278] rounded-bl-xl rounded-br-xl rounded-tl-xl'
                } p-4 shadow-lg`}>
                  <p className="text-white">{message.content}</p>
                  <div className="mt-1 text-xs text-gray-400 flex justify-end">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-6 bg-[#17212b] border-t border-[#232e3c]">
          <div className="flex gap-3 max-w-3xl mx-auto">
            <Input
              className="bg-[#242f3d] border-[#232e3c] text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#3390ec]"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              className="bg-[#3390ec] hover:bg-[#3b9aef] px-6 rounded-xl transition-all duration-300"
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
      <TicketModal option={isOpen} handleClose={() => setIsOpen(false)} />
    </div>
  </div>
  );
}