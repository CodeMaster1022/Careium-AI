
import { Link } from "react-router-dom"
// import { useDispatch } from "react-redux";
// import { loginUser } from '../redux/features/authSlice';
// import { AppDispatch } from '../redux/store';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import "../CSS/background.css"
import { useState } from "react";
import "../CSS/sendButton.css"
export default function LoginPage () {

  const [method, setMethod] = useState(false);
  const [selectMember, setSelectMember] = useState(false);
  // const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch

  // const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const formData = new FormData(e.currentTarget);
  //     const credentials = {
  //         username: formData.get('username') as string,
  //         password: formData.get('password') as string,
  //     };
      
  //     dispatch(loginUser(credentials)); // This should now work without error
  // };
  return (
    <div className="background">
    <div className="w-full h-screen flex justify-center items-center bg-[#212121]">
    <div className="background">
      <div className="w-[400px] rounded-2xl bg-slate-900 py-4">
            <div className="flex flex-col gap-5 p-8">
              <p className="text-center text-4xl text-gray-300 mb-4 font-bold">Welcome!</p>
              {
                method? 
                  (
                  <>
                  <input className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white" placeholder="username" />
                  <input className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 text-white focus:ring-offset-gray-800" placeholder="password" type="password"/>
                  </>
                  )
                  :(
                  <>
                    <input className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white" placeholder="Mac address" />
                    <input className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white" placeholder="Serial Number" />
                  </>)
              }
              <label className="flex cursor-pointer items-center justify-between p-1 text-slate-400" onClick={()=>{setSelectMember(!selectMember),setMethod(true)}}>
                {selectMember?(
                <>
                  <p>Customer</p>
                </>
                ):(<p>Reseller</p>)}
                <div className="relative inline-block">
                  <input className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-gary-400 checked:border-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2" type="checkbox"/>
                  <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-slate-600 transition-all duration-200 peer-checked:left-7 peer-checked:bg-green-300"></span>
                </div>
              </label>
              {
                selectMember?(
                  <label className="flex cursor-pointer items-center justify-between p-1 text-slate-400" onClick={()=>setMethod(!method)}>
                  {method?(<p>Use Mac address</p>):(<p>Use username</p>)}
                  <div className="relative inline-block">
                    <input className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-gary-400 checked:border-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2" type="checkbox"/>
                    <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-slate-600 transition-all duration-200 peer-checked:left-7 peer-checked:bg-green-300"></span>
                  </div>
              </label>
                ):(<></>)
              }
                <Link to="/chat" className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95">Login</Link>
            </div>          
      </div>
    </div>
    </div>
    </div>
  )
}
