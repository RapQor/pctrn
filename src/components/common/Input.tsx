import { Input, InputBaseProps } from "@mui/material";
import React from "react";

interface InputProps extends InputBaseProps {}

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
   ({ ...rest }, ref) => {
      return (
         <Input
            {...rest}
            disableUnderline
            ref={ref}
            sx={{
               width: "100%",
               border: "1px solid gray",
               color: "white",
               borderRadius: "10px",
               padding: "5px",
            }}
         />
      );
   }
);

export default CustomInput;