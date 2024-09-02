import { Navigate, Outlet } from "react-router-dom";
import useStore from "../store/hooks";

const AuthLayout = () => {
   const { isLogin } = useStore();

   if (isLogin) {
      return <Navigate to="/" />;
   }

   return <Outlet />;
};

export default AuthLayout;