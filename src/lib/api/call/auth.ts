import {api} from '..';
import { IRegisterForm } from '../../../types/register';

export const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', {
        email,
        password
    });
    return response.data;
}

export const register = async (body: IRegisterForm) => {
    const response = await api.post('/auth/register',  body);
    return response.data;
}

export const checkAuth = async (token: string) => {
    const response = await api.get('/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const logout = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
}