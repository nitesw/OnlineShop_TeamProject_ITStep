import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectIsAuth } from "../redux/account/accountSlice";
interface ProtectedRouteProps {
    children: JSX.Element;
}
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuth = useAppSelector(selectIsAuth);

    if (
        !isAuth &&
        location.pathname !== "/login" &&
        location.pathname !== "/signup"
    )
        return <Navigate to="/login" />;

    if (
        (isAuth && location.pathname === "/login") ||
        (isAuth && location.pathname === "/signup")
    )
        return <Navigate to="/" />;


    return children;
};