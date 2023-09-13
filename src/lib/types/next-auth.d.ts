import NextAuth, {DefaultSession, DefaultUser, Account as DefaultAccount} from "next-auth"
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: User,
    error?: "RefreshAccessTokenError"
  }

  interface User extends DefaultUser {
      roles: string[],
      accessToken: string
      refreshToken: string,
      firstnames: string,
      lastnames: string
   }

   interface Account extends DefaultAccount {
      expires_in: number
   } 
  

}
declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        accessTokenExpiresAt: number,
        accessToken: string,
        refreshToken: string,
        refreshTokenExpiresAt: number,
        roles: string[],
        error?: "RefreshAccessTokenError"
        firstnames: string,
        lastnames: string

    }
  }