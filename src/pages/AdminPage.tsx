import  { useEffect, useState } from 'react';
import TicketTable from '@/components/ui/TicketTable'; // Ensure this path is correct
import Pagination from '@/components/ui/Pagination';
import api from '@/services/api';

// interface Message {
//     _id: string;
//     ticketId: string;
//     content: string;
//     sender: string;
//     ticketNumber: number;
//     createdAt: string;
//     updatedAt: string;
// }

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

// interface TicketData {
//     ticket: Ticket; // Each TicketData contains a Ticket and its messages
//     messages: Message[];
// }

const AdminPage = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 20; // Number of items to display per page
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await api.post('/tickets/getAllTickets');
                setTickets(response.data); // Ensure response.data matches TicketData[]
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };
        fetchTickets();
    }, []);
useEffect(()=>{
    if(tickets){
        tickets.map((item)=>(
            console.log(item.ticketNumber)
        ))

    }
},[tickets])
    const totalItems = tickets.length; // Total number of tickets

    // Calculate current items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
     // Get current items based on pagination
     const currentItems = tickets.slice(indexOfFirstItem, indexOfLastItem);

     return (
         <div className="container mx-auto p-4">
             <h1 className="text-center text-2xl font-bold mb-4">Tickets</h1>
             {/* Pass only current items */}
             <TicketTable tickets={currentItems} /> 
             <Pagination 
                 totalItems={totalItems} 
                 itemsPerPage={itemsPerPage} 
                 currentPage={currentPage} 
                 setCurrentPage={setCurrentPage} 
             />
         </div>
     );
};

export default AdminPage;
