import { POST } from '@api/axios.ts';
import type { User } from './type.d.ts';

export interface LoginParams {
    username: string;
    password: string;
}

const login = async (params: LoginParams) => {
    const { data } = await POST<User>(
        '/auth/login',
        {
            ...params,
            expiresInMins: 30,
        },
        {
            baseURL: 'https://dummyjson.com',
        }
    );
    return data;
};

const Auth = {
    login,
};

export default Auth;
