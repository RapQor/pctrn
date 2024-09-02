import { IRegisterForm } from "../../../types/register"

import * as authAsync from "../../../lib/api/call/auth";

export const useRegisterFunction = () => {
    const register = async (body:IRegisterForm) => {
        try {
            const response = await authAsync.register(body);
            console.log(response);
            

            return response
        } catch (error) {
            console.log(error)
        }
    }

    return {
        register
    }
}