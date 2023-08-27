import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import exchange, { TokenResponse, UserInfo, refreshToken, userInfo } from "./eidte";
import { str } from "../utils/stringUtils";
import { FamilyRestroomOutlined } from "@mui/icons-material";
import fromApi from "../api";

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
                    - For some wierd and IMPOSIBLE reason the id_token from the
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
            user.accessToken = eidteBody.access_token;
            user.email = info.email;
            user.name = info.given_name.concat(" ").concat(info.family_name);
            
            if(account?.access_token) {
                account.access_token = eidteBody.access_token;
                account.refresh_token = eidteBody.refresh_token;
                account.expires_in = eidteBody.expires_in;
                console.log(`account exp_in from sigin callback => ${account.expires_in}`)
                console.log(`account a_t from sigin callback => ${account.access_token}`)
                console.log(`account r_t from signin callback => ${account.refresh_token}`)
            } else {
                return false;
            }
            
            return true;
        },


        async jwt({token, user, account, profile, trigger, session}) {
            if(user){
                token.sub = user.id;
                token.roles = user.roles;
                token.email = user.email;
                token.name = user.name;
            } 

            if(account?.access_token && account.refresh_token && account.expires_at) {
                // case first signIn
                const expiresAt = Math.floor(Date.now() / 1000 + account.expires_in);

                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.expiresAt = expiresAt; 
            
                console.log(`account exp_at from jwt callback => ${expiresAt}`)
                console.log(`account a_t from jwt callback => ${account.access_token}`)
                console.log(`account r_t from jwt callback => ${account.refresh_token}`)

                return token;
            } else if ( Date.now() < token.expiresAt * 1000) {
                // case hasn't expired
                return token;
            } else {
                // case access_token has expired, try to refresh it
                try {
                    const rs: Response = await refreshToken(token.refreshToken);
                    if(!rs.ok) {
                        console.warn("Error refreshing token", error)
                        return { ...token, error: 'RefreshAccessTokenError' as const }
                    }
                    const tokens: TokenResponse = await rs.json();
                    token.accessToken = tokens.access_token;                    
                    // only use refresh token once
                    token.refreshToken = tokens.refresh_token,
                    token.expiresAt = Math.floor(Date.now() / 1000 + tokens.expires_in)
                    
                } catch(error) {
                    console.warn("Error refreshing token", error)
                    return { ...token, error: 'RefreshAccessTokenError' as const }
                }

            }
            // case????? SHOULD NOT GET TO HERE NEVER
            return token;
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
            return session;
        }
    }
    , 
    pages: {
        signIn: '/login',
        error: '/error'
    }
    
}