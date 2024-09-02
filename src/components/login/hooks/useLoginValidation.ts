import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ILoginForm } from "../../../types/login";

export const useLoginValidation = () => {
    const schema = yup.object().shape({
        email: yup
            .string()
            .email("Email is invalid")
            .required("Email is required"),
        password: yup
            .string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    const initialValues = {
        email: "",
        password: "",
    };

    return useForm<ILoginForm>({
        resolver: yupResolver(schema),
        defaultValues: initialValues,
        reValidateMode: "onSubmit",
        mode: "all",
    });
}