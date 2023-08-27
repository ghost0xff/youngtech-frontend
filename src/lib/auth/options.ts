import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import exchange, { EidteResponse, UserInfo, userInfo } from "./eidte";
import { str } from "../utils/stringUtils";

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
                console.log(`Failed to authenticate user with external_id: ${profile?.sub}`)
                /*
                    Posible reasons:
                        - For some wierd and IMPOSIBLE reason the id_token from the
                        identity provider wasn't valid???
                        - Identity Provider not supported or uknown idpn
                */
                return false;
            }

            const eidteBody: EidteResponse = await exchangeRes.json();
            const infoRes: Response = await userInfo(eidteBody.access_token);
            if(!infoRes.ok) {
                console.log(`Couldn't get userinfo from server mamawuevo`)
                return false;
            }
            const info: UserInfo = await infoRes.json();
            
            // user.id 

            // In case mf change settings with my system
            console.log(eidteBody);
            console.log(info);
           
            if(profile && profile.roles){
                profile.roles = info.roles
            }
            user.roles = info.roles;
            
            return true;
        },
        async jwt({token, user, account, profile, trigger, session}) {
            if(user) token.roles = user.roles;
            return token;
        },
        async session({session, token, user, newSession, trigger}) {
            if(session.user) session.user.roles = token.roles;
            return session;
        }
    }
    , 
    pages: {
        signIn: '/login',
        error: '/error'
    }
    
}