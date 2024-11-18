import React, { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Select from 'react-tailwindcss-select'
import { Button } from '@/components/ui/button'
import Multiselect from 'multiselect-react-dropdown';

interface Option {
  id: number
  name: string
}

interface Content {
  id: number
  name: string
}

interface Channel {
  id: number
  name: string
}

interface Server {
  id: number
  name: string
}

interface TicketModalProps {
  option: boolean
  handleClose: () => void
}

const contents: Content[] = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
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
  // const [selectedContent, setSelectedContent] = useState<Content[]>([])
  const [selectedChannel, setSelectedChannel] = useState<Channel []>([])

  const onSelect = (selectedList: Option[], selectedItem: Option) => {
    setSelectedOption(selectedList);
    console.log('Selected Item:', selectedItem);
    console.log('Selected List:', selectedList);
  }
  const onRemove = (selectedList: Option[], removedItem: Option) => {
    setSelectedOption(selectedList);
    console.log('Removed Item:', removedItem);
    console.log('Selected List after removal:', selectedList);
  };
  const onChannelSelect = (selectedList: Channel[], selectedItem: Channel) => {
    setSelectedChannel(selectedList);
    console.log('Selected Item:', selectedItem);
    console.log('Selected List:', selectedList);
  }
  const onChannelRemove = (selectedList: Channel[], removedItem: Channel) => {
    setSelectedChannel(selectedList);
    console.log('Removed Item:', removedItem);
    console.log('Selected List after removal:', selectedList);
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
              >
                {servers.map((server) => (
                  <option key={server.id} value={server.name}>
                    {server.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Select Content
              </label>
              <select
                id="content"
                className="appearance-none w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Select the content"
              >
                {contents.map((content) => (
                  <option key={content.id} value={content.name}>
                    {content.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="options" className="block text-sm font-medium text-gray-700 mb-1">
                Select Options
              </label>
              <Multiselect options={options} selectedValues={selectedOption} onRemove={onRemove} onSelect={onSelect} displayValue='name'/>
            </div>
            <div>
              <label htmlFor="channels" className="block text-sm font-medium text-gray-700 mb-1">
                Select Channels
              </label>
              <Multiselect options={channels} selectedValues={selectedChannel} onRemove={onChannelRemove} onSelect={onChannelSelect} displayValue='name'/>
              {/* <Select
                value={selectedChannel}
                onChange={handleChannelChange}
                options={channels}
                isMultiple={true}
                isSearchable={true}
                primaryColor={"indigo"}
                classNames={{
                  menuButton: (value:any) =>{
                    const isSelected = value?.isSelected;
                    return  `flex text-sm px-3 py-0 text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                        isSelected
                        ? "bg-gray-200"
                        : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                    }`;
                },
                  menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-xs text-gray-700",
                  listItem: (value:any) => {
                    const isSelected = value?.isSelected;
                    return `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                        isSelected
                        ? "text-white bg-blue-500"
                        : "text-gray-500 hover:bg-blue-100 hover:text-blue-500"
                    }`;
                },
                  searchBox:
                    "w-full py-2 pl-8 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none",
                  searchIcon:
                    "absolute w-4 h-4 mt-2.5 ml-2 text-gray-500",
                }}
              /> */}
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={handleClose}>Submit</Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default TicketModal