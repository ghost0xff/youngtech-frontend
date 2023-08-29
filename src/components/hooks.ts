'use client';

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export function useSafeSession() {
    const session = useSession();
    useEffect( () => {
        if(session.data?.error === 'RefreshAccessTokenError') {
            console.log('Logging out: Code RT')
            signOut();
        }
    }, [session]);
    return session;
}
