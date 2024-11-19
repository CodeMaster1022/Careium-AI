import React, { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import Multiselect from 'multiselect-react-dropdown';
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createTicktes } from '@/redux/features/ticketSlice';
import { useToast } from "@/hooks/use-toast";
interface Option {
  id: Number
  name: string
}

interface Content {
  id: Number
  name: string
}

interface Channel {
  id: Number
  name: string
}

interface Server {
  id: Number
  name: string
}

interface TicketModalProps {
  option: boolean
  handleClose: () => void
}

const contents: Content[] = [
  { id: 1, name: 'Live channels' },
  { id: 2, name: 'Other issues' },
  { id: 3, name: 'Video' },
]

const servers: Server[] = [
  { id: 1, name: 'tzv1' },
  { id: 2, name: 'tzv2' },
]

const channels: Channel[] = [
  { id: 1, name: 'football' },
  { id: 2, name: 'basketball' },
  { id: 3, name: 'volleyball' },
  { id: 4, name: 'tennis' },
]

const options: Option[] = [
  { id: 1, name: 'Live channels' },
  { id: 2, name: 'Video' },
  { id: 3, name: 'Other issues' },
  { id: 4, name: 'EPG missing' },
  { id: 5, name: 'New movie request' },
  { id: 6, name: 'Error message' },
  { id: 7, name: 'Wrong Channel' },
  { id: 8, name: 'Parentals lock required' },
  { id: 9, name: 'Tvcatch-up Not working' },
  { id: 10, name: 'Pixelating' },
  { id: 11, name: 'Freezing' },
  { id: 12, name: 'Other' },
]

const TicketModal: React.FC<TicketModalProps> = ({ option, handleClose }) => {
  const [selectedOption, setSelectedOption] = useState<Option[]>([])
  const [addoption, setAddOption] = useState<string[]>([]);
  const [selectedContent, setSelectedContent] = useState<string>('Live channels')
  const [selectedChannel, setSelectedChannel] = useState<Channel []>([])
  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch
  const [addchannel, setAddChannel] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [server, SetServer] = useState<string>('tzv1');
  const { toast } = useToast();
  const credentials = {
    createdBy:"00:1A:79:89:23:11",
    server: server,
    content: selectedContent,
    issues: addoption,
    problems: addchannel,
    description: description,
  }
  // useEffect(()=>{
  //   console.log(data);
  // },[data])

  // const isAdded = useSelector(
  //   (state: RootState) => state.ticket.isAdded
  // );
  // const error = useSelector(
  //   (state: RootState) => state.ticket.error
  // );
  // useEffect(()=>{
  //   console.log(isAdded,'isadded');
  //   if(isAdded){
  //     toast({
  //     title: "Success!",
  //     description: "Successfully Created!",
  //   });
  //   handleClose()         
  // } else if (error) {
  //   toast({
  //     title: "Failed!",
  //     description: "Ticket was not created!",
  //     variant: "destructive"
  //   });
  // }
  // },[isAdded])
  const createTicket = async() => {
    if(selectedContent != '' && selectedChannel.length > 0 && addoption.length > 0 && addchannel.length > 0){
      try{
        dispatch(createTicktes(credentials));
        handleClose();
        // const response =await axios.post('http://localhost:3000/api/tickets/createTicket',data);
      } catch (e) {
        console.log(e);
      }
    } else {
      toast({
        title: "Failed!",
        description: "Please select all options",
        variant: "destructive"
      });
    }
  }
  const onSelect = (selectedList: Option[], selectedItem: Option) => {
    setSelectedOption(selectedList);
    console.log('Selected Item:-----', selectedItem);
    const selectedIds = selectedList.map(option => option.name);
    setAddOption(selectedIds);
  }
  const onRemove = (selectedList: Option[], removedItem: Option) => {
    setSelectedOption(selectedList);
    const selectedIds = selectedList.map(option => option.name);
    setAddOption(selectedIds);
    console.log('Removed Item:---------', removedItem);
  };
  const onChannelSelect = (selectedList: Channel[], selectedItem: Channel) => {
    setSelectedChannel(selectedList);
    const selectedIds = selectedList.map(option => option.name);
    setAddChannel(selectedIds);
    console.log('Selected Item:', selectedItem);
  }
  const onChannelRemove = (selectedList: Channel[], removedItem: Channel) => {
    setSelectedChannel(selectedList);
    const selectedIds = selectedList.map(option => option.name);
    setAddChannel(selectedIds);
    console.log('Removed Item:', removedItem);
  };
  // const handleChange = (value: any) => {
  //   setSelectedOption(value)
  // }


  return (
    <Dialog open={option} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-[95%] sm:w-[500px] space-y-4 border bg-white py-6 px-4 sm:py-8 sm:px-8 rounded-lg shadow-xl">
          <DialogTitle className="text-lg font-bold sm:text-xl">Create New Ticket</DialogTitle>
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="server" className="block text-sm font-medium text-gray-700 mb-1">
                Select Server
              </label>
              <select
                id="server"
                className="appearance-none w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Select the server"
                onChange={(e)=>SetServer(e.target.value)}
              >
                {servers.map((server) => (
                  <option value={server.name}>
                    {server.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Select Content Type
              </label>
              <select
                id="content"
                className="appearance-none w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Select the content"
                onChange={(e)=>setSelectedContent(e.target.value)}
              >
                {contents.map((content) => (
                  <option value={content.name}>
                    {content.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="options" className="block text-sm font-medium text-gray-700 mb-1">
                Select issues
              </label>
              <Multiselect options={options} selectedValues={selectedOption} onRemove={onRemove} onSelect={onSelect} displayValue='name'/>
            </div>
            <div>
              <label htmlFor="channels" className="block text-sm font-medium text-gray-700 mb-1">
                Select problematic channel
              </label>
              <Multiselect options={channels} selectedValues={selectedChannel} onRemove={onChannelRemove} onSelect={onChannelSelect} displayValue='name'/>
            </div>
            <textarea className='w-full border border-gray-300 rounded-md focus:border-none' onChange={(e)=>setDescription(e.target.value)}/>
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={createTicket}>Submit</Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default TicketModal