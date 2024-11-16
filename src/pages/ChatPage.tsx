'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import TicketModal from "@/components/modal/TicketModal"


interface Message {
  id: number
  content: string
  timestamp: string
  isOutgoing: boolean
}

interface Ticket {
  id: string
  messages: Message[]
  isSelected: boolean
}

export default function Component() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "503",
      messages: [],
      isSelected: false,
    },
    {
      id: "279",
      messages: [
        {
          id: 1,
          content: "First test",
          timestamp: "11:58 AM",
          isOutgoing: true,
        },
        {
          id: 2,
          content: "you are in",
          timestamp: "11:58 AM",
          isOutgoing: false,
        },
        {
          id: 3,
          content: "Hi",
          timestamp: "12:05 PM",
          isOutgoing: true,
        },
        {
          id: 4,
          content: "yeah,",
          timestamp: "12:05 PM",
          isOutgoing: false,
        },
      ],
      isSelected: true,
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const selectedTicket = tickets.find((ticket) => ticket.isSelected)

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedTicket) return

    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === selectedTicket.id) {
        return {
          ...ticket,
          messages: [
            ...ticket.messages,
            {
              id: ticket.messages.length + 1,
              content: newMessage,
              timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
              isOutgoing: false,
            },
          ],
        }
      }
      return ticket
    })

    setTickets(updatedTickets)
    setNewMessage("")
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex w-full justify-center bg-[#181818]">
      <div className="flex h-screen w-full max-w-[1440px]">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-96 bg-[#212121] overflow-y-auto`}>
          <div className="p-4 h-full">
            <h2 className="mb-4 text-2xl font-bold text-blue-500">My tickets</h2>
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`mb-2 cursor-pointer rounded-lg p-4 ${
                  ticket.isSelected ? "bg-[#8774E1] text-primary-foreground" : "hover:bg-muted text-white"
                }`}
                onClick={() => {
                  setTickets(
                    tickets.map((t) => ({
                      ...t,
                      isSelected: t.id === ticket.id,
                    }))
                  )
                  setIsSidebarOpen(false) // Close sidebar on mobile after selection
                }}
              >
                Ticket #{ticket.id}
              </div>
            ))}
            <Button className="mt-4 w-full" variant="secondary" onClick={() => setIsOpen(true)}>
              CREATE NEW TICKET
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className={`${isSidebarOpen ? 'hidden' : 'block'} flex flex-1 flex-col bg-[url('./assets/1.jpg')] bg-cover bg-center`}>
          {/* Header */}
          <div className="h-16 bg-[#212121] border-[black] border-l border-border flex items-center px-4">
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
              {selectedTicket ? `Ticket #${selectedTicket.id}` : 'Select a ticket'}
            </h1>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 border-none">
            {selectedTicket?.messages.map((message) => (
              <div key={message.id} className="flex justify-center w-full mb-4">
                <div
                  className={`flex max-w-[80%] md:max-w-[70%] w-full ${
                    message.isOutgoing ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`rounded-2xl px-3 py-1 ${
                      message.isOutgoing ? "bg-[#212121] text-white" : "bg-[#8774E1] text-white"
                    }`}
                  >
                    <div className="flex">
                      <p className="text-md break-words">{message.content}</p>
                      <p className="text-[10px] md:text-[12px] text-gray-300 ml-1 mt-1 self-end">{message.timestamp}</p>
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