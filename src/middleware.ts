import { url } from 'inspector';
import { NextConfig } from 'next';
import { withAuth, NextRequestWithAuth} from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { AccessControl, CurrentRoles } from './lib/auth/security';


export default withAuth(
    function middleware(req: NextRequestWithAuth) {
        const path: string = req.nextUrl.pathname
        const roles = req.nextauth.token?.roles;
        const token = req.nextauth.token;

        if(token?.error) {
            return NextResponse.redirect(new URL("/login", req.url))
        }

        if(!roles) {
            return NextResponse.rewrite(new URL("/denied", req.url))
        }

        for (let index = 0; index < accessControl.routes.length; index++) {
            const route = accessControl.routes[index];
            if(path.startsWith(route.path)) {
                const isAuthz = roles.some(item => (
                    route.roles.includes(item as CurrentRoles))
                );
                if (!isAuthz) {
                    return NextResponse.rewrite(
                        new URL("/denied", req.url)
                    );
                }
            }
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
        "/orders"
        // "/checkout",
    ]
}

const accessControl: AccessControl = {
    routes: [
        {
            path: "/account",
            roles: ["ROLE_CUSTOMER"]
        },
        {
            path: "/orders",
            roles: ["ROLE_CUSTOMER"]
        },
        {
            path: "/settings",
            roles: ["ROLE_CUSTOMER"]
        },
        {
            path: "/dashboard",
            roles: ["ROLE_ADMIN", "ROLE_EMPLOYEE"]
        },
    ]
}