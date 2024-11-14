import React from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Select from 'react-tailwindcss-select';
import { useState } from 'react'
import { Button } from '../ui/button';

interface Option {
  value: string;
  label: string;
}
interface Content {
    id: number,
    name: string,
}
interface Channel {
    value: string,
    label: string,
}
interface Server {
    id: number,
    name: string,
}

interface TicketMoalProps {
    option: boolean;
    handleClose: () => void;
}
const contents: Content [] = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
  ]
  const servers: Server [] = [
    { id: 1, name: 'tzv1' },
    { id: 2, name: 'tzv2' },
  ]
  const channels: Channel [] = [
    { value: "label1", label: 'football' },
    { value: "label2", label: 'basketball' },
    { value: "label3", label: 'volleyball' },
    { value: "label4", label: 'tennis' },
  ]
  const options: Option[] = [
    { value:"label1", label: 'Live channels' },
    { value: "label2", label: 'Video' },
    { value: "label3", label: 'Other issues' },
    { value: "label4", label: 'EPG missing' },
    { value: "label5", label: 'New movie request' },
    { value: "label6", label: 'Error message' },
    { value: "label7", label: 'Wrong Channel' },
    { value: "label8", label: 'Parentals lock required' },
    { value: "label9", label: 'Tvcatch-up Not working' },
    { value: "label10", label: 'Pixelating' },
    { value: "label11", label: 'Freezing' },
    { value: "label12", label: 'Other' },
  ];
const  TicketModal: React.FC<TicketMoalProps> =({option, handleClose}) => {
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

    const handleChange = (value: any) => {
        setSelectedOption(value);
      };
    const handleChannelChange = (value: any) => {
    setSelectedChannel(value);
    };
    
    return (
        <>
        <button onClick={() => {}}>Open dialog</button>
        <Dialog open={option} onClose={handleClose} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className=" min-w-[500px] space-y-4 border bg-white py-8 px-8">
                <DialogTitle className="font-bold">Create New Ticket</DialogTitle>
                <div
                className="relative group bg-gray-50 overflow-hidden before:absolute before:w-12 before:h-12 before:contents[''] before:right-0  before:rounded-full before:blur-lg"
                >
                    <select
                        className="appearance-none hover:placeholder-shown:bg-emerald-500 relative  ring-0 outline-none border border-neutral-300 text-neutral-900  text-sm font-bold rounded-lg focus:ring-violet-500 block w-full p-2"
                        aria-placeholder='Select the server...'
                    >{
                        servers.map((server) => (  
                            <option key={server.id} value={server.name}>  
                            {server.name}  
                            </option>  
                        ))
                    }
                    </select>
                </div>
                <div
                className="relative group bg-gray-50 overflow-hidden before:absolute before:w-12 before:h-12 before:contents[''] before:right-0  before:rounded-full before:blur-lg"
                >
                    <select
                        className="appearance-none hover:placeholder-shown:bg-emerald-500 relative  ring-0 outline-none border border-neutral-300 text-neutral-900  text-sm font-bold rounded-lg focus:ring-violet-500 block w-full p-2"
                    >{
                        contents.map((content) => (  
                            <option key={content.id} value={content.name}>  
                            {content.name}  
                            </option>  
                        ))
                    }
                    </select>
                </div>
                <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={options}
                    isMultiple={true}
                    isSearchable={true}
                    primaryColor={"indigo"}
                    classNames={{
                        menuButton: (value:any) => {
                        const isDisabled = value?.isDisabled;
                        return `flex text-sm px-2 text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                            isDisabled
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
                        "text-xs w-full py-2 pl-8 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none",
                        searchIcon:
                        "absolute w-4 h-4 mt-2.5 pb-0.5 ml-1.5 text-gray-500",
                    }}
                />
                <Select
                    value={selectedChannel}
                    onChange={handleChannelChange}
                    options={channels}
                    isMultiple={true}
                    isSearchable={true}
                    primaryColor={"indigo"}
                    classNames={{
                        menuButton: (value:any) => {
                        const isDisabled = value?.isDisabled;
                        return `flex text-sm px-2 text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                            isDisabled
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
                        "text-xs w-full py-2 pl-8 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none",
                        searchIcon:
                        "absolute w-4 h-4 mt-2.5 pb-0.5 ml-1.5 text-gray-500",
                    }}
                />
                <div className="flex gap-4 justify-end">
                <Button onClick={handleClose}>Submit</Button>
                </div>
            </DialogPanel>
            </div>
        </Dialog>
        </>
    )
}

export default TicketModal;