import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const userinfo = useSelector(
        (state: RootState) => state.auth.userInfo
    );
    const navigate = useNavigate();
    useEffect(() => {
        if (userinfo !== "success") {
        console.log(userinfo);
        navigate("/");
        }
    }, []);
    return <div>{children}</div>;
};

export default ProtectedRoute;
