import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

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
            await console.log("----------Gathered info----------------");
            await console.log(account)
            await console.log(profile)
            return true;
        }
    }
    , 
    pages: {
        signIn: '/login'
    }
}