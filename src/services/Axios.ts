import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const instance = axios.create({
    baseURL: '',
    timeout: 20000,
    headers: {},
});

export interface RequestSuccess<T> {
    status: true;
    data: T;
}

function onSuccess(response: AxiosResponse<unknown>) {
    const { url } = response.config;
    console.log('SUCCESS RESPONSE', url, response);
    return response;
}

async function onFailure(error: AxiosError) {
    const originalRequest = error?.config;
    console.log('ERROR RESPONSE --- ORIGINAL REQUEST ', originalRequest);
    console.log('ERROR RESPONSE --- ERROR', error);
    return {
        status: false,
        error,
    };
}

instance.interceptors.response.use(onSuccess, onFailure);

export function handleResponse<T>(response: AxiosResponse<T>): RequestSuccess<T> {
    return {
        ...response,
        status: true,
    };
}

export const GET = async (
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
) => {
    try {
        const response = await instance.get(url, { ...config, params });
        return handleResponse(response);
    } catch (error) {
        return error;
    }
};

export const POST = async (url: string, params?: any, config?: AxiosRequestConfig) => {
    try {
        const response = await instance.post(url, params, config);
        return handleResponse(response);
    } catch (error) {
        return error;
    }
};

export const PUT = async (url: string, params?: any, config?: AxiosRequestConfig) => {
    try {
        const response = await instance.put(url, params, config);
        return handleResponse(response);
    } catch (error) {
        return error;
    }
};
