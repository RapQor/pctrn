import { Box } from "@mui/material";
import RegisterForm from "../components/register/RegisterForm";

const Register = () => {
   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#1D1D1D",
            padding: "20px",
         }}
      >
         <RegisterForm />
      </Box>
   );
};

export default Register;