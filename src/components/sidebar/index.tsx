import COLORS from "../../utils/COLORS";
import NavItems from "./NavItems";
import { Box, Button, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { api } from "../../lib/api";

const handleLogout = async () => {
   try {
      const response = await api.post('/auth/logout');
      if (response.status === 200) {
         localStorage.removeItem('token');
         window.location.reload();
      }
   } catch (error) {
      console.error('Error logging out:', error);
   }
};

const Sidebar = () => {
   return (
      <Box
         sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 3,
         }}
      >
         <Typography
            variant="h3"
            sx={{ color: COLORS.SECONDARY, fontWeight: "bold" }}
         >
            PCTRN.
         </Typography>

         <NavItems />

         <Button
            variant="contained"
            color="secondary"
            sx={{
               color: "grey",
               backgroundColor: COLORS.SECONDARY,
            }}
         >
            Create Post
         </Button>
         <Button
            startIcon={<Icon icon="solar:logout-2-outline" />}
            sx={{ mt: "auto" }}
            onClick={handleLogout}
         >
            Logout
         </Button>
      </Box>
   );
};

export default Sidebar;