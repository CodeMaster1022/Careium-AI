
import { Link } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import "../CSS/sendButton.css"
export default function LoginPage () {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#212121]">
      <div className="w-96 rounded-2xl bg-slate-900">
        <Tabs defaultValue="tzv1" className="p-4">
          <TabsList className="w-full py-6">
            <TabsTrigger value="tzv1" className="w-1/3 ">TZV1</TabsTrigger>
            <TabsTrigger value="tzv2" className="w-1/3 py-2">TZV2</TabsTrigger>
            <TabsTrigger value="register" className="w-1/3 py-2">REGISTER</TabsTrigger>
          </TabsList>
          <TabsContent value="tzv1">
            <div className="flex flex-col gap-5 p-4">
              <input className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" placeholder="Login" />
              <input className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" placeholder="Password" />
              <input className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" placeholder="or use Mac address" />
                <Link to="/chat" className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95">Login</Link>
            </div>          
          </TabsContent>
          <TabsContent value="tzv2">
            <div className="flex flex-col gap-5 p-4">
              <input className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" placeholder="Login" />
              <input className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" placeholder="Password" />
              <input className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" placeholder="or use Mac address" />
                <Link to="/chat" className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95">Login</Link>
            </div>               
          </TabsContent> 
          <TabsContent value="register">
            <div className="flex flex-col gap-8 px-4 py-12">
              <input className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" placeholder="Login" />
              <input className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" placeholder="Password" />
                <Link to="/chat" className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95">Login</Link>
            </div>               
          </TabsContent>        
        </Tabs>
      </div>
    </div>
  )
}
