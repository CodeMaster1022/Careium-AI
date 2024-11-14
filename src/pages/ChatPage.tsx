"use client"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { ScrollArea } from "../components/ui/scroll-area"
import TicketModal from "../components/modal/TicketModal"
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
  let [isOpen, setIsOpen] = useState(false)

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

  return (
    <div className="flex w-full justify-center bg-[#181818]">
      <div className="flex h-screen max-w-[90%] w-full">
        <div className="w-96 bg-muted/50 bg-[#212121]">
          <div className="p-4 bg-[#212121] h-screen">
            <h2 className="mb-4 text-2xl font-bold text-blue-500">My tickets</h2>
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`mb-2 cursor-pointer rounded-lg p-4 ${
                  ticket.isSelected ? "bg-[#8774E1] text-primary-foreground" : "hover:bg-muted text-white"
                }`}
                onClick={() =>
                  setTickets(
                    tickets.map((t) => ({
                      ...t,
                      isSelected: t.id === ticket.id,
                    }))
                  )
                }
              >
                Ticket #{ticket.id}
              </div>
            ))}
            <Button className="mt-4 w-full" variant="secondary" onClick={() => setIsOpen(true)}>
              CREATE NEW TICKET
            </Button>
          </div>
        </div>
        <div className="flex flex-1 flex-col bg-[url('./assets/1.jpg')] bg-cover bg-center"> 
          <div className="h-16 bg-[#212121] border-[black] border-l border-border"></div>
          <ScrollArea className="flex-1 p-4 border-none">
            {selectedTicket?.messages.map((message) => (
              <div className="flex justify-center w-full">
                <div
                  key={message.id}
                  className={`flex mb-1 max-w-[60%] w-full ${message.isOutgoing ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`rounded-2xl px-3 py-1 ${
                      message.isOutgoing ? "bg-[#212121] text-white" : "bg-[#8774E1] text-white"
                    }`}
                  >
                    <div className="flex">
                      <p className=" text-md">{message.content}</p>
                      <p className="text-gray-300 text-[12px] mt-2">&nbsp;{message.timestamp}</p>
                  </div>
                  </div>
                  {/* <div className="mt-1 text-xs text-white text-muted-foreground">{message.timestamp}</div> */}
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="p-8">
            <div className="flex gap-2 max-w-[60%] mx-auto">
              <Input
                className="py-6 bg-[#212121] text-white"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage()
                  }
                }}
              />
              <button
                  className="flex items-center bg-blue-500 text-white gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3"
                  onClick={handleSendMessage}
              >
                Send
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
              </button>
            </div>
          </div>
        </div>
      </div>
      <TicketModal option={isOpen} handleClose={() => setIsOpen(false)}/>
    </div>
  )
}