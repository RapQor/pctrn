import { setAuthToken } from "../../../lib/api";
import * as authAsync from "../../../lib/api/call/auth";
import useStore from "../../../store/hooks";


export const useLoginFunction = () => {

    const {setUser} = useStore();

    const login = async (email: string, password: string) => {
        try {
            const resToken = await authAsync.login(email, password);
            
            const profile = await authAsync.checkAuth(resToken.token);
            
            setUser(profile);
            setAuthToken(resToken.token);
            localStorage.setItem('token', resToken.token);
        } catch (error) {
            console.log(error)
        }
    }
    
    return{
        login,
    }
}