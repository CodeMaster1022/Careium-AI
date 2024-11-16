
import { useDispatch } from "react-redux";
import { loginByMacAddress } from '../redux/features/authSlice';
import { AppDispatch } from '../redux/store';

import "../CSS/background.css"
import { useEffect, useState } from "react";
import "../CSS/sendButton.css"
export default function LoginPage () {

  const [method, setMethod] = useState(false);
  const [selectMember, setSelectMember] = useState(false);
  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch
  const [macAddress, setMacAddress] = useState("")

  useEffect(()=>{
    console.log(macAddress);
  },[macAddress]);

  const handleLoginByMacAddress = () => {
    console.log("=========>")
      const credentials = {
        macAddress: macAddress
      };
      
      dispatch(loginByMacAddress(credentials)); // This should now work without error
  };

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
                    <input  className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white" 
                            placeholder="Mac address"
                            value={macAddress}
                            onChange={(e)=>setMacAddress(e.target.value)} />
                  </>)
              }
              <label className="flex cursor-pointer items-center justify-between p-1 text-slate-400">
                {selectMember?(
                <>
                  <p>Customer</p>
                </>
                ):(<p>Reseller</p>)}
                <div className="relative inline-block" onClick={()=>{setSelectMember(!selectMember),setMethod(true)}}>
                  <input className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-gary-400 checked:border-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2" type="checkbox"/>
                  <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-slate-600 transition-all duration-200 peer-checked:left-7 peer-checked:bg-green-300"></span>
                </div>
              </label>
              {
                selectMember?(
                  <label className="flex cursor-pointer items-center justify-between p-1 text-slate-400">
                  {method?(<p>Use Mac address</p>):(<p>Use username</p>)}
                  <div className="relative inline-block" onClick={()=>setMethod(!method)}>
                    <input className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-gary-400 checked:border-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2" type="checkbox"/>
                    <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-slate-600 transition-all duration-200 peer-checked:left-7 peer-checked:bg-green-300"></span>
                  </div>
              </label>
                ):(<></>)
              }
              {method?(<>
                <button className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95">LoginByName</button>
              </>):(
                <>
                <button className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
                        onClick={handleLoginByMacAddress}>
                        LoginByMacAddress
                </button>
                </>)}
            </div>          
      </div>
    </div>
    </div>
    </div>
  )
}
