// import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import LoginForm from "../components/login/LoginForm";
// import useStore from "../store/hooks";

const Login = () => {
   // const navigate = useNavigate();

   // const { setUser } = useStore();

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
         <LoginForm />
      </Box>
   );
};

export default Login;