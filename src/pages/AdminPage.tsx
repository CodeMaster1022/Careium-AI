import  { useEffect, useState } from 'react';
import TicketTable from '@/components/ui/TicketTable'; // Ensure this path is correct
import Pagination from '@/components/ui/Pagination';
import api from '@/services/api';
import {  useSelector } from "react-redux"
import { RootState } from "../redux/store";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
    const [position, setPosition] = useState("bottom")
    const loading = useSelector(
        (state: RootState) => state.ticket.loading
      );
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
    }, [loading]);
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
    const naviate = useNavigate();
    const handlelogout = () => {
        localStorage.removeItem('userinfo');
        naviate('/');
    }
     return (
         <div className="container mx-auto p-4">
            <div className='flex justify-end w-full'>
                <button className='bg-green-500 p-3 rounded-lg' onClick={handlelogout}>Logout</button>
            </div>
             <h1 className="text-center text-2xl font-bold mb-4">Tickets</h1>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-32">
                    <DropdownMenuLabel>SelectBy</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    <DropdownMenuRadioItem value="top">User</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">All Tickets</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
                <div className="h-4"/>
            </DropdownMenu>
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
