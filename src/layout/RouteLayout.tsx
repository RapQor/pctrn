import { Navigate, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "../components/sidebar";
import useStore from "../store/hooks";
import RightBarIndex from "../components/rightbar/RightBarIndex";

const RootLayout = () => {
   const { isLogin } = useStore();

   if (!isLogin) {
      return <Navigate to="/auth/login" />;
   }

   return (
      <Box sx={{ height: "100vh", display: "flex" }}>
         {/* Sidebar */}
         <Box
            sx={{
               flex: 1,
               backgroundColor: "#1D1D1D",
               borderRight: "1px solid gray",
            }}
         >
            <Sidebar />
         </Box>
         <Box sx={{ flex: 2 }}>
            <Outlet />
         </Box>
         <Box sx={{ flex: 1.5, borderLeft: "1px solid gray" }}>
            <RightBarIndex />
         </Box>
      </Box>
   );
};

export default RootLayout;