const API_URL = import.meta.env.VITE_API_URL ?? 'https://webdev-project-7dev.onrender.com/api/v1';

export function rest(url: string, data?: any, method?: string, headers?: any){
    const config: RequestInit = {
        method: method ?? (data ? 'POST' : 'GET'),
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: data ? JSON.stringify(data) : undefined,
    };

    if (method?.toUpperCase() === 'DELETE') {
        delete config.body;
    }

    return fetch(url, config)
        .then(res => res.ok 
            ? res.json() 
            : res.json().then(x=> { throw({ ...x, message: x.error }) } )
        );
}

export function api(url: string, data?: any, method?: string, headers?: any){
    return rest(API_URL + url, data, method, headers);
}

export type DataEnvelope<T> = {
    data: T,
    isSuccess: boolean,
    error?: string,
}

export type DataListEnvelope<T> = DataEnvelope<T[]> & {
    total: number,
}
