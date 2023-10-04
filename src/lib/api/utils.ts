import { authOptions } from "../auth/options";

type Method = "GET" | "POST" | "PUT" | "DELETE";

type Param = {
    name: string,
    value: string
}

export function apiRefreshTokenTTL(): number {
    const refrehTokenTTL = process.env.API_REFRESH_TOKEN_TTL_SECONDS;
    if(!refrehTokenTTL) {
        throw new Error("refreh token TTL (seconds) not declared on .env file");
    }
    return parseInt(refrehTokenTTL);
}

export function apiClientId() {
    const clientId = process.env.API_CLIENT_ID;
    if (!clientId) {
        throw new Error("client_id not declared on .env file");
    }
    return clientId;
}

export function apiClientSecret() {
    const clientSecret = process.env.API_CLIENT_SECRET;
    if (!clientSecret) {
        throw new Error("client_secret not declared on .env file");
    }
    return clientSecret;
}

export function apiBaseUrl(): string  {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!url) {
        console.log(url)
        throw new Error("apiBaseUrl not declared on .env file");
    }
    return url;
}

export default function fromApi(fromUrl: string): string {
    const fromApiUrl: string = apiBaseUrl();
    const slash = "/";
    let apiUrl: string = fromApiUrl;
    let url: string = fromUrl;
    if(!fromApiUrl.endsWith(slash)) {
        apiUrl = fromApiUrl.concat(slash)
    }
    if(fromUrl.startsWith(slash)) {
        url = fromUrl.substring(1);
    }
    return  apiUrl.concat(url);
}

export function url(fromUrl: string, params?: Param[]): string {
    let rs: string = fromApi(fromUrl);
    if(params) {
        const searchParams = bodyFromParams(params);
        rs = rs.concat("?").concat(searchParams);
    }
    return rs;
}

export function bodyFromParams(params: Param[]): string {
    const searchParams = new URLSearchParams(); 
    for (let i = 0; i < params.length; i++) {
        const param: Param = params[i];
        searchParams.append(param.name, (param.value));
    }
    return searchParams.toString();
}


