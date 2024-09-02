import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IRegisterForm } from "../../../types/register";

export const useRegisterValidation = () => {
   const schema = yup.object().shape({
      fullName: yup
         .string()
         .required("Fullname is required")
         .min(3, "Fullname must be at least 3 characters"),
      username: yup
         .string()
         .min(3, "Username must be at least 3 characters")
         .required("Username is required"),
      email: yup
         .string()
         .required("Email is required")
         .email("Email is invalid"),
      password: yup
         .string()
         .required("Password is required")
         .min(6, "Password must be at least 6 characters"),
   });

   return useForm<IRegisterForm>({
      resolver: yupResolver(schema),
      defaultValues: {
         email: "",
         fullName: "",
         password: "",
         username: "",
      },
      reValidateMode: "onSubmit",
      mode: "all",
   });
};