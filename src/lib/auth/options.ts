import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import exchange, { TokenResponse, UserInfo, refreshToken, userInfo } from "./eidte";
import { str } from "../utils/stringUtils";
import { FamilyRestroomOutlined } from "@mui/icons-material";
import fromApi, { apiRefreshTokenTTL }  from "../api";
import { Almarai, Economica, Epilogue } from "next/font/google";
import { JWT } from "next-auth/jwt";
import { IncomingMessage } from "http";

export const authOptions: NextAuthOptions = {

    providers: [
        
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            authorization: {
                params: {
                    // prompt: "consent",
                    response_type: "code",
                    access_type: "offline"
                }
            }
        })

    ], 
    
    callbacks: {
        async signIn({user, account, profile}) {
            console.log("----------Gathered info----------------");
            console.log(account)
            console.log(profile)

            const exchangeRes: Response = await exchange(
                account?.provider as string,
                account?.id_token as string,
            );
            if(!exchangeRes.ok) {
                /* Posible reasons:
                    - For some wierd and (IM)POSIBLE reason the id_token from the
                    identity provider wasn't valid???
                    - Identity Provider not supported or uknown_idpn */
                console.warn(`Failed to authenticate user with external_id: ${profile?.sub}`)
                return false;
            }

            const eidteBody: TokenResponse = await exchangeRes.json();
            const infoRes: Response = await userInfo(eidteBody.access_token);
            if(!infoRes.ok) {
                console.warn(`Couldn't get userinfo from server mamawuevo`)
                return false;
            }
            const info: UserInfo = await infoRes.json();
            console.log("----------Info from EIDTE exchange----------------");
            console.log(eidteBody);
            console.log(info);
           
            user.id = info.sub;
            user.roles = info.roles;
            user.email = info.email;
            user.name = info.given_name.concat(" ").concat(info.family_name);
            user.accessToken = eidteBody.access_token;
            user.refreshToken = eidteBody.refresh_token;
            
            if(account?.access_token) {
                account.access_token = eidteBody.access_token;
                account.refresh_token = eidteBody.refresh_token;
                account.expires_in = eidteBody.expires_in;
                console.log(account.id_token)
            } else {
                return false;
            }
            
            console.log("succeslly obtained initial(signIn) access and refresh tokens")
            return true;
        },


        async jwt({token, user, account, profile, trigger, session}) {

            const notExpiredAccToken =  Date.now() / 1000 < token.accessTokenExpiresAt;

            if(user) {
                token.sub = user.id;
                token.roles = user.roles;
                token.email = user.email;
                token.name = user.name;
            } 

            if(account?.access_token && account.refresh_token && account.expires_at) {
                // case first signIn
                const nextAccessTokenExpiresAt = Math.floor(Date.now() / 1000 + account.expires_in);
                const nextRefreshTokenExpiresAt = Math.floor(Date.now() / 1000  + apiRefreshTokenTTL()); // current is 24h (86400) [3600 * 24]
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.accessTokenExpiresAt = nextAccessTokenExpiresAt; 
                token.refreshTokenExpiresAt = nextRefreshTokenExpiresAt;

                console.log("--------------------------ADDED TOKENS TO JWT SESSION-------------------------")
                console.log(`ACCESS_TOKEN: ${token.accessToken}`)
                console.log(`REFRESH_TOKEN: ${token.refreshToken}`)
                console.log(`ACCESS EXPIRES AT (DATE): ${fromEpochTime(token.accessTokenExpiresAt)}`)
                console.log(`REFRESH EXPIRES AT (DATE): ${fromEpochTime(token.accessTokenExpiresAt)}`)
                console.log("------------------------------------------------------------------------------")
                return token;

            } else if (notExpiredAccToken) {
                // case hasn't expired
                console.log("--------------------------TOKENS HAVEN'T EXPIRED YET-------------------------")
                console.log(`ACCESS_TOKEN: ${token.accessToken}`)
                console.log(`REFRESH_TOKEN: ${token.refreshToken}`)
                console.log(`ACCESS EXPIRES AT (EPOCH-TIME): ${token.accessTokenExpiresAt}`)
                console.log(`CURRENT DATE ${new Date()}`)
                console.log(`ACCESS EXPIRES AT DATE: ${fromEpochTime(token.accessTokenExpiresAt)}`)
                console.log(`REFRESH EXPIRES AT DATE: ${fromEpochTime(token.refreshTokenExpiresAt)}`)
                console.log("------------------------------------------------------------------------------")
                return token;
            } else {
                // case access_token has expired, try to refresh it
                try {
                    console.log("--------------------------TOKENS HAVE EXPIRED, TRYING TO REFRESH TOKENS-------------------------")
                    
                    // Try refreshing token to the oauth2 token endpoint
                    const rs: Response = await refreshToken(token.refreshToken);
                    console.log(`Refresh response =>: ${rs.status}`)
                    if(!rs.ok) {
                        console.warn("Error refreshing token => request wasn't successfull")
                        return { ...token, error: 'RefreshAccessTokenError' as const }
                    }
                    const tokens: TokenResponse = await rs.json();
                    console.log(tokens)
                    token.accessToken = tokens.access_token;                    
                    token.refreshToken = tokens.refresh_token,  // only use refresh token once
                    token.accessTokenExpiresAt = Math.floor(Date.now() / 1000 + tokens.expires_in)


                    
                    // get UPDATED user-info data on every access_token refresh
                    // i.e every 
                    const infoRes: Response = await userInfo(token.accessToken);
                    if(!infoRes.ok) {
                        console.warn(`Couldn't get userinfo from server mamawuevo in refresh token`)
                        return token;
                    }
                    const info: UserInfo = await infoRes.json();
                    token.roles = info.roles;
                    token.sub = info.sub
                    token.roles = info.roles
                    token.email = info.email;
                    token.name = info.given_name.concat(info.family_name);
                    console.log("--------------------------SUCCESFULLY REFRESHED TOKENS--------------------------")
                    return token;
                } catch(error) {
                    console.warn(
                        "Error refreshing token => request WAS successfully but somethinng went wrong after that",
                         error
                    );
                    return { ...token, error: 'RefreshAccessTokenError' as const }
                }

            }
        },


        async session({session, token, user, newSession, trigger}) {
            if(session.user) {
                session.user.id = token.sub as string;
                session.user.roles = token.roles;
                session.user.accessToken = token.accessToken;
                session.user.refreshToken = token.refreshToken;

                session.user.email = token.email;
                session.user.name = token.name;
            }
            if(token) {
                session.error = token.error;
            }
            return session;
        }
    }
    , 
    pages: {
        signIn: '/login',
        error: '/error'
    }
    
}


function fromEpochTime(epochTime: number): Date {
    const d = new Date(0);
    try { d.setUTCSeconds(epochTime);
    } catch (err) {
        console.error(`Error while create date from epoch time ${epochTime}`, err)
    }
    return d;
}



