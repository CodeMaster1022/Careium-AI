// import { useSelector } from "react-redux";
// import { Outlet, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { RootState } from "@/redux/store";

// const ProtectedRoute = () => {
//     const userinfo = useSelector(
//         (state: RootState) => state.auth.userInfo
//     );
//     const navigate = useNavigate();
//     useEffect(()=>{
//         // const userinfo = localStorage.getItem("userinfo");
//         console.log(userinfo, "-------------->")
//         if(userinfo !== 'success') {
//             console.log(userinfo);
//         navigate("/chat");
//     }
// }, [])
//     return <Outlet />
// }

// export default ProtectedRoute
