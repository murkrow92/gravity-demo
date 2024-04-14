import { POST } from '@api/axios.ts';
import type { User } from './type.d.ts';

export interface LoginParams {
    username: string;
    password: string;
}

function wait(ms: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

const login = async (params: LoginParams) => {
    await wait(1000);
    const { data } = (await POST(
        '/auth/login',
        {
            ...params,
            expiresInMins: 30,
        },
        {
            baseURL: 'https://dummyjson.com',
        }
    )) as { data: User };
    return data;
};

const Auth = {
    login,
};

export default Auth;
