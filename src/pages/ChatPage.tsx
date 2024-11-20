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

const socket = io('https://telegram-app-backend-eosin.vercel.app/');
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
    <div className="flex w-full justify-center bg-[#181818]">
      <div className="flex h-screen w-full max-w-[1440px]">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-96 bg-[#212121] overflow-y-auto`}>
          <div className="p-4 h-full">
            <div className="flex justify-between mb-2">
              <h2 className="mb-4 text-2xl font-bold text-blue-500">My tickets</h2>
              <button className="button" onClick={()=>setIsOpen(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.25rem"
                  height="1.25rem"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M12 19v-7m0 0V5m0 7H5m7 0h7"></path>
                </svg>
                Create
              </button>
            </div>
            {tickets.map((ticketData) => (
              <div
                key={ticketData.ticket._id}
                className={`mt-1 cursor-pointer text-white rounded-lg p-4 ${
                  ticketData.ticket._id === selectedTicketId ? "bg-[#8774E1] text-primary-foreground" : "hover:bg-green-400"
                }`}
                onClick={() => {
                  setSelectedTicketId(ticketData.ticket._id)
                  setIsSidebarOpen(false)
                }}
              >
                Ticket #{ticketData.ticket.ticketNumber}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className={`${isSidebarOpen ? 'hidden' : 'block'} flex flex-1 flex-col bg-[url('./assets/1.jpg')] bg-cover bg-center`}>
          {/* Header */}
          <div className="h-16 bg-[#212121] border-[black] border-l border-border flex items-center px-4 w-full justify-between">
            <Button
              className="md:hidden mr-2"
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
            <h1 className="text-xl font-bold text-white">
              {selectedTicket ? `Ticket #${selectedTicket.ticket.ticketNumber}` : 'Select a ticket'}
            </h1>
            <Button className="hover:bg-green-400" onClick={handleLogout}>Logout</Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 border-none">
            {selectedTicket?.messages.map((message) => (
              <div key={message._id} className="flex justify-center w-full mb-4">
                <div
                  className={`flex max-w-[80%] md:max-w-[70%] w-full ${
                    message.sender === 'admin' ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`rounded-2xl px-3 py-1 ${
                      message.sender === 'admin' ? "bg-[#212121] text-white" : "bg-[#8774E1] text-white"
                    }`}
                  >
                    <div className="flex">
                      <p className="text-md break-words">{message.content}</p>
                      <p className="text-[10px] md:text-[12px] text-gray-300 ml-1 mt-1 self-end">
                      {new Date(message.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 md:p-8">
            <div className="flex gap-2 max-w-full md:max-w-[70%] mx-auto">
              <Input
                className="py-4 md:py-6 bg-[#212121] text-white flex-grow"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage()
                  }
                }}
              />
              <Button
                className="bg-blue-500 text-white hover:bg-blue-400 transition-all duration-300 md:p-6"
                onClick={handleSendMessage}
              >
                <span className="sr-only">Send message</span>
                <svg
                  className="w-5 h-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <TicketModal option={isOpen} handleClose={() => setIsOpen(false)} />
    </div>
  )
}