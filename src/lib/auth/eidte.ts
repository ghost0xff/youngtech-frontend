import fromApi, { apiClientId, apiClientSecret } from "../api";
import { bodyFromParams } from "../api";

enum OAuth2Params {
    GrantType = "grant_type",
    Assertion = "assertion",
    clientId = "client_id",
    clientSecret = "client_secret"
}

enum OAuht2GrantTypes {
    Eidte = "eidte",
    RefreshToken = "refresh_token",
    Authorization_Code = "authorization_code",
}

enum EidteParam {
    Idpn = "idpn",
}

export interface TokenResponse {
    access_token: string,
    refresh_token: string,
    expires_in: number,
    scope?: string,
    id_token?: string,
    token_type?: string,
}

export interface UserInfo {
    sub: string,
    email: string,
    email_verified: boolean,
    given_name: string,
    family_name: string,
    updated_at: string;
    roles: string[]
}


export async function refreshToken(refreshToken: string): Promise<Response> {
    const clientId: string = apiClientId();
    const clientSecret: string = apiClientSecret();
    
    const rs: Response = await fetch(
        fromApi("/oauth2/token"),
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: bodyFromParams([ 
                { name: OAuth2Params.GrantType , value: "refresh_token"},
                { name: OAuth2Params.clientId , value: clientId},
                { name: OAuth2Params.clientSecret , value: clientSecret},
                { name: OAuht2GrantTypes.RefreshToken, value: refreshToken},
            ])
        }
    )
    return rs;
}


export async function userInfo(access_token: string): Promise<Response> {
    const rs: Response = await fetch(
        fromApi("/userinfo"),
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        }
    )
    return rs;
}

export default async function exchange( idpn: string, idToken: string )
: Promise<Response>  {
    const clientId: string = apiClientId();
    const clientSecret: string = apiClientSecret();

    const rs: Response = await fetch(
        fromApi("/oauth2/token"),
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: bodyFromParams([ 
                { name: OAuth2Params.GrantType , value: 'eidte'},
                { name: EidteParam.Idpn , value: idpn},
                { name: OAuth2Params.Assertion , value: idToken},
                { name: OAuth2Params.clientId , value: clientId},
                { name: OAuth2Params.clientSecret , value: clientSecret},
            ])
        }
    )
    return rs;
}

