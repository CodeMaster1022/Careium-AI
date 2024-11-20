import { useDispatch, useSelector } from "react-redux";
import { loginByMacAddress, loginByUsername, loginByLogin } from "../redux/features/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { AppDispatch } from "../redux/store";

import "../CSS/background.css";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import "../CSS/sendButton.css";
export default function LoginPage() {
  const [method, setMethod] = useState(1);
  const [selectMember, setSelectMember] = useState(0);
  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch
  const [macAddress, setMacAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector(
    (state: RootState) => state.auth.user
  );
  const { toast } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    if(user?.status == "success"){
      toast({
        title: "Success!",
        description: "Successfully logged",
      });
      navigate("/chat");
    } else if(user?.status == "fail"){
      toast({
        title: "Failed",
        description: user?.message,
        variant: "destructive"
      });            
    }
  }, [user?.status, navigate]);

  const handleLoginByMacAddress = () => {
    const credentials = {
      macAddress: macAddress,
      role: selectMember
    };
    if (macAddress == "") {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please enter the MacAddress",
      });
    } else {
      try{
        localStorage.setItem('username',macAddress);
        dispatch(loginByMacAddress(credentials))    
      } catch(e){
        console.log(e);
      }
    }
  };
  const handleRole = () => {
    setMethod((prev) => (prev === 0 ? 1 : 0)); // Toggle between 0 and 1
  };
  const handleLoginByRole = () => {
    const credentials = {
      username: username,
      password: password,
      role: selectMember,
    };
    if (username == "" || password == "") {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please enter the Username and Password",
      });
    } else {
      try{
        localStorage.setItem('username', username);
        if(selectMember == 1){
          dispatch(loginByUsername(credentials))
        } else {
          dispatch(loginByLogin(credentials))
        }  
    }
     catch(e){
        console.log(e);
      }
    }
  };


  return (
      <div className="min-h-screen w-full bg-gradient-to-b from-[#2B4570] to-[#3A5A8C] p-6 flex items-center justify-center">
        <div className="">
          <div className="w-full max-w-md p-4 rounded-lg bg-black/10 backdrop-blur-sm md:w-[400px]">
            <div className="flex justify-end">
              <Link to="/adminLogin" className="text-gray-400">Are you admin?</Link>
            </div>            
            <div className="flex flex-col gap-5 py-4 px-4">
              <p className="text-center text-4xl text-gray-300 mb-4 font-bold">
                Welcome!
              </p>
              {method ? (
                <>
                  <input
                    className="w-full p-3 rounded bg-white/20 border border-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    value={username}
                  />
                  <input
                    className="w-full p-3 rounded bg-white/20 border border-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </>
              ) : (
                <>
                  <input
                    className="w-full p-3 rounded bg-white/20 border border-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="Mac address"
                    value={macAddress}
                    onChange={(e) => setMacAddress(e.target.value)}
                  />
                </>
              )}
              <label className="flex cursor-pointer items-center justify-between p-1 text-slate-400">
                {selectMember ? (
                  <>
                    <p className="text-gray-400">Customer Mode</p>
                  </>
                ) : (
                  <p className="text-gray-400">Reseller mode</p>
                )}
                <div
                  className="relative inline-block"
                  onClick={() => {
                    setSelectMember((prev) => (prev === 0 ? 1 : 0)), setMethod(1);
                  }}
                >
                  <input
                    className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-gary-400 checked:border-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                    type="checkbox"
                  />
                  <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-green-300 transition-all duration-200 peer-checked:left-7 peer-checked:bg-green-300"></span>
                </div>
              </label>
              {selectMember ? (
                <label className="flex cursor-pointer items-center justify-between p-1 text-slate-400">
                  {!method ? <p className="text-gray-400">Use Mac address</p> : <p className="text-gray-400">Use username</p>}
                  <div className="relative inline-block" onClick={handleRole}>
                    <input
                      className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-gary-400 checked:border-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                      type="checkbox"
                    />
                    <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-green-300 transition-all duration-200 peer-checked:left-7 peer-checked:bg-green-300"></span>
                  </div>
                </label>
              ) : (
                <></>
              )}
              {method ? (
                <>
                  <button
                    className="w-full p-3 rounded bg-[#F87777] hover:bg-[#f65e5e] text-white font-medium transition-colors"
                    onClick={handleLoginByRole}
                  >
                    Login By Name
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="w-full p-3 rounded bg-[#F87777] hover:bg-[#f65e5e] text-white font-medium transition-colors"
                    onClick={handleLoginByMacAddress}
                  >
                    Login By MacAddress
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
