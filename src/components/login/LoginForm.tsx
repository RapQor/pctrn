// make like regiterform for login form but with different validation (username and password)

import { Button, FormControl, FormHelperText, Typography } from "@mui/material";
import { Controller, SubmitHandler } from "react-hook-form";
import { ILoginForm } from "../../types/login";
import CustomInput from "../common/Input";
import { useLoginValidation } from "./hooks/useLoginValidation";
import { Link } from "react-router-dom";
import { useLoginFunction } from "./hooks/useLoginFunction";



const LoginForm = () => {
   const loginFunc = useLoginFunction();
   
   const { control, handleSubmit, reset } = useLoginValidation();

   const handleOnSubmit:SubmitHandler<ILoginForm> = async(data) => {
      try {
         await loginFunc.login(data.email, data.password);
         
         reset();
      } catch (error) {
         console.log(error)
      }

   };

   const onError = (errors: any) => {
      console.log(errors);
   };

   return (
      <form
         style={{
            width: "30rem",
            display: "flex",
            flexDirection: "column",
            gap: 10,
         }}
         onSubmit={handleSubmit(handleOnSubmit, onError)}
      >
         <Typography variant="h3" fontWeight={"bold"} color="yellow">
            PCTRN.
         </Typography>
         <Typography variant="h4" fontWeight={"bold"} color="white">
         </Typography>
         <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
               <FormControl error={Boolean(fieldState.error)}>
                  <CustomInput
                     placeholder="Email or Username"
                     sx={{ mb: 2 }}
                     {...field}
                  />
                  {Boolean(fieldState.error) && (
                     <FormHelperText>
                        {fieldState.error?.message}
                     </FormHelperText>
                  )}
               </FormControl>
            )}
         />
         <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
               <FormControl error={Boolean(fieldState.error)}>
                  <CustomInput
                     placeholder="Password"
                     sx={{ mb: 2 }}
                     {...field}
                  />
                  {Boolean(fieldState.error) && (
                     <FormHelperText>
                        {fieldState.error?.message}
                     </FormHelperText>
                  )}
               </FormControl>
            )}
         />

         <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 23, backgroundColor: "yellow" }}
         >
            Login
         </Button>
         <Typography variant="body2" color="white">
            I haven't an account. <span style={{ color: "yellow", textDecoration: "none" }}>
               <Link to = "/auth/register">Register</Link>
            </span>
         </Typography>
      </form>
   );
};

export default LoginForm;