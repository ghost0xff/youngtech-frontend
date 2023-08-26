import { NextConfig } from 'next';
import { withAuth } from 'next-auth/middleware';
import { NextRequest } from 'next/server';

export default withAuth(
    function middleware(req: NextRequest) {
        
    },
    {
        callbacks: {

        },
    }

)

export const config = {
    matcher: [
        "/account",
        "/settings",
        "/checkout",
        "/orders"
    ]
}