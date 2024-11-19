import React from 'react';
import { Button } from '@/components/ui/button'
import { useDispatch } from "react-redux"
import { stopTicket } from '@/redux/features/ticketSlice';
import { AppDispatch } from "../../redux/store";

interface Ticket {
    _id: string;
    createdBy: string;
    server: string;
    content: string;
    issues: string[];
    problems: string[];
    description: string;
    status: string;
    ticketNumber: number;
    telegramMessageId: string;
    createdAt: string
}

interface TicketTableProps {
    tickets: Ticket[];
}

const TicketTable: React.FC<TicketTableProps> = ({ tickets }) => {

    const dispatch = useDispatch<AppDispatch>();
    const handleStopTicket = (ticketnumber:number) => {
        console.log("=====>")
        const data = {
            ticketNumber: ticketnumber
        }
        dispatch(stopTicket(data))
    }
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">No</th>
                        <th className="py-3 px-6 text-left">Created By</th>
                        <th className="py-3 px-6 text-left">Server</th>
                        <th className="py-3 px-6 text-left">Content</th>
                        <th className="py-3 px-6 text-left">Issues</th>
                        <th className="py-3 px-6 text-left">Problems</th>
                        <th className="py-3 px-6 text-left">Status</th>
                        <th className="py-3 px-6 text-left">Created At</th>
                        <th className="py-3 px-6 text-left">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {tickets.map((ticket) => (
                        <tr key={ticket._id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6">{ticket.ticketNumber}</td>
                            <td className="py-3 px-6">{ticket.createdBy}</td>
                            <td className="py-3 px-6">{ticket.server}</td>
                            <td className="py-3 px-6">{ticket.content}</td>
                            <td className="py-3 px-6">{ticket.issues.join(', ')}</td>
                            <td className="py-3 px-6">{ticket.problems.join(', ')}</td>
                            <td className="py-3 px-6">{ticket.status}</td>
                            <td className="py-3 px-6">{new Date(ticket.createdAt).toLocaleString()}</td>
                            <td className="py-3 px-6">
                                {
                                    ticket.status  == 'stop'? 
                                    (<Button disabled={true}>Stop</Button>):
                                    (<Button onClick={()=>handleStopTicket(ticket.ticketNumber)}>Stop</Button>)
                                }
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketTable;