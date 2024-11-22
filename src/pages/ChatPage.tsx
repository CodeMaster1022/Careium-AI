"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import TicketModal from "@/components/modal/TicketModal";
import { logout } from "@/redux/features/authSlice";
import { RootState } from "@/redux/store";
import api from "@/services/api";
import io from "socket.io-client";
import "../CSS/createButton.css";
import FileUploadModal from "./FileUploadModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
interface Message {
  _id: string;
  ticketId: string;
  content: string;
  sender: string;
  ticketNumber: string;
  createdAt: string;
  updatedAt: string;
  type: string;
}

interface Ticket {
  _id: string;
  createdBy: string;
  server: string;
  content: string;
  issues: string[];
  problems: string[];
  description: string;
  status: string;
  ticketNumber: string;
  createdAt: string;
  updatedAt: string;
}

interface TicketData {
  ticket: Ticket;
  messages: Message[];
}

export const socket = io("http://localhost:3000/");
export default function Component() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const username = localStorage.getItem("username");
  const dispatch = useDispatch();
  const router = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const isloading = useSelector((state: RootState) => state.ticket.loading);

  // Add this click handler
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.post("/tickets/getMessage", { username });
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchTickets();

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("newMessage", (message: Message) => {
      console.log(message);
      setTickets((prevTickets) =>
        prevTickets.map((ticketData) =>
          ticketData.ticket._id === message.ticketId
            ? { ...ticketData, messages: [...ticketData.messages, message] }
            : ticketData
        )
      );
    });
    console.log("======>");
    return () => {
      socket.off("connect");
      socket.off("newMessage");
    };
  }, [username, isloading]);
  useEffect(() => {
    console.log(tickets);
  }, [tickets]);

  const selectedTicket = tickets.find(
    (ticket) => ticket.ticket._id === selectedTicketId
  );

  const handleLogout = () => {
    dispatch(logout());
    router("/login");
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedTicket) return;

    try {
      const messageData = {
        ticketId: selectedTicket.ticket._id,
        content: newMessage,
        sender: "user",
        ticketNumber: selectedTicket.ticket.ticketNumber,
      };
      console.log(messageData);
      socket.emit("sendMessage", messageData);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex w-full justify-center bg-[#17212b]">
      <div className="flex h-screen w-full max-w-[1440px]">
        {/* Sidebar - Telegram style dark */}
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block md:w-96 w-[180px] bg-[#17212b] border-r border-l border-b border-[#232e3c]`}
        >
          <div className="sm:p-6 px-2 py-5 h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="sm:text-2xl text-sm font-bold text-white">
                My Tickets
              </h2>
              <button
                className="sm:px-4 px-2 sm:py-2 py-1 bg-[#3390ec] hover:bg-[#3b9aef] text-white rounded-lg transition-all duration-300 flex items-center gap-2"
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
                    <span className="text-white font-medium flex items-center">
                      Ticket
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center ml-4 ${"bg-blue-600"}`}
                      >
                        <p className=" text-xs">
                          {ticketData.ticket.ticketNumber}
                        </p>
                      </div>
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        ticketData.ticket.status === "open"
                          ? "bg-[#8774E1]/20 text-[#8774E1]"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
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
          <div className="h-16 bg-[#17212b] border-b border-[#232e3c] flex items-center sm:px-6 px-2">
            <Button
              className="md:hidden mr-4 text-[#3390ec] hover:bg-[#232e3c] bg-gray-800"
              variant="ghost"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? "-" : "+"}
            </Button>

            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#3390ec]"></div>
                <h1 className="text-xl font-semibold text-white">
                  {selectedTicket ? (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost">More detail...</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="auto">
                          <DropdownMenuLabel>
                            Ticket Number: {selectedTicket.ticket.ticketNumber}
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <span> 📄 Content: {selectedTicket.ticket.content}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <span>👤 Created By: {selectedTicket.ticket.createdBy}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <span> 📄 Content: {selectedTicket.ticket.content}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <span>👤 Created By: {selectedTicket.ticket.createdBy}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <span> 📝 Description: {selectedTicket.ticket.content}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <span>❗ Issues: {selectedTicket.ticket.createdBy}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <span>⚠️ Problems: {selectedTicket.ticket.createdBy}</span>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  ) : (
                    <></>
                  )}
                </h1>
              </div>
              <button
                onClick={handleLogout}
                className="group flex items-center justify-start w-8 h-8 bg-gray-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-12 hover:rounded-lg active:translate-x-1 active:translate-y-1"
              >
                <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                  <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </div>
                <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  {/* Logout */}
                </div>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {selectedTicket?.messages.map((message) => (
                <div
                  key={message._id}
                  className={`flex ${
                    message.sender === "admin" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] ${
                      message.sender === "admin"
                        ? "bg-[#182533] rounded-br-xl rounded-bl-xl rounded-tr-xl"
                        : "bg-[#2b5278] rounded-bl-xl rounded-br-xl rounded-tl-xl"
                    } p-4 shadow-lg`}
                  >
                    <p className="text-white">{message.content}</p>
                    <div className="mt-1 text-xs text-gray-400 flex justify-end">
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
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
              <div className="relative flex items-center w-full">
                <Input
                  className="bg-[#242f3d] border-[#232e3c] text-white px-4 py-4 rounded-xl focus:ring-2 focus:ring-[#3390ec] pr-24"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                {selectedTicket ? (
                  <div className="absolute right-2">
                    <Button
                      variant="outline"
                      className="h-8 w-8 bg-[#242f3d] text-white border-[#232e3c] hover:bg-[#2b3a4b]"
                      onClick={openModal}
                    >
                      <svg
                        className="stroke-blue-300 fill-none"
                        xmlns="http://www.w3.org/2000/svg"
                        width="60px"
                        height="60px"
                        viewBox="0 -0.5 25 25"
                      >
                        <path
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          d="M15.17 11.053L11.18 15.315C10.8416 15.6932 10.3599 15.9119 9.85236 15.9178C9.34487 15.9237 8.85821 15.7162 8.51104 15.346C7.74412 14.5454 7.757 13.2788 8.54004 12.494L13.899 6.763C14.4902 6.10491 15.3315 5.72677 16.2161 5.72163C17.1006 5.71649 17.9463 6.08482 18.545 6.736C19.8222 8.14736 19.8131 10.2995 18.524 11.7L12.842 17.771C12.0334 18.5827 10.9265 19.0261 9.78113 18.9971C8.63575 18.9682 7.55268 18.4695 6.78604 17.618C5.0337 15.6414 5.07705 12.6549 6.88604 10.73L12.253 5"
                        ></path>
                      </svg>
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
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
        {/* {selectedTicket?( */}
        <FileUploadModal
          isOpen={isModalOpen}
          onClose={closeModal}
          ticketId={selectedTicket?.ticket._id}
          ticketNumber={selectedTicket?.ticket.ticketNumber}
        />
        {/* ):(<></>)} */}
      </div>
    </div>
  );
}
