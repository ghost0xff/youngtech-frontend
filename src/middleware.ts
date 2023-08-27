import { url } from 'inspector';
import { NextConfig } from 'next';
import { withAuth, NextRequestWithAuth} from 'next-auth/middleware';
import { NextResponse } from 'next/server';


export default withAuth(
    function middleware(req: NextRequestWithAuth) {
        console.log(req.nextUrl.pathname)
        console.log(req.nextauth.token)
        
        const path: string = req.nextUrl.pathname
        const roles = req.nextauth.token?.roles;

        console.log(`jwt access token from middleware => ${req.nextauth.token?.accessToken}`)
        console.log(`jwt refresh token from middleware => ${req.nextauth.token?.refreshToken}`)

        if(
            path.startsWith("/dashboard")
            && !roles?.includes("ROLE_ADMIN")
        ) {
            return NextResponse.rewrite(
                new URL("/denied", req.url)
            )
        }

    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }

)

export const config = {
    matcher: [
        "/account",
        "/dashboard",
        "/settings",
        "/checkout",
        "/orders"
    ]
}