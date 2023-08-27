import fromApi from "../api";
import { bodyFromParams } from "../api";

type GrantType = "eidte" | "refresh_token" | "authorization_code"; 

enum EidteParam {
    GrantType = "grant_type",
    Idpn = "idpn",
    Assertion = "assertion",
    clientId = "client_id",
    clientSecret = "client_secret"
}

export interface EidteResponse {
    access_token: string,
    refresh_token: string,
    id_token: string,
    scope?: string,
    token_type?: string,
    expires_in: string
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
    const clientId = process.env.API_CLIENT_ID;
    const clientSecret = process.env.API_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error("client_id or client_secret not declared on .env file");
    }

    const rs: Response = await fetch(
        fromApi("/oauth2/token"),
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'

            },
            body: bodyFromParams([ 
                { name: EidteParam.GrantType , value: 'eidte'},
                { name: EidteParam.Idpn , value: idpn},
                { name: EidteParam.Assertion , value: idToken},
                { name: EidteParam.clientId , value: clientId},
                { name: EidteParam.clientSecret , value: clientSecret},
            ])
        }
    )
    return rs;

}

