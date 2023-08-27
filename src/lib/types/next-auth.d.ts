import NextAuth, {DefaultSession, DefaultUser} from "next-auth"
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: {
      roles: string[]
    }
    & DefaultSession
  }

  interface User extends DefaultUser {
      roles: string[]
  }
  
  /** The OAuth profile returned from your provider */
  interface Profile {
    roles: string[]
  }

}
declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT extends DefaultJWT {
      /** OpenID ID Token */
        idToken: string
        accessToken: string
        roles: string[]

    }
  }